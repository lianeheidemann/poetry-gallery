# Minha Galeria

Aplicação web em HTML, CSS e JavaScript puro para cadastrar, pesquisar e excluir poemas.

## Estrutura

```text
web_minha_galeria/
├── assets/
│   ├── css/
│   │   ├── auth.css
│   │   ├── base.css
│   │   └── gallery.css
│   └── js/
│       ├── gallery.js
│       ├── login.js
│       ├── register.js
│       └── storage.js
├── Imagens/
├── cadastrar.html
├── galeria.html
└── login.html
```

Os arquivos HTML cuidam da estrutura, os arquivos CSS da apresentação e os arquivos JavaScript do comportamento e da persistência no `localStorage`.

## Executar localmente

Abra `cadastrar.html` no navegador para criar um usuário. Em seguida, faça login e use a galeria.

> Este é um projeto educacional. As credenciais ficam no `localStorage` do navegador e esse método não deve ser usado em produção.
