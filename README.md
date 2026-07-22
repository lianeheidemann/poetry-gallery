# Minha Galeria

Galeria de poemas desenvolvida com HTML, CSS, JavaScript, Flask e SQLite. Permite criar uma conta, fazer login, pesquisar, cadastrar e excluir poemas.

## Demonstração

https://github.com/lianeheidemann/minhaGaleria/assets/54177181/8df0d37a-eb89-4f11-bdf1-1e1b7750e620

## Funcionalidades

- cadastro e autenticação com sessão;
- senhas protegidas com hash no servidor;
- armazenamento de usuários e poemas em SQLite;
- busca, inclusão e exclusão de poemas;
- interface responsiva.

## Banco de dados

O SQLite armazena os usuários e poemas no arquivo local `instance/gallery.sqlite3`, criado automaticamente na primeira execução. O Flask disponibiliza uma API para o navegador acessar o banco com segurança. A pasta `instance` não é enviada ao GitHub.

## Usuário de teste

- **Usuário:** `teste`
- **Senha:** `teste123`

A conta é criada automaticamente com cinco poemas clássicos: Canção do Exílio, Via Láctea — XIII, As Pombas, Círculo Vicioso e Mal Secreto. As fontes estão registradas em cada poema.

## Como executar

No terminal, dentro da pasta do projeto:

```bash
python -m venv .venv
```

Ative o ambiente virtual:

- Windows: `.venv\Scripts\activate`
- Linux/macOS: `source .venv/bin/activate`

Depois execute:

```bash
python -m pip install -r requirements.txt
python app.py
```

Acesse [http://127.0.0.1:5000](http://127.0.0.1:5000).

## Testes

```bash
python -m unittest discover -s tests -v
```

> O GitHub Pages não executa Flask ou SQLite. A aplicação completa precisa de uma hospedagem compatível com Python.
