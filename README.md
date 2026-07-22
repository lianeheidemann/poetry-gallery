# Minha Galeria

Aplicação web para cadastrar, pesquisar e organizar poemas. O projeto usa HTML semântico, CSS, JavaScript modular, Flask e SQLite.

## Demonstração

https://github.com/lianeheidemann/minhaGaleria/assets/54177181/8df0d37a-eb89-4f11-bdf1-1e1b7750e620

## Usuário de teste

O banco de dados cria automaticamente um usuário de demonstração:

- **Usuário:** `teste`
- **Senha:** `teste123`

Essa conta contém cinco poemas famosos em domínio público e permite testar login, pesquisa e cadastro de novos poemas. As credenciais são públicas e existem exclusivamente para demonstração.

## Poemas de demonstração

- **Canção do Exílio**, de Gonçalves Dias — [fonte](https://pt.wikisource.org/wiki/Can%C3%A7%C3%A3o_do_Ex%C3%ADlio_%28Gon%C3%A7alves_Dias%29)
- **Via Láctea — XIII**, de Olavo Bilac — [fonte](https://pt.wikisource.org/wiki/Via_L%C3%A1ctea)
- **As Pombas**, de Raimundo Correia — [fonte](https://pt.wikisource.org/wiki/As_Pombas...)
- **Círculo Vicioso**, de Machado de Assis — [fonte](https://pt.wikisource.org/wiki/C%C3%ADrculo_Vicioso)
- **Mal Secreto**, de Raimundo Correia — [fonte](https://pt.wikisource.org/wiki/Mal_Secreto)

## Funcionalidades

- cadastro e autenticação com sessão;
- senhas protegidas no servidor com hash seguro;
- persistência de usuários e poemas em SQLite;
- inclusão, pesquisa e exclusão de poemas;
- cinco poemas clássicos cadastrados automaticamente;
- validação no front-end e no back-end;
- layout responsivo e acessível.

## Arquitetura

```text
backend/
├── __init__.py       # fábrica da aplicação Flask
├── auth.py           # rotas de cadastro, login e sessão
├── database.py       # conexão e inicialização do SQLite
├── poems.py          # API de poemas
├── schema.sql        # estrutura do banco de dados
└── seed.py           # usuário e poemas de demonstração

assets/js/
├── core/             # cliente HTTP e constantes
├── pages/            # comportamento das páginas
└── services/         # comunicação com a API
```

## Executar localmente

É necessário ter o Python instalado. No terminal, dentro da pasta do projeto, execute:

### Windows

```powershell
py -m venv .venv
.venv\Scripts\activate
py -m pip install -r requirements.txt
py app.py
```

### Linux ou macOS

```bash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 app.py
```

Depois acesse [http://127.0.0.1:5000](http://127.0.0.1:5000).

O arquivo do banco será criado automaticamente em `instance/gallery.sqlite3`. A pasta `instance` não é enviada ao GitHub.

> O GitHub Pages não executa Flask nem SQLite. Para publicar a aplicação completa, use uma hospedagem que aceite aplicações Python.

## Testes

Com o ambiente virtual ativado, execute:

```bash
python -m unittest discover -s tests -v
```

## Segurança

Defina a variável de ambiente `SECRET_KEY` com um valor longo e aleatório antes de publicar a aplicação. O valor padrão existe apenas para desenvolvimento local.
