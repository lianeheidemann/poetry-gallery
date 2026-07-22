# Minha Galeria

Aplicação web responsiva para cadastrar, pesquisar e organizar poemas. Desenvolvida com HTML semântico, CSS e JavaScript modular, sem dependências externas.

## Demonstração

https://github.com/lianeheidemann/minhaGaleria/assets/54177181/8df0d37a-eb89-4f11-bdf1-1e1b7750e620

## Usuário de teste

O projeto possui um usuário de demonstração pré-configurado, que permite acessar a galeria sem realizar um novo cadastro:

- **Usuário:** `teste`
- **Senha:** `teste123`

Com esse usuário, é possível testar o login e as funcionalidades de inclusão, pesquisa e exclusão de poemas. Os poemas adicionados ficam armazenados somente no navegador utilizado, por meio do `localStorage`.

As credenciais são públicas e existem exclusivamente para demonstração. Não devem ser utilizadas em uma aplicação de produção.

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
