env\Scripts\activate
uvicorn main:app --reload --host 127.0.0.1 --port 8000

psycopg2-binary → driver to connect to PostgreSQL
SQLAlchemy → ORM (helps manage tables easily)
databases → async DB connection for FastAPI
python-dotenv → read secrets from .env

gsap