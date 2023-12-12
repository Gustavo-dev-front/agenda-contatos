const NOME = document.querySelector("#nome");
const TELEFONE = document.querySelector("#telefone");
const FORM = document.querySelector("form");
const TABELA = document.querySelector("table tbody");
const CONTATOS = [];
let index = 0;
const edit = {
  status: false,
  element: null,
};

FORM.addEventListener("submit", (e) => {
  e.preventDefault();
  formatarTelefone();
  if (validarTelefone()) {
    adicionar();
    exibir();
  }
});

function formatarTelefone() {
  let telefone = TELEFONE.value.replace(/\D/g, "");
  telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  TELEFONE.value = telefone;
}

function validarTelefone() {
  const regex = /^(\(\d{2}\)\s?\d{5}-?\d{4})$/;

  if (!regex.test(TELEFONE.value)) {
    TELEFONE.classList.add("error");
  } else {
    TELEFONE.classList.remove("error");
  }

  return regex.test(TELEFONE.value);
}

function limparInputs() {
  NOME.value = "";
  TELEFONE.value = "";
}

function criarContato(nome, telefone) {
  const row = document.createElement("tr");
  row.dataset.index = index;
  row.innerHTML = `<tr>
  <td>${nome} </td>  
  <td>${telefone} </td>  
  <td><span class="material-symbols-outlined icon remover" onclick="remover(${index})">delete</span> </td>  
  <td><span class="material-symbols-outlined icon editar" onclick="editar(${index})">edit</span></td>  
  </tr>
  `;
  CONTATOS.push({ index, element: row });
  index++;
}

function adicionar() {
  if (!edit.status) {
    criarContato(NOME.value, TELEFONE.value);
  } else {
    const name = edit.element.querySelector("td:first-child");
    const tel = edit.element.querySelector("td:nth-child(2)");
    name.innerText = NOME.value;
    tel.innerText = TELEFONE.value;
    edit.status = false;
    edit.element = null;
  }

  limparInputs();
}

function editar(i) {
  const position = CONTATOS.findIndex(({ index }) => index === i);
  const row_to_edit = CONTATOS[position].element;
  NOME.value = row_to_edit.querySelector("td:first-child").innerText;
  TELEFONE.value = row_to_edit.querySelector("td:nth-child(2)").innerText;
  edit.status = true;
  edit.element = row_to_edit;
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
