import os
from pathlib import Path

from flask import Flask, send_from_directory

from . import auth, database, poems
from .seed import seed_database


PROJECT_ROOT = Path(__file__).resolve().parent.parent


def create_app(test_config=None):
    app = Flask(
        __name__,
        instance_relative_config=True,
        static_folder=str(PROJECT_ROOT),
        static_url_path="",
    )
    app.config.from_mapping(
        DATABASE=os.path.join(app.instance_path, "gallery.sqlite3"),
        SECRET_KEY=os.environ.get("SECRET_KEY", "dev-only-change-in-production"),
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SAMESITE="Lax",
    )

    if test_config:
        app.config.update(test_config)

    os.makedirs(app.instance_path, exist_ok=True)
    database.init_app(app)
    app.register_blueprint(auth.blueprint)
    app.register_blueprint(poems.blueprint)

    @app.get("/")
    def index():
        return send_from_directory(PROJECT_ROOT, "index.html")

    with app.app_context():
        database.init_database()
        seed_database()

    return app
