#!/usr/bin/env python3
"""
Orchestrator script to run TTMS scrapers once per invocation.
Use CLI arg to choose which to run: rss | forecast | both (default: both)
"""

import os
import sys
import sqlite3
from datetime import datetime, timezone, timedelta

# Add current directory to path so we can import our modules
sys.path.append(os.path.dirname(__file__))

# Import our scraper modules
from ttms_scraper import setup_database, fetch_all_forecasts, save_forecasts_to_db, log_scraper_run, get_database_stats
from ttms_rss_scraper import fetch_rss_alerts, save_alerts_to_db

DB_FILE = os.path.join(os.path.dirname(__file__), "database", "weather_forecasts.db")

def _get_last_success_timestamp(run_type: str):
    """Return datetime of the most recent successful run for run_type or None."""
    try:
        conn = sqlite3.connect(DB_FILE)
        cur = conn.cursor()
        cur.execute(
            """
            SELECT run_timestamp
            FROM scraper_analytics
            WHERE run_type = ? AND success = 1
            ORDER BY run_id DESC
            LIMIT 1
            """,
            (run_type,),
        )
        row = cur.fetchone()
        if row and row[0]:
            try:
                return datetime.fromisoformat(row[0])
            except Exception:
                return None
        return None
    except sqlite3.Error:
        return None
    finally:
        try:
            conn.close()
        except Exception:
            pass

def should_run_rss(now_utc: datetime) -> bool:
    """Run RSS if never run or last success >= 10 minutes ago."""
    last = _get_last_success_timestamp('rss_alerts')
    if not last:
        return True
    return (now_utc - last) >= timedelta(minutes=10)

def should_run_forecasts(now_utc: datetime) -> bool:
    """Run forecasts if never run or last success >= 60 minutes ago."""
    last = _get_last_success_timestamp('forecasts')
    if not last:
        return True
    return (now_utc - last) >= timedelta(hours=1)

def run_rss_scraper():
    """
    Runs the RSS scraper to fetch weather alerts.
    """
    print(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] --- Starting RSS Weather Alerts Scraper ---")
    
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
    
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] --- RSS Scraper finished. ---")

def run_forecast_scraper():
    """
    Runs the forecast scraper to fetch weather forecasts.
    """
    print(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] --- Starting Weather Forecast Scraper ---")
    
    start_time = datetime.now(timezone.utc)
    
    try:
        # Fetch and save forecasts
        forecast_data = fetch_all_forecasts()
        
        if forecast_data:
            print(f"Total forecasts fetched: {len(forecast_data)}")
            forecast_inserted = save_forecasts_to_db(forecast_data)
            log_scraper_run('forecasts', start_time, datetime.now(timezone.utc), 
                           len(forecast_data), forecast_inserted, True)
        else:
            print("Could not fetch any forecast data.")
            log_scraper_run('forecasts', start_time, datetime.now(timezone.utc), 
                           0, 0, False, "No forecast data fetched")
            
    except Exception as e:
        print(f"Error during forecast scraping: {e}")
        log_scraper_run('forecasts', start_time, datetime.now(timezone.utc), 
                       0, 0, False, str(e))
    
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] --- Forecast Scraper finished. ---")

def display_status():
    """Displays current status and statistics."""
    try:
        stats = get_database_stats()
        print(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] --- Current Status ---")
        print(f"Total forecasts: {stats.get('total_forecasts', 0)}")
        print(f"Total scraper runs: {stats.get('total_runs', 0)}")
        if stats.get('last_run', {}).get('type'):
            print(f"Last run: {stats['last_run']['type']} at {stats['last_run']['timestamp']}")
            print(f"Last run success: {stats['last_run']['success']}")
    except Exception as e:
        print(f"Error getting status: {e}")

def main():
    """Run selected scraper(s) once and exit.

    Modes:
      - rss: force run RSS only
      - forecast: force run Forecasts only
      - both: force run both
      - auto (default): run RSS if 10+ min since last success; Forecasts if 60+ min
    """
    print("=== TTMS Weather Data Scrapers ===")
    print("Setting up database...")

    # Setup database
    setup_database()

    # Determine which scraper(s) to run based on CLI arg
    arg = sys.argv[1].lower() if len(sys.argv) > 1 else 'auto'
    now_utc = datetime.now(timezone.utc)

    if arg == 'rss':
        run_rss_scraper()
    elif arg == 'forecast':
        run_forecast_scraper()
    elif arg == 'both':
        run_rss_scraper()
        run_forecast_scraper()
    else:
        # auto mode
        if should_run_rss(now_utc):
            run_rss_scraper()
        else:
            print("Skipping RSS: last successful run < 10 minutes ago")

        if should_run_forecasts(now_utc):
            run_forecast_scraper()
        else:
            print("Skipping Forecasts: last successful run < 60 minutes ago")

    # Show brief status
    display_status()

if __name__ == "__main__":
    main()
