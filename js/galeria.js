const tituloInput = document.getElementById("titulo");
const poemaInput = document.getElementById("poema");
const autorInput = document.getElementById("autor");
const categoriaSelect = document.getElementById("select");
const inputPesquisa = document.getElementById("inputPesquisa");
const tabela = document.getElementById("tbl");
const username = localStorage.getItem("username");

const elementoUsername = document.getElementById("myUsername");
elementoUsername.textContent = username || "Visitante";

function adicionaLinha() {
  const numeroLinhas = tabela.rows.length;
  const linha = tabela.insertRow(numeroLinhas);
  const celulaPoema = linha.insertCell(0);
  const celulaExcluir = linha.insertCell(1);

  const titulo = document.createElement("p");
  titulo.textContent = `${tituloInput.value} (Autor: ${autorInput.value})`;

  const poema = document.createElement("p");
  poema.textContent = poemaInput.value;

  const categoria = document.createElement("p");
  categoria.textContent = `[Categoria: ${categoriaSelect.value}]`;

  celulaPoema.append(titulo, poema, categoria);

  const botaoExcluir = criarBotaoExcluir();
  celulaExcluir.appendChild(botaoExcluir);
}

function criarBotaoExcluir() {
  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "delete-button";
  botao.addEventListener("click", function () {
    removeLinha(botao);
  });

  const imagem = document.createElement("img");
  imagem.src = "img/deleteIcon.png";
  imagem.alt = "Excluir poema";

  botao.appendChild(imagem);
  return botao;
}

function removeLinha(botao) {
  const indiceLinha = botao.closest("tr").rowIndex;
  tabela.deleteRow(indiceLinha);
}

function logout() {
  deletarColuna();

  document.getElementById("meuContainer").style.display = "none";
  document.getElementById("logout").style.display = "none";
}

function deletarColuna() {
  const indiceColuna = 1;

  for (let i = 0; i < tabela.rows.length; i += 1) {
    const linha = tabela.rows[i];

    if (linha.cells.length > indiceColuna) {
      linha.deleteCell(indiceColuna);
    }
  }
}

function filtrarPoemas() {
  const filtro = inputPesquisa.value.toLowerCase();
  const linhas = tabela.getElementsByTagName("tr");

  for (let i = 1; i < linhas.length; i += 1) {
    const textoLinha = linhas[i].textContent.toLowerCase();
    linhas[i].style.display = textoLinha.includes(filtro) ? "" : "none";
  }
}

function prepararBotoesExistentes() {
  const botoes = document.querySelectorAll(".delete-button");

  botoes.forEach(function (botao) {
    botao.addEventListener("click", function () {
      removeLinha(botao);
    });
  });
}

document.getElementById("adicionarPoema").addEventListener("click", adicionaLinha);
document.getElementById("logout").addEventListener("click", logout);
inputPesquisa.addEventListener("keyup", filtrarPoemas);

prepararBotoesExistentes();
