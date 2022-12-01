
const formulario = document.getElementById('formulario')
const input = document.getElementById('input') // para acceder al input.value accedecmos al valor del input 
const listaTarea = document.getElementById('lista-tareas')
const template = document.getElementById('template').content // cuando tenemos un  template hay que hacer un clon, ver mas abajo "pintar tareas"
const fragment = document.createDocumentFragment() // el fragment agrupa una lista de hijos "child" sin agregat nodos extras el DOM

//let tareas = {}  //estas tareas se tiene q reccorer en los objetos nuevos por eso la funcion pintar Tareas
// localstorage es del navegador
let tareas = {} 

document.addEventListener('DOMContentLoaded',() =>{   // se realiza cuando el html se ha cargado y parseado se pueden ver todos los elementos 

    if(localStorage.getItem('tareas')){// obtenemos lo que viene del localstorage con un get y lo pasamos a formato JSON que es un "script"
    tareas = JSON.parse(localStorage.getItem('tareas'))
  }
  pintarTareas()
})

listaTarea.addEventListener('click',e => { //llamamos un evento para tetectar el boton al que queremos accedero, en este caso esta en la lista de tares, hacemos un evento click y relaizamos la funcion 
  btnAccion(e)                              // debemos crear la funcion - ir abajo 
})                                          // se van pintando las tareas 


//console.log(Date.now()// esto crea nuevos

formulario.addEventListener('submit', e =>{
  e.preventDefault() //detener la funcion por defecto del formulario
  //console.log(input.value)
  setTarea(e)
})

const setTarea = e => {       //validamos el formulario 
  if(input.value.trim() === '') { //validamos el formulario del input
    console.log('esta vacio')
    return
  }

  const tarea = {    //construimos el objeto nuevo 
    id: Date.now(), // crea el nuevo Id
		texto: input.value , //se crea un objeto nuevo con el valor del formulario y su imput.
    estado: false
  }

  tareas[tarea.id] = tarea //empujasmos la conexion de tareas en el let tareas de arriba //console.log(tareas)
  formulario.reset() // resetear el imput
  input.focus //hacer foco en el input desde el html
  pintarTareas() // esta funcion me muestra las tareas de la consola en el front

}

 const pintarTareas = () => {            //creamos la funcion que nos va a mostrar las tareas en el front
    listaTarea.innerHTML = '' // aca limpiamos el Dom (como ultimo paso)
    Object.values(tareas).forEach(tarea => { //recorremos cada objeto (tareas)y su calor "tareas" con forEach(por cada uno) y sera igual a los nuevos obejtos 
      const clone = template.cloneNode(true) //cuando tenemsos un templete hay que crear su clon, creamos const clone y clonamos el template en el node del Dom valindado con true, siempre clonar el templete antes de usarlo asi arrancamos desde el inicio y no sobreescribimos el codigo que vamos agregando
      clone.querySelector('p').textContent = tarea.texto //una vez el clon creado lo seleccionamos y lo modificamos, ingresamos en su elemento y lo cambiamos por el nuevo texto de la tarea.

      if(tarea.estado){//llamamos el objeto y propiedad con su clase, agarramos la clase alert... y la remplazamos por una nueva para cambiar el color del pintar tareas
        clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
        clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt')//cambiamos el boton circle por el de bucle y flecha 
        clone.querySelector('p').style.textDecoration = 'line-through' // traemos el elemento p con el querySelector, seleccionamos el elemento y le damos el estilo, en este caso es tachar, para tachar la tarea como cumplida
      }

      clone.querySelectorAll('.fas')[0].dataset.id = tarea.id // clonar el elemento del i "boton" con  su clase fas seleccionando con queryselector, accedo a la clase. con data test podemos crear otra funcion y le damos el valor del elemento tarea con su id.
      clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
      fragment.appendChild(clone)// una vez que lo clonamos y lo modificamos el pasamos el clone como hijo del elemento padre appenchild()
    })
    listaTarea.appendChild(fragment) // aca pegamos el fragment que ya tiene la documentacion almacenada en la funcion mas arriba que es donde se va a ver la lista de tareas por hacer 
 }

const btnAccion = e => { //aca podemos delegar loes eventos del boton que queremos utilizar
 // console.log(e.target.classList.contains('fa-check-circle'))
  if (e.target.classList.contains('fa-check-circle')){// para modificar el estado del boton 
      //console.log(e.target.dataset.id)  // aca traemos la accion(evento) del boton check y el objeto cunado lo apretamos 
      tareas[e.target.dataset.id].estado= true //aca cambiamos el estado del objeto que estaba en "false" a "true"
      pintarTareas()  //llamamos a la fucncion pintar tereas para ser usada
      console.log(tareas)
  }

  if(e.target.classList.contains('fa-minus-circle')) { // realizamos un loop del boton eliminar tarea, llamando a la funcion delete.tareas y retornamos la funcion pintar tares
    delete tareas [e.target.dataset.id]
    pintarTareas()
    console.log(tareas)
  }

 if (e.target.classList.contains('fa-undo-alt')){// para modificar el estado del boton fa-undo-alt
       
      tareas[e.target.dataset.id].estado= true //aca cambiamos el valor de true por false del boton check circle
      pintarTareas()  //llamamos a la fucncion pintar tereas para ser usada
      //console.log(tareas)
  }



    


  e.stopPropagaction()  // en caso de haber otros eventos, con esta funcion detenemos otros elementos addElementlistener para que no se activen los elementos que estan fueras del contenedor 
}














