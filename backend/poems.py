from flask import Blueprint, jsonify, request, session

from .database import get_database


blueprint = Blueprint("poems", __name__, url_prefix="/api/poems")


def require_user():
    return session.get("user_id")


def serialize_poem(poem):
    return {
        "id": poem["id"],
        "title": poem["title"],
        "author": poem["author"],
        "text": poem["content"],
        "category": poem["category"],
        "sourceUrl": poem["source_url"],
        "isSeed": bool(poem["is_seed"]),
        "createdAt": poem["created_at"],
    }


@blueprint.get("")
def list_poems():
    user_id = require_user()
    if user_id is None:
        return jsonify(error="Autenticação necessária."), 401

    search = request.args.get("search", "").strip()
    parameters = [user_id]
    where = "user_id = ?"

    if search:
        term = f"%{search}%"
        where += " AND (title LIKE ? OR author LIKE ? OR content LIKE ? OR category LIKE ?)"
        parameters.extend([term, term, term, term])

    rows = get_database().execute(
        f"SELECT * FROM poems WHERE {where} ORDER BY is_seed DESC, created_at DESC, id DESC",
        parameters,
    ).fetchall()
    return jsonify(poems=[serialize_poem(row) for row in rows])


@blueprint.post("")
def create_poem():
    user_id = require_user()
    if user_id is None:
        return jsonify(error="Autenticação necessária."), 401

    payload = request.get_json(silent=True) or {}
    title = str(payload.get("title", "")).strip()
    author = str(payload.get("author", "")).strip()
    content = str(payload.get("text", "")).strip()
    category = str(payload.get("category", "Sem categoria")).strip()

    if not 1 <= len(title) <= 100:
        return jsonify(error="Informe um título com até 100 caracteres."), 400
    if not 1 <= len(author) <= 80:
        return jsonify(error="Informe um autor com até 80 caracteres."), 400
    if not 1 <= len(content) <= 3000:
        return jsonify(error="Informe um poema com até 3.000 caracteres."), 400

    database = get_database()
    cursor = database.execute(
        """
        INSERT INTO poems (user_id, title, author, content, category)
        VALUES (?, ?, ?, ?, ?)
        """,
        (user_id, title, author, content, category or "Sem categoria"),
    )
    database.commit()
    poem = database.execute("SELECT * FROM poems WHERE id = ?", (cursor.lastrowid,)).fetchone()
    return jsonify(poem=serialize_poem(poem)), 201


@blueprint.delete("/<int:poem_id>")
def delete_poem(poem_id):
    user_id = require_user()
    if user_id is None:
        return jsonify(error="Autenticação necessária."), 401

    database = get_database()
    poem = database.execute(
        "SELECT id, is_seed FROM poems WHERE id = ? AND user_id = ?",
        (poem_id, user_id),
    ).fetchone()

    if poem is None:
        return jsonify(error="Poema não encontrado."), 404
    if poem["is_seed"]:
        return jsonify(error="Os poemas de demonstração não podem ser excluídos."), 403

    database.execute("DELETE FROM poems WHERE id = ?", (poem_id,))
    database.commit()
    return "", 204
