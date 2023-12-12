const NOME = document.querySelector("#nome");
const TELEFONE = document.querySelector("#telefone");
const FORM = document.querySelector("form");
const TABELA = document.querySelector("table tbody");
const CONTATOS = [];
let index = 0;

FORM.addEventListener("submit", (e) => {
  e.preventDefault();
  adicionar();
  exibir();
});

function limparInputs() {
  NOME.value = "";
  TELEFONE.value = "";
}

function adicionar() {
  const row = document.createElement("tr");
  row.dataset.index = index;
  row.innerHTML = `<tr>
  <td>${NOME.value} </td>  
  <td>${TELEFONE.value} </td>  
  <td><span class="material-symbols-outlined icon remover" onclick="remover(${index})">delete</span> </td>  
  <td><span class="material-symbols-outlined icon editar">edit</span></td>  
  </tr>
  `;
  CONTATOS.push({ index, element: row });
  limparInputs();
  index++;
}

function remover(i) {
  const row_to_remove = CONTATOS.findIndex(({ index }) => index === i);
  CONTATOS.splice(row_to_remove, 1);
  exibir();
}

function exibir() {
  TABELA.innerHTML = "";
  CONTATOS.forEach((contato) => {
    TABELA.appendChild(contato.element);
  });
}
