import sqlite3

from flask import Blueprint, jsonify, request, session
from werkzeug.security import check_password_hash, generate_password_hash

from .database import get_database


blueprint = Blueprint("auth", __name__, url_prefix="/api/auth")


@blueprint.post("/register")
def register():
    payload = request.get_json(silent=True) or {}
    username = str(payload.get("username", "")).strip()
    password = str(payload.get("password", ""))

    if len(username) < 3:
        return jsonify(error="O usuário deve ter pelo menos 3 caracteres."), 400
    if len(password) < 6:
        return jsonify(error="A senha deve ter pelo menos 6 caracteres."), 400

    try:
        database = get_database()
        database.execute(
            "INSERT INTO users (username, password_hash) VALUES (?, ?)",
            (username, generate_password_hash(password)),
        )
        database.commit()
    except sqlite3.IntegrityError:
        return jsonify(error="Este nome de usuário já está em uso."), 409

    return jsonify(message="Usuário cadastrado com sucesso."), 201


@blueprint.post("/login")
def login():
    payload = request.get_json(silent=True) or {}
    username = str(payload.get("username", "")).strip()
    password = str(payload.get("password", ""))
    user = get_database().execute(
        "SELECT id, username, password_hash FROM users WHERE username = ?",
        (username,),
    ).fetchone()

    if user is None or not check_password_hash(user["password_hash"], password):
        return jsonify(error="Usuário ou senha incorretos."), 401

    session.clear()
    session["user_id"] = user["id"]
    session["username"] = user["username"]
    return jsonify(user={"id": user["id"], "username": user["username"]})


@blueprint.get("/session")
def current_session():
    if "user_id" not in session:
        return jsonify(user=None)
    return jsonify(user={"id": session["user_id"], "username": session["username"]})


@blueprint.post("/logout")
def logout():
    session.clear()
    return "", 204
