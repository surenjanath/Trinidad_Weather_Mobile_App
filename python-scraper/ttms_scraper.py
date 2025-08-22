import os
import json
import sqlite3
from datetime import datetime, timezone
from typing import List, Dict, Any
import requests


# --- Configuration ---
API_BASE_URL = "https://metproducts.gov.tt/api/forecasts"
DB_PATH = os.path.join(os.path.dirname(__file__), "database")
if not os.path.exists(DB_PATH):
    os.makedirs(DB_PATH)
DB_FILE = os.path.join(DB_PATH, "weather_forecasts.db")


def setup_database() -> None:
    """
    Ensure SQLite database and required tables exist with the expected schema.
    Drops legacy 'forecasts' table if present to avoid confusion.
    """
    conn = None
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()

        # Drop legacy table if it ever existed
        cursor.execute("DROP TABLE IF EXISTS forecasts")

        # Create the detailed_forecasts table with fields aligned to the API
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS detailed_forecasts (
                forecastid INTEGER PRIMARY KEY,
                amended TEXT,
                IssuedAt TEXT,
                forecastTime TEXT,
                forecaster TEXT,
                forecastPeriod TEXT,
                forecastArea1 TEXT,
                forecastArea2 TEXT,
                forecastArea3 TEXT,
                textArea1 TEXT,
                textArea2 TEXT,
                textArea3 TEXT,
                addMarine TEXT,
                imageTrin TEXT,
                imagebago TEXT,
                seas TEXT,
                waves1 TEXT,
                waves2 TEXT,
                PiarcoMnTemp TEXT,
                CrownMnTemp TEXT,
                TmPiarcoMnTemp TEXT,
                TmCrownMnTemp TEXT,
                TmWeatherPiarcoMn TEXT,
                TmWeatherCpMn TEXT,
                TmPiarcoMxTemp TEXT,
                TmCrownMxTemp TEXT,
                TmWeatherPiarcoMx TEXT,
                TmWeatherCpMx TEXT,
                outlook1 TEXT,
                minTrin24look TEXT,
                maxTrin24look TEXT,
                minTob24look TEXT,
                maxTob24look TEXT,
                outlook2 TEXT,
                minTrin48look TEXT,
                maxTrin48look TEXT,
                minTob48look TEXT,
                maxTob48look TEXT,
                outlook24WeatherPiarco TEXT,
                outlook48WeatherPiarco TEXT,
                outlook24WeatherCrown TEXT,
                outlook48WeatherCrown TEXT,
                PiarcoFcstMxTemp TEXT,
                CrownFcstMxTemp TEXT,
                PiarcoActMxTemp TEXT,
                CrownActMxTemp TEXT,
                PiarcoFcstMnTemp TEXT,
                CrownFcstMnTemp TEXT,
                PiarcoRainfall TEXT,
                CrownPointRinfall TEXT,
                cumlativeRain TEXT,
                cumlativeCpRain TEXT,
                PiarcoheatIndex TEXT,
                CPointheatIndex TEXT,
                sunrise TEXT,
                sunset TEXT,
                gustywinds TEXT,
                gustywinds2 TEXT,
                tideDate TEXT,
                tideTime TEXT,
                tideTime2 TEXT,
                trinAmHigh TEXT,
                trinPmHigh TEXT,
                trinAmLow TEXT,
                trinPmLow TEXT,
                tobAmHigh TEXT,
                tobPmHigh TEXT,
                tobAmLow TEXT,
                tobPmLow TEXT,
                precipitation TEXT,
                timePeriod TEXT,
                probrainfall TEXT,
                uvrate TEXT,
                jsonObject TEXT,
                wx24 TEXT,
                wx24cp TEXT,
                wx48 TEXT,
                wx48cp TEXT,
                synopsis TEXT,
                TmPiarco TEXT,
                TmCrown TEXT,
                insertionDate TEXT
            )
        ''')

        # Ensure RSS alerts table exists for run_scrapers orchestration
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

        # Analytics table for run logging (shared by scrapers)
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

        conn.commit()
        print(f"Database '{DB_FILE}' is set up and ready.")
    except sqlite3.Error as e:
        print(f"Database error: {e}")
    finally:
        if conn:
            conn.close()


def fetch_all_forecasts() -> List[Dict[str, Any]]:
    """
    Fetch all forecast pages using API pagination and return a flat list of items.
    Also writes each page to forecast_page_{n}.json for inspection.
    """
    all_items: List[Dict[str, Any]] = []
    page = 1

    headers = {
        "Accept": "application/json",
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/115.0 Safari/537.36"
        ),
    }

    while True:
        url = f"{API_BASE_URL}?page={page}"
        print(f"Fetching: {url}")
        try:
            resp = requests.get(url, headers=headers, timeout=15)
            resp.raise_for_status()
            data = resp.json()

            # Persist raw page for debugging
            with open(f"forecast_page_{page}.json", "w", encoding="utf-8") as fh:
                json.dump(data, fh, indent=4, ensure_ascii=False)

            items = data.get("items", []) or []
            all_items.extend(items)

            meta = data.get("_meta", {})
            current_page = int(meta.get("currentPage", page))
            page_count = int(meta.get("pageCount", page))
            if current_page < page_count:
                page += 1
                continue
            print("Reached last page.")
            break
        except requests.RequestException as e:
            print(f"HTTP error while fetching forecasts: {e}")
            break
        except ValueError as e:
            print(f"JSON parse error: {e}")
            break

    return all_items


def save_forecasts_to_db(forecasts: List[Dict[str, Any]]) -> int:
    """
    Insert or ignore forecasts into detailed_forecasts. Returns number of new rows.
    """
    if not forecasts:
        print("No forecasts to save.")
        return 0

    conn = None
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()

        # Build INSERT dynamically from a single source-of-truth columns list
        columns = [
            'forecastid', 'amended', 'IssuedAt', 'forecastTime', 'forecaster', 'forecastPeriod',
            'forecastArea1', 'forecastArea2', 'forecastArea3', 'textArea1', 'textArea2', 'textArea3',
            'addMarine', 'imageTrin', 'imagebago', 'seas', 'waves1', 'waves2',
            'PiarcoMnTemp', 'CrownMnTemp', 'TmPiarcoMnTemp', 'TmCrownMnTemp',
            'TmWeatherPiarcoMn', 'TmWeatherCpMn', 'TmPiarcoMxTemp', 'TmCrownMxTemp',
            'TmWeatherPiarcoMx', 'TmWeatherCpMx', 'outlook1',
            'minTrin24look', 'maxTrin24look', 'minTob24look', 'maxTob24look',
            'outlook2', 'minTrin48look', 'maxTrin48look', 'minTob48look', 'maxTob48look',
            'outlook24WeatherPiarco', 'outlook48WeatherPiarco', 'outlook24WeatherCrown', 'outlook48WeatherCrown',
            'PiarcoFcstMxTemp', 'CrownFcstMxTemp', 'PiarcoActMxTemp', 'CrownActMxTemp',
            'PiarcoFcstMnTemp', 'CrownFcstMnTemp', 'PiarcoRainfall', 'CrownPointRinfall',
            'cumlativeRain', 'cumlativeCpRain', 'PiarcoheatIndex', 'CPointheatIndex',
            'sunrise', 'sunset', 'gustywinds', 'gustywinds2',
            'tideDate', 'tideTime', 'tideTime2',
            'trinAmHigh', 'trinPmHigh', 'trinAmLow', 'trinPmLow',
            'tobAmHigh', 'tobPmHigh', 'tobAmLow', 'tobPmLow',
            'precipitation', 'timePeriod', 'probrainfall', 'uvrate',
            'jsonObject', 'wx24', 'wx24cp', 'wx48', 'wx48cp',
            'synopsis', 'TmPiarco', 'TmCrown', 'insertionDate',
        ]

        placeholders = ','.join(['?'] * len(columns))
        column_list_sql = ', '.join(columns)

        insert_count = 0
        for f in forecasts:
            values = tuple(f.get(c) for c in columns)
            cursor.execute(
                f"INSERT OR IGNORE INTO detailed_forecasts ({column_list_sql}) VALUES ({placeholders})",
                values,
            )
            if cursor.rowcount > 0:
                insert_count += 1

        conn.commit()
        print(f"Successfully saved {insert_count} new forecast(s).")
        return insert_count
    except sqlite3.Error as e:
        print(f"Database error during insert: {e}")
        return 0
    finally:
        if conn:
            conn.close()


def log_scraper_run(
    run_type: str,
    start_time: datetime,
    end_time: datetime,
    records_fetched: int,
    records_inserted: int,
    success: bool,
    error_message: str | None = None,
    api_response_time: float | None = None,
) -> None:
    """Log a scraper run to the analytics table."""
    conn = None
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()

        duration = (end_time - start_time).total_seconds()

        # Count total records
        cursor.execute("SELECT COUNT(*) FROM detailed_forecasts")
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
            total_records,
        ))

        conn.commit()
        print(f"Logged scraper run analytics for {run_type}")
    except sqlite3.Error as e:
        print(f"Error logging scraper run: {e}")
    finally:
        if conn:
            conn.close()


def get_database_stats() -> Dict[str, Any]:
    """Return high-level stats about the database contents."""
    conn = None
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()

        cursor.execute("SELECT COUNT(*) FROM detailed_forecasts")
        forecasts_count = cursor.fetchone()[0]

        cursor.execute("SELECT MAX(insertionDate) FROM detailed_forecasts")
        latest_forecast = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM scraper_analytics")
        run_count = cursor.fetchone()[0]

        cursor.execute(
            "SELECT run_type, run_timestamp, success FROM scraper_analytics ORDER BY run_id DESC LIMIT 1"
        )
        last_run = cursor.fetchone()

        return {
            "total_forecasts": forecasts_count,
            "latest_forecast_date": latest_forecast,
            "total_runs": run_count,
            "last_run": {
                "type": last_run[0] if last_run else None,
                "timestamp": last_run[1] if last_run else None,
                "success": last_run[2] if last_run else None,
            },
        }
    except sqlite3.Error as e:
        print(f"Error getting database stats: {e}")
        return {}
    finally:
        if conn:
            conn.close()


def main() -> None:
    print("--- Starting Weather Forecast Scraper ---")
    setup_database()
    items = fetch_all_forecasts()
    if items:
        print(f"Total forecasts fetched: {len(items)}")
        save_forecasts_to_db(items)
    else:
        print("No forecast data fetched.")
    print("--- Scraper finished. ---")


if __name__ == "__main__":
    main()


