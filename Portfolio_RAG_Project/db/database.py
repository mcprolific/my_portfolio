import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.engine import URL

_env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env")
load_dotenv(_env_path)

def _strip(v: str | None) -> str | None:
    if v is None:
        return None
    return v.strip().strip("'").strip('"')

host = _strip(os.getenv("DB_HOST")) or "127.0.0.1"
port = int(_strip(os.getenv("DB_PORT")) or "4000")
user = _strip(os.getenv("DB_USERNAME")) or "root"
password = _strip(os.getenv("DB_PASSWORD")) or ""
database = _strip(os.getenv("DB_DATABASE")) or "portfoliodb"
ssl_ca = _strip(os.getenv("DB_SSL_CA") or os.getenv("TIDB_SSL_CA"))

connect_args = {}
if ssl_ca:
    connect_args["ssl_ca"] = ssl_ca
    connect_args["ssl_verify_cert"] = True
    connect_args["ssl_verify_identity"] = True

url = URL.create(
    drivername="mysql+mysqlconnector",
    username=user or None,
    password=password or None,
    host=host,
    port=port,
    database=database,
)

engine = create_engine(url, pool_pre_ping=True, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def _seed_defaults():
    from .models import HomeContent, AboutContent, SocialLinks, SiteSettings, ContactSettings
    db = SessionLocal()
    try:
        if not db.query(HomeContent).first():
            db.add(HomeContent(title="Saka Idris (McP)", desc="I specialize in Project Write-up, Data Analysis, Graphic Design, Computer Engineering and AI Developer/Engineer."))
        if not db.query(AboutContent).first():
            db.add(AboutContent(p1="", p2=""))
        if not db.query(SocialLinks).first():
            db.add(SocialLinks(github="https://github.com/", linkedin="https://www.linkedin.com/", twitter="https://x.com/"))
        if not db.query(SiteSettings).first():
            db.add(SiteSettings(theme="light"))
        if not db.query(ContactSettings).first():
            db.add(ContactSettings(subtitle="I usually reply within 24 hours"))
        db.commit()
    except Exception:
        db.rollback()
    finally:
        db.close()

def init_db():
    from . import models  # noqa: F401
    try:
        server_url = URL.create(
            drivername="mysql+mysqlconnector",
            username=user or None,
            password=password or None,
            host=host,
            port=port,
            database=None,
        )
        server_engine = create_engine(server_url, pool_pre_ping=True, connect_args=connect_args)
        with server_engine.begin() as conn:
            conn.execute(text(f"CREATE DATABASE IF NOT EXISTS `{database}`"))
            print("Database created!")
    except Exception:
        pass
    try:
        with engine.begin() as conn:
            conn.execute(text("""
CREATE TABLE IF NOT EXISTS contact_messages (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            source VARCHAR(255) NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
"""))
    except Exception:
        pass
    try:
        with engine.begin() as conn:
            conn.execute(text("ALTER TABLE contact_messages ADD COLUMN source VARCHAR(255) NULL"))
    except Exception:
        pass
    try:
        with engine.begin() as conn:
            conn.execute(text("""
CREATE TABLE IF NOT EXISTS admin_users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
"""))
    except Exception:
        pass
    try:
        Base.metadata.create_all(bind=engine)
    except Exception:
        pass
    try:
        _seed_defaults()
    except Exception:
        pass
