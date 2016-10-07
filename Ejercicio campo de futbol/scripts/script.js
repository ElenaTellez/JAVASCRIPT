function descubrir () {
	var anchoCubierta = document.getElementById("cubierta").offsetWidth; //Se guarda en una variable el ancho de la capa que cubre el campo
	var leftCubierta = document.getElementById("cubierta").offsetLeft; //Se guarda en una variable la posición izquierda de la capa que cubre el campo

	/* Se hace un intervalo que irá decrementando el ancho de la capa que cubre el campo y la desplaza a la derecha para dar la sensación de que 
	   se está descubriendo el campo */
	var intervaloDescubrir = setInterval(function() {
		anchoCubierta--;
		leftCubierta++;

		document.getElementById("cubierta").style.width = anchoCubierta + "px";
		document.getElementById("cubierta").style.left = leftCubierta + "px";

		if (anchoCubierta == 0) {
			clearInterval(intervaloDescubrir);
			document.getElementById("cubierta").parentNode.removeChild(document.getElementById("cubierta"));
			crearLineaMedioCampo();
			crearFormulario();
		}

	}, 1);
}

function crearLineaMedioCampo () {
	var anchoCampo = document.getElementById("campoDeFutbol").offsetWidth; //Se guarda en una variable el valor del ancho del campo

	var linea = document.createElement("div"); //Se crea un elemento <div> que será la línea
	linea.id = "lineaCentral"; //Se le da un id al <div>

	linea.style.width = "10px"; //Se le da un ancho a la línea de 10px
	
	linea.style.height = document.getElementById("campoDeFutbol").offsetHeight - 10 + "px"; //Se le da una altura a la línea igual a la del campo
	/* Nota línea anterior: se le resta 10 de los píxeles del borde para que quede la línea bien ajustada. */

	linea.style.backgroundColor = "white"; //Se le da el color blanco a la línea

	linea.style.position = "absolute"; 
	linea.style.top = "0px"; //Se posiciona la línea con respecto al top

	linea.style.left = ((anchoCampo / 2) - (linea.offsetWidth / 2)) - 15 + "px"; //Se posiciona la línea en el centro del campo
	/* Nota línea anterior: para que la línea se posicione justo en el centro hay que restarle la mitad del ancho de la línea y 15.
	   Como cada borde vale 10px se le resta 15 de un borde y medio */

	document.getElementById("campoDeFutbol").appendChild(linea); //Se añade la línea al campo
}

function crearFormulario () {
	var formulario = document.createElement("div"); //Se crea un <div> que será el formulario

	formulario.id = "formulario"; //Se le da un id al <div> para aplicarle el estilo

	formulario.style.top = document.getElementById("campoDeFutbol").offsetTop; //Se posiciona el formulario con respecto al top
	formulario.style.left = document.getElementById("campoDeFutbol").offsetWidth + 20 + "px"; //Se posiciona el formulario con respecto al left

	//Se rellena el formulario con los campos necesarios
	formulario.innerHTML = "<p>Jugadores del equipo 1: </p>";
	formulario.innerHTML += "<input type=\"number\" id=\"equipo1\" min=\"0\" max=\"11\">";
	formulario.innerHTML += "<p>Jugadores del equipo 2: </p>";
	formulario.innerHTML += "<input type=\"number\" id=\"equipo2\" min=\"0\" max=\"11\">";
	formulario.innerHTML += "<br><button id=\"crear\" onclick=\"crearEquipos()\">Crear Equipos</button>";

	document.getElementById("contenedor").appendChild(formulario); //Se añade la línea al contenedor

	var informacion = document.createElement("div");

	informacion.id = "informacion";

	informacion.style.top = document.getElementById("formulario").offsetTop + 260 + "px";
	informacion.style.left = document.getElementById("formulario").offsetLeft;

	informacion.innerHTML = "<p>Datos del jugador:</p>";

	document.getElementById("formulario").appendChild(informacion);
}

function crearEquipos() {
	document.getElementById("equipo1").disabled = true;
	document.getElementById("equipo2").disabled = true;
	document.getElementById("crear").disabled = true;

	var cantidadJugadoresEquipo1 = document.getElementById("equipo1").value;
	var cantidadJugadoresEquipo2 = document.getElementById("equipo2").value;

	var leftMinimo = 20;
	var leftMaximo = document.getElementById("lineaCentral").offsetLeft - 90;
	var heightMinimo = 20;
	var heightMaximo = document.getElementById("campoDeFutbol").offsetHeight - 90;

	for(var i = 0; i < cantidadJugadoresEquipo1; i++) {
		var jugador = document.createElement("div");
		jugador.className = "equipo1";
		jugador.id = (i + 1); 
		var leftJugador = Math.floor(Math.random() * leftMaximo) + leftMinimo;
		var topJugador = Math.floor(Math.random() * heightMaximo) + heightMinimo;

		jugador.style.left = leftJugador + "px";
		jugador.style.top = topJugador + "px";

		jugador.innerHTML = (i + 1);
		jugador.value = 0;

		jugador.setAttribute("onclick", "mostrarInformacion(this)");

		document.getElementById("campoDeFutbol").appendChild(jugador);
	}

	var leftMinimo = document.getElementById("lineaCentral").offsetLeft + document.getElementById("lineaCentral").offsetWidth + 5;
	var leftMaximo = ((document.getElementById("campoDeFutbol").offsetWidth - 20) - leftMinimo) - jugador.offsetWidth;
	var heightMinimo = 20;
	var heightMaximo = document.getElementById("campoDeFutbol").offsetHeight - 90;

	for(var i = 0; i < cantidadJugadoresEquipo2; i++) {
		var jugador = document.createElement("div");
		jugador.className = "equipo2";
		jugador.id = (i + 1);
		var leftJugador = Math.floor(Math.random() * leftMaximo) + (document.getElementById("campoDeFutbol").offsetWidth - leftMinimo);
		var topJugador = Math.floor(Math.random() * heightMaximo) + heightMinimo;

		jugador.style.left = leftJugador + "px";
		jugador.style.top = topJugador + "px";

		jugador.innerHTML = (i + 1);
		jugador.value = 0;

		jugador.setAttribute("onclick", "mostrarInformacion(this)");

		document.getElementById("campoDeFutbol").appendChild(jugador);
	}
}

function mostrarInformacion(jugador) {
	jugador.value++;
	document.getElementById("informacion").innerHTML = "<p>Datos del jugador:</p>";
	document.getElementById("informacion").innerHTML += "<spam style=\"padding-left: 30px;\">Jugador Número: " + jugador.id + "</spam>";
	document.getElementById("informacion").innerHTML += "<br><spam style=\"padding-left: 30px;\">Valor: " + jugador.value + "</spam>";
}