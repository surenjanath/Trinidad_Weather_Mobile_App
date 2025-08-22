import os
import requests
import sqlite3
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
import time
import schedule

# --- Configuration ---
RSS_FEED_URL = "https://metproducts.gov.tt/ttms/public/api/feed?type=rss"
DB_PATH = os.path.join(os.path.dirname(__file__), "database")
if not os.path.exists(DB_PATH):
    os.makedirs(DB_PATH)
    
DB_FILE = os.path.join(DB_PATH, "weather_forecasts.db")

def setup_database():
    """
    Sets up the SQLite database and creates the necessary tables if they don't exist.
    """
    conn = None
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()

        # Create table for weather alerts from RSS feed
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS weather_alerts (
                alert_id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT,
                link TEXT,
                pub_date TEXT,
                alert_level TEXT,
                alert_type TEXT,
                issued_by TEXT,
                insertion_date TEXT
            )
        ''')

        # Create table for scraper analytics and run tracking
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS scraper_analytics (
                run_id INTEGER PRIMARY KEY AUTOINCREMENT,
                run_timestamp TEXT NOT NULL,
                run_type TEXT NOT NULL,
                start_time TEXT NOT NULL,
                end_time TEXT,
                duration_seconds REAL,
                records_fetched INTEGER,
                records_inserted INTEGER,
                success BOOLEAN,
                error_message TEXT,
                api_response_time REAL,
                total_records_in_db INTEGER
            )
        ''')

        print(f"Database '{DB_FILE}' is set up with all tables ready.")
        conn.commit()
    except sqlite3.Error as e:
        print(f"Database error: {e}")
    finally:
        if conn:
            conn.close()

def fetch_rss_alerts():
    """
    Fetches weather alerts from the RSS feed.
    Returns a list of alert dictionaries.
    """
    alerts = []
    
    headers = {
        "Accept": "application/xml, text/xml",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    try:
        print(f"Fetching RSS alerts from: {RSS_FEED_URL}")
        response = requests.get(RSS_FEED_URL, headers=headers, timeout=10)
        response.raise_for_status()
        
        # Parse XML content
        root = ET.fromstring(response.content)
        
        # Handle RSS format
        if root.tag.endswith('rss'):
            # RSS format
            for item in root.findall('.//item'):
                alert = {}
                alert['title'] = item.find('title').text if item.find('title') is not None else ''
                alert['description'] = item.find('description').text if item.find('description') is not None else ''
                alert['link'] = item.find('link').text if item.find('link') is not None else ''
                alert['pub_date'] = item.find('pubDate').text if item.find('pubDate') is not None else ''
                
                # Extract alert level and type from title
                title = alert['title'].lower()
                if 'yellow' in title:
                    alert['alert_level'] = 'YELLOW'
                elif 'orange' in title:
                    alert['alert_level'] = 'ORANGE'
                elif 'red' in title:
                    alert['alert_level'] = 'RED'
                elif 'green' in title:
                    alert['alert_level'] = 'GREEN'
                else:
                    alert['alert_level'] = 'UNKNOWN'
                
                # Extract alert type
                if 'adverse weather' in title:
                    alert['alert_type'] = 'ADVERSE_WEATHER'
                elif 'high wind' in title:
                    alert['alert_type'] = 'HIGH_WIND'
                elif 'flood' in title:
                    alert['alert_type'] = 'FLOOD'
                elif 'hazardous seas' in title:
                    alert['alert_type'] = 'HAZARDOUS_SEAS'
                elif 'discontinuation' in title or 'cancellation' in title:
                    alert['alert_type'] = 'DISCONTINUATION'
                else:
                    alert['alert_type'] = 'OTHER'
                
                alert['issued_by'] = 'Trinidad and Tobago Meteorological Service'
                alert['insertion_date'] = datetime.now(timezone.utc).isoformat()
                
                # Generate unique alert ID from title and date
                alert['alert_id'] = f"{alert['title'][:50]}_{alert['pub_date'][:20]}".replace(' ', '_').replace(':', '_')
                
                alerts.append(alert)
        
        print(f"Successfully parsed {len(alerts)} alerts from RSS feed")
        return alerts
        
    except requests.exceptions.RequestException as e:
        print(f"Error fetching RSS alerts: {e}")
        return []
    except ET.ParseError as e:
        print(f"Error parsing RSS XML: {e}")
        return []

def save_alerts_to_db(alerts):
    """
    Saves weather alerts to the database.
    """
    if not alerts:
        print("No alerts to save.")
        return 0

    conn = None
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()

        insert_count = 0
        for alert in alerts:
            cursor.execute('''
                INSERT OR REPLACE INTO weather_alerts (
                    alert_id, title, description, link, pub_date, 
                    alert_level, alert_type, issued_by, insertion_date
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                alert['alert_id'], alert['title'], alert['description'], 
                alert['link'], alert['pub_date'], alert['alert_level'], 
                alert['alert_type'], alert['issued_by'], alert['insertion_date']
            ))
            if cursor.rowcount > 0:
                insert_count += 1

        conn.commit()
        print(f"Successfully saved {insert_count} alert(s) to the 'weather_alerts' table.")
        return insert_count

    except sqlite3.Error as e:
        print(f"Database error during alert insert: {e}")
        return 0
    finally:
        if conn:
            conn.close()

def log_scraper_run(run_type, start_time, end_time, records_fetched, records_inserted, 
                    success, error_message=None, api_response_time=None):
    """
    Logs scraper run analytics to the database.
    """
    conn = None
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        
        duration = (end_time - start_time).total_seconds()
        
        # Get total records count
        cursor.execute("SELECT COUNT(*) FROM weather_alerts")
        total_records = cursor.fetchone()[0]
        
        cursor.execute('''
            INSERT INTO scraper_analytics (
                run_timestamp, run_type, start_time, end_time, duration_seconds,
                records_fetched, records_inserted, success, error_message,
                api_response_time, total_records_in_db
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            datetime.now(timezone.utc).isoformat(),
            run_type,
            start_time.isoformat(),
            end_time.isoformat(),
            duration,
            records_fetched,
            records_inserted,
            success,
            error_message,
            api_response_time,
            total_records
        ))
        
        conn.commit()
        print(f"Logged scraper run analytics for {run_type}")
        
    except sqlite3.Error as e:
        print(f"Error logging scraper run: {e}")
    finally:
        if conn:
            conn.close()

def get_database_stats():
    """
    Returns statistics about the database contents.
    """
    conn = None
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        
        # Get alerts count
        cursor.execute("SELECT COUNT(*) FROM weather_alerts")
        alerts_count = cursor.fetchone()[0]
        
        # Get latest alert date
        cursor.execute("SELECT MAX(pub_date) FROM weather_alerts")
        latest_alert = cursor.fetchone()[0]
        
        # Get run count
        cursor.execute("SELECT COUNT(*) FROM scraper_analytics")
        run_count = cursor.fetchone()[0]
        
        # Get last run info
        cursor.execute("SELECT run_type, run_timestamp, success FROM scraper_analytics ORDER BY run_id DESC LIMIT 1")
        last_run = cursor.fetchone()
        
        stats = {
            'total_alerts': alerts_count,
            'latest_alert_date': latest_alert,
            'total_runs': run_count,
            'last_run': {
                'type': last_run[0] if last_run else None,
                'timestamp': last_run[1] if last_run else None,
                'success': last_run[2] if last_run else None
            }
        }
        
        return stats
        
    except sqlite3.Error as e:
        print(f"Error getting database stats: {e}")
        return {}
    finally:
        if conn:
            conn.close()

def run_rss_scraper():
    """
    Main function to run the RSS scraper.
    """
    print("\n--- Starting RSS Weather Alerts Scraper ---")
    
    # Track start time
    start_time = datetime.now(timezone.utc)
    
    try:
        # Fetch and save alerts
        alert_data = fetch_rss_alerts()
        
        if alert_data:
            print(f"Total alerts fetched: {len(alert_data)}")
            inserted_count = save_alerts_to_db(alert_data)
            log_scraper_run('rss_alerts', start_time, datetime.now(timezone.utc), 
                           len(alert_data), inserted_count, True)
        else:
            print("Could not fetch any alert data.")
            log_scraper_run('rss_alerts', start_time, datetime.now(timezone.utc), 
                           0, 0, False, "No alert data fetched")
            
    except Exception as e:
        print(f"Error during RSS scraping: {e}")
        log_scraper_run('rss_alerts', start_time, datetime.now(timezone.utc), 
                       0, 0, False, str(e))
    
    print("--- RSS Scraper finished. ---")

def main():
    """
    Main function to run the RSS scraper on schedule.
    """
    print("--- Starting Scheduled RSS Weather Alerts Scraper ---")
    
    # Setup database
    setup_database()
    
    # Run immediately once
    run_rss_scraper()
    
    # Schedule to run every 10 minutes
    schedule.every(10).minutes.do(run_rss_scraper)
    
    print("RSS scraper scheduled to run every 10 minutes...")
    print("Press Ctrl+C to stop")
    
    try:
        while True:
            schedule.run_pending()
            time.sleep(60)  # Check every minute
    except KeyboardInterrupt:
        print("\nStopping RSS scraper...")
        
        # Display final statistics
        print("\n--- Final Statistics ---")
        stats = get_database_stats()
        print(f"Total alerts in database: {stats.get('total_alerts', 0)}")
        print(f"Total scraper runs: {stats.get('total_runs', 0)}")
        
        if stats.get('last_run', {}).get('type'):
            print(f"Last run type: {stats['last_run']['type']}")
            print(f"Last run time: {stats['last_run']['timestamp']}")
            print(f"Last run success: {stats['last_run']['success']}")

if __name__ == "__main__":
    main()