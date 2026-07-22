import sqlite3

from flask import current_app, g


def get_database():
    if "database" not in g:
        g.database = sqlite3.connect(current_app.config["DATABASE"])
        g.database.row_factory = sqlite3.Row
        g.database.execute("PRAGMA foreign_keys = ON")
    return g.database


def close_database(_error=None):
    database = g.pop("database", None)
    if database is not None:
        database.close()


def init_database():
    database = get_database()
    with current_app.open_resource("schema.sql") as schema_file:
        database.executescript(schema_file.read().decode("utf-8"))


def init_app(app):
    app.teardown_appcontext(close_database)
