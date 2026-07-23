const tituloInput = document.getElementById("titulo");
const poemaInput = document.getElementById("poema");
const autorInput = document.getElementById("autor");
const categoriaSelect = document.getElementById("select");
const inputPesquisa = document.getElementById("inputPesquisa");
const tabela = document.getElementById("tbl");

const username = sessionStorage.getItem("username");
const elementoUsername = document.getElementById("myUsername");

elementoUsername.textContent = username || "Visitante";

/* Cinco poemas iniciais */
const poemasIniciais = [
  {
    id: "1",
    titulo: "Canção do Exílio",
    autor: "Gonçalves Dias",
    categoria: "Saudade",
    poema: `Minha terra tem palmeiras,
Onde canta o Sabiá;
As aves, que aqui gorjeiam,
Não gorjeiam como lá.`
  },
  {
    id: "2",
    titulo: "Amor é fogo que arde sem se ver",
    autor: "Luís de Camões",
    categoria: "Amor",
    poema: `Amor é fogo que arde sem se ver;
É ferida que dói, e não se sente;
É um contentamento descontente;
É dor que desatina sem doer.`
  },
  {
    id: "3",
    titulo: "Meus Oito Anos",
    autor: "Casimiro de Abreu",
    categoria: "Saudade",
    poema: `Oh! que saudades que tenho
Da aurora da minha vida,
Da minha infância querida
Que os anos não trazem mais!`
  },
  {
    id: "4",
    titulo: "Ouvir Estrelas",
    autor: "Olavo Bilac",
    categoria: "Reflexão",
    poema: `Ora, direis, ouvir estrelas! Certo
Perdeste o senso! E eu vos direi, no entanto,
Que, para ouvi-las, muita vez desperto
E abro as janelas, pálido de espanto.`
  },
  {
    id: "5",
    titulo: "Mar Português",
    autor: "Fernando Pessoa",
    categoria: "Reflexão",
    poema: `Ó mar salgado, quanto do teu sal
São lágrimas de Portugal!
Por te cruzarmos, quantas mães choraram,
Quantos filhos em vão rezaram!`
  }
];

/* Salva os poemas iniciais somente na primeira execução */
if (!sessionStorage.getItem("poemas")) {
  sessionStorage.setItem(
    "poemas",
    JSON.stringify(poemasIniciais)
  );
}

let poemas = JSON.parse(sessionStorage.getItem("poemas")) || [];

/* Mostra todos os poemas na tabela */
function mostrarPoemas() {
  while (tabela.rows.length > 1) {
    tabela.deleteRow(1);
  }

  poemas.forEach(function (poema) {
    criarLinhaPoema(poema);
  });
}

/* Cria uma linha na tabela */
function criarLinhaPoema(dadosPoema) {
  const numeroLinhas = tabela.rows.length;
  const linha = tabela.insertRow(numeroLinhas);

  const celulaPoema = linha.insertCell(0);
  const celulaExcluir = linha.insertCell(1);

  const titulo = document.createElement("p");
  titulo.textContent =
    `${dadosPoema.titulo} (Autor: ${dadosPoema.autor})`;

  const textoPoema = document.createElement("p");
  textoPoema.textContent = dadosPoema.poema;

  const categoria = document.createElement("p");
  categoria.textContent =
    `[Categoria: ${dadosPoema.categoria}]`;

  celulaPoema.append(
    titulo,
    textoPoema,
    categoria
  );

  const botaoExcluir = criarBotaoExcluir(dadosPoema.id);
  celulaExcluir.appendChild(botaoExcluir);
}

/* Adiciona um novo poema */
function adicionaLinha() {
  const titulo = tituloInput.value.trim();
  const texto = poemaInput.value.trim();
  const autor = autorInput.value.trim();
  const categoria = categoriaSelect.value;

  if (!titulo || !texto || !autor) {
    alert("Preencha o título, o poema e o autor.");
    return;
  }

  const novoPoema = {
    id: Date.now().toString(),
    titulo: titulo,
    poema: texto,
    autor: autor,
    categoria: categoria
  };

  poemas.push(novoPoema);
  salvarPoemas();
  mostrarPoemas();
  limparFormulario();
}

/* Cria o botão de exclusão */
function criarBotaoExcluir(idPoema) {
  const botao = document.createElement("button");

  botao.type = "button";
  botao.className = "delete-button";

  botao.addEventListener("click", function () {
    removePoema(idPoema);
  });

  const imagem = document.createElement("img");

  imagem.src = "assets/imagem/deleteIcon.png";
  imagem.alt = "Excluir poema";

  botao.appendChild(imagem);

  return botao;
}

/* Remove o poema e atualiza o sessionStorage */
function removePoema(idPoema) {
  poemas = poemas.filter(function (poema) {
    return poema.id !== idPoema;
  });

  salvarPoemas();
  mostrarPoemas();
}

/* Salva a lista atualizada */
function salvarPoemas() {
  sessionStorage.setItem(
    "poemas",
    JSON.stringify(poemas)
  );
}

/* Limpa o formulário */
function limparFormulario() {
  tituloInput.value = "";
  poemaInput.value = "";
  autorInput.value = "";
  categoriaSelect.selectedIndex = 0;
}

/* Pesquisa na tabela */
function filtrarPoemas() {
  const filtro = inputPesquisa.value
    .trim()
    .toLowerCase();

  const linhas = tabela.getElementsByTagName("tr");

  for (let i = 1; i < linhas.length; i += 1) {
    const textoLinha = linhas[i]
      .textContent
      .toLowerCase();

    linhas[i].style.display =
      textoLinha.includes(filtro) ? "" : "none";
  }
}

/* Logout */
function logout() {
  window.location.href = "login.html";
}

document
  .getElementById("adicionarPoema")
  .addEventListener("click", adicionaLinha);

document
  .getElementById("logout")
  .addEventListener("click", logout);

inputPesquisa.addEventListener("keyup", filtrarPoemas);

mostrarPoemas();