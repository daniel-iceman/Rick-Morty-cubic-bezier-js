// ***** CONSTANTES

const URL = "https://rickandmortyapi.com/api/character/" // Es la dirección de la api (dende esta todo el codigo jason).

// ***** VARIABLES
// Aquí creamos variables que serán usadas dentro de Javascript

let height = 0


// ***** SELECTORES

let ignition = document.querySelector('#ignition') //Se pone con gato porque es un id.
let container = document.querySelector('.container') // Se pone con punto porque es una clase.


// ***** FUNCIONES
function getData () {   //Esta será la función que traiga los datos de la pagina de Ricky&Morty
    fetch(URL)// A fetch le vamos a pasar la constante URL.  Con esto "fetch" ya sabe a quien pedirle la data.
    .then(result=> {   // Las "promesas" son algo que sucede despues de una tarea muy larga.  El programa le dice a la computadora y al servidor, "tardate lo que quieras, pero una vez que termines" (por eso se llama "then") "me vas a dar el resultado" por eso se coloca como parametro "result" y despues de esta una "arrow function" (=>).   Esto es lo mismo que poner ".then(function(result){})"
        return result.json()  //Esto invocará la conversión del archivo jason en objetos y codigo de javascript.  Como esto tomará mucho tiempo entonces debemos esperar tambien con un ".then"
    }) 
    .then(data=>{  //Aquí ponemos el otro .then que esperará el proceso del "result" y cuando este termine entonces recibirá a "data" y esta función entonces imprimirá "data" en la consola.
        console.log(data);
        // CICLO   -  Solo nos interesa el nombre y la imagen del array que se extrajo con el .json, por lo tanto recorreremos el array con un ciclo.
        for (let per of data.results){  // data.results se pone en plural porque es un array que tiene varios elementos.
            displayData (per.name, per.image) // Aquí vamos a pasarle a nuestra siguiente función que es "displayData" cada uno de los personajes pero especificamente con el elemento que nos interesa.  Así es que solo le daremos a la variable "per" que creamos 2 datos per.name y per.image.    Se llamará 20 veces a "displayData" y cada que lo llame hará lo que esta dentro de la función (ver abajo)
            
        }
    })
}

function displayData (name, image) {   //Esta será la función que dibuje los datos que traiga la función "getData".   "name" e "image" no llevan al "per" porque estos son "parametros" y los del bucle for son "argumentos" (los argumentos son datos reales que se estan sacando de la variable per que contiene los "data.results")
    // 1.- Crear un nodo
    let div = document.createElement('div') // Al nodo le vamos a llamar "div" porque es lo que vamos a insertar.
    
    div.className = "character"  // Aquí le estamos diciendo que el "div" que se acaba de crear deberá tener las propiedades de la clase "character" que se encuentra en css.
    
    div.innerHTML = `<img src="${image}"/> <p>${name}<p/>`  // Ahora usamos ".innerHTML" porque "dibujaremos" HTML. y ahora usaremos las comillas inclinadas (back tiks) que son nuevo lenguaje de ES6, esto nos permitirá mezclar "strings" con variables sin tener que usar el simbolo +.  El "div.innerHTML" será igual a los 2 elementos en los que "dibujaremos" que son la imagen (<img/>) y el parrafo (<p>).   Como dato importante la etiqueta img se cierra asi sola con la diagonal por buena practica.
    // A esto ${} se le llama "interpolacion" y tambien es de ES6 y permite decirle al texto que estas escribiendo "oye, esto no es texto es una VARIABLE".   Con estos datos estaría el "div" dibujado.
    
    
    // 2.- Vamos a manipular al padre
    
    // 3.- Vamos a insertar el nodo en le padre
    container.appendChild(div)  // Aquí al objeto "container" que tomamos del DOM le añadimos un nuevo elemento "hijo" (.appendChild) que es un "div".   Debemos recordar que se van a añadir 20 "div" ya que esta función a la que pertenece esta instrucción se ejecutará 20 veces debido al ciclo "for".
    
    // 4.- Agregamos un listener (que se activará cada que se presione una imagen) dentro de esta función que modifique al elemento que contiene las imagenes (la clase "container" que esta en "article" en html que es padre del "div" que acabamos de crear), en este caso queremos que lo mueva (hacia arriba) para permitir observar otro personaje.   Es importante recordar que toda la lista de personajes se encuentran ahi pero no se observan ya que el "height" de "section" (que es padre de todos) en css es de 390px y por eso solo permite visualizar uno, los demás estan debajo de el.
    // 4.1- Se crea una función "anonima" porque no tiene nombre (funciones en linea "funciones callback") en este caso usamos la sintaxis de ES6 "event=>{}" para que modifique al padre.
    // 4.2- La función anonima modificará al padre, y esto lo hacemos llamando al padre (clase padre) "container".
    div.addEventListener("click", event=>{
        //alert("Acabas de presionar la imagen")
        
        // Con VanillaJS (el nuevo javascript) podemos entrar a la clase que se encuentra en css y modificar por medio de la etiqueta "style" todo lo que querramos (color, background, text, transform etc.) entre comillas.   En este caso escribe un "transform" y un "translateY" con un valor negativo ya que recordando que 0 esta en la esquina superior izquierda y hasta arriba queremos subir la imagen para que muestre la imagen de abajo.   Usamos la técnica de los "back tiks" para interpolar variables (``).    Dentro del parentesis clo colocamos con la variable "heigth" que cramos al principio del código javascript (que vale 0) e incluimos tanto el valor negativo antes del "back tiks" como "px" al final del mismo.   
        // Creamos una condicional "if" para que cuando llegue a la última imagen no siga desplegando espacios vacios (sin imagenes), para esto debemos conocer en que "height" se ubica la ultima imagen y esto lo conseguimos colocando un "console.log(height)" que nos ira escribiendo en consola el "height" en el que se encuentra cada imagen de personaje y así identificar la posición del ultimo.    Lo que pediremos en la condicional es que cuando "height" sea mayor a 8645 (8645 es la posicion del último personaje), entonces "height" volverá a ser 0 y regresará a la posición inicial.
        // Hacemos la suma de "height" + 450 (pixeles) que serán los que se sumen cada que se presione una foto.
        height = height + 455
                
        if (height>8645){
            height = 0
        }
        
        container.style.transform = `translateY(-${height}px)`
        container.style.transition= "all 1s cubic-bezier(1,-0.94,.83,.67)"
        console.log(height)
    })
}


// ***** LISTENERS
// Aquí irán los "listeners" que responderán cuando el botón creado en html "Mostrar personajes" sea activado

ignition.addEventListener('click', getData)
getData()







