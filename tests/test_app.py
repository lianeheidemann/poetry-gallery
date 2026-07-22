import os
import tempfile
import unittest

from backend import create_app


class GalleryApiTestCase(unittest.TestCase):
    def setUp(self):
        handle, self.database_path = tempfile.mkstemp(suffix=".sqlite3")
        os.close(handle)
        app = create_app(
            {
                "TESTING": True,
                "DATABASE": self.database_path,
                "SECRET_KEY": "test-secret",
            }
        )
        self.client = app.test_client()

    def tearDown(self):
        os.unlink(self.database_path)

    def login_demo_user(self):
        return self.client.post(
            "/api/auth/login",
            json={"username": "teste", "password": "teste123"},
        )

    def test_demo_user_has_five_seed_poems(self):
        self.assertEqual(self.login_demo_user().status_code, 200)
        response = self.client.get("/api/poems")
        poems = response.get_json()["poems"]

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(poems), 5)
        self.assertTrue(all(poem["isSeed"] for poem in poems))

    def test_create_search_and_delete_poem(self):
        self.login_demo_user()
        created = self.client.post(
            "/api/poems",
            json={
                "title": "Poema de teste",
                "author": "Autora",
                "text": "Conteúdo",
                "category": "Outros",
            },
        )
        poem_id = created.get_json()["poem"]["id"]

        self.assertEqual(created.status_code, 201)
        self.assertEqual(len(self.client.get("/api/poems?search=Autora").get_json()["poems"]), 1)
        self.assertEqual(self.client.delete(f"/api/poems/{poem_id}").status_code, 204)

    def test_api_requires_authentication(self):
        self.assertEqual(self.client.get("/api/poems").status_code, 401)


if __name__ == "__main__":
    unittest.main()
