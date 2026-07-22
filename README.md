# Minha Galeria

Aplicação web responsiva para cadastrar, pesquisar e organizar poemas. Desenvolvida com HTML semântico, CSS e JavaScript modular, sem dependências externas.

## Funcionalidades

- cadastro e autenticação local;
- sessão por aba do navegador;
- senhas protegidas com PBKDF2 e salt individual;
- poemas separados por usuário;
- inclusão, pesquisa e exclusão de poemas;
- layout responsivo e acessível;
- persistência de dados no navegador.

## Arquitetura

```text
assets/
├── css/
│   ├── auth.css
│   ├── base.css
│   └── gallery.css
└── js/
    ├── core/
    │   ├── constants.js
    │   ├── crypto.js
    │   └── storage.js
    ├── pages/
    │   ├── gallery.js
    │   ├── login.js
    │   └── register.js
    └── services/
        ├── auth-service.js
        └── poem-service.js
```

- `core`: infraestrutura compartilhada e configurações.
- `services`: regras de autenticação e gerenciamento dos poemas.
- `pages`: interação entre cada página e os serviços.
- `css`: estilos globais e específicos de cada contexto.

## Executar localmente

Como o projeto usa módulos ES, execute-o por um servidor HTTP local. Por exemplo:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Limitação de segurança

Este é um projeto de front-end para fins educacionais. Embora a senha seja derivada com PBKDF2 antes do armazenamento, uma aplicação de produção deve realizar autenticação e persistência em um servidor seguro.
