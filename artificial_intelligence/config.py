import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/mechanic_db")
MONGO_DB_NAME = "mechanic_db"
MONGO_COLLECTION = "services"
