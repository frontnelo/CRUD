//Obtienendo los elementos de HTML
const nombre = document.getElementById("nombre") //input
const guardarBtn = document.getElementById("guardarBtn")
const alumnos = document.getElementById("alumnos") //ul

// Ejemplo de como usar onchange
nombre.onchange = (/*event*/)=>{
    //console.log(event)

    console.log("Input modificado: ", nombre.value)
}

// Arreglo de alumnos. Array de objetos
const listaAlumnos = JSON.parse(localStorage.getItem("alumnos")) || []

guardarBtn.onclick = ()=>{
    let nombreAlumno = nombre.value
    // La estructura de objetos que seguiremos
    let alumno = {
        nombre: nombreAlumno,
    }

    listaAlumnos.push(alumno)

    localStorage.setItem("alumnos", JSON.stringify(listaAlumnos))

    mostrarAlumnos()
}


function mostrarAlumnos(){
    alumnos.innerHTML = "" // REiniciar lista de alumno

    listaAlumnos.forEach((alumno, indice)=>{
        console.log(alumno)
        let li = document.createElement('li')

        let p = document.createElement("p")
        p.innerText = alumno.nombre

        let deleteBtn = document.createElement("button")
        deleteBtn.innerText = "Eliminar"

        deleteBtn.onclick = ()=>{
            listaAlumnos.splice(indice,1) // Modifica el array original
            localStorage.setItem("alumnos", JSON.stringify(listaAlumnos))
            mostrarAlumnos()
        }

        li.appendChild(p)
        li.appendChild(deleteBtn)

        alumnos.appendChild(li)
    })
}

mostrarAlumnos()