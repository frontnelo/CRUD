console.log("Entro al main.js");

const nombreInput = document.getElementById("nombreInput");
const lista = document.getElementById("lista");
let nombres = JSON.parse(localStorage.getItem("nombres")) || [];
let editando = false;
let nombre_previo = "";

function agregarNombre() {
  if (editando) {
    nombres = nombres.map(nombreIndividual =>
      nombreIndividual === nombre_previo ? nombreInput.value : nombreIndividual
    );
    localStorage.setItem("nombres", JSON.stringify(nombres));
    nombreInput.value = "";
    actualizarLista();
    editando = false;
  } else {
    const nombre = nombreInput.value;
    nombres.push(nombre);
    localStorage.setItem("nombres", JSON.stringify(nombres));
    nombreInput.value = "";
    actualizarLista();
  }
}

function actualizarLista() {
  lista.innerHTML = "";
  nombres.forEach(nombre => {
    const li = document.createElement("li");
    li.textContent = nombre;
    li.classList.add("list-group-item");

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-danger", "float-right");
    btnEliminar.innerHTML = '<i class="fa fa-trash"></i>';
    btnEliminar.addEventListener("click", () => deleteIndividual(nombre));
    li.appendChild(btnEliminar);

    const btnEdit = document.createElement("button");
    btnEdit.classList.add("btn", "btn-warning", "float-right", "mr-2");
    btnEdit.innerHTML = '<i class="fa fa-edit"></i>';
    btnEdit.addEventListener("click", () => editar(nombre));
    li.appendChild(btnEdit);

    lista.appendChild(li);
  });
}

function deleteIndividual(nombre) {
  nombres = nombres.filter(n => n !== nombre);
  localStorage.setItem("nombres", JSON.stringify(nombres));
  actualizarLista();
}

function limpiarStorage() {
  localStorage.clear();
  nombres = [];
  actualizarLista();
}

function editar(nombre) {
  editando = true;
  nombre_previo = nombre;
  nombreInput.value = nombre;
}

(() => {
  actualizarLista();
})();

