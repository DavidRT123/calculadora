define(['events'], function(events){
	var events = events.getInstance();
	//View
	var calculatorView = (function (cV) {
		function _2digits(value){ 
			return (value < 10) ? "0" + value : value;
		};

		//RITMOS
		function calculatePaceKm(time){
			var node = document.getElementById('ritmoIn');
			node.value = time.horas+":"+_2digits(time.minutos)+":"+_2digits(time.segundos);
		}

		function calculatePaceMilles(time){
			var node = document.getElementById('ritmoIm');
			node.value = time.horas+":"+_2digits(time.minutos)+":"+_2digits(time.segundos);
		}

		//MARCAS
		function calculateMarkPerKm(mark){
			var node = document.getElementById('marcaIn');
			node.value = mark.horas+":"+_2digits(mark.minutos)+":"+_2digits(mark.segundos);
		}

		function calculateMarkPerMiles(mark){
			var node = document.getElementById('marcaIm');
			node.value = mark.horas+":"+_2digits(mark.minutos)+":"+_2digits(mark.segundos);
		}

		//TABLAS
		function calculateTableTimeFromPacePerKm(tiempos){
			cadena = "<table border='1px'><tr><td>Corte en kilómetros</td><td>Tiempo</td></tr>";
			for(i = 0, longi = tiempos.length; i < longi; i++){
				cadena = cadena + "<tr><td>" + tiempos[i].distance + "</td><td>" + (tiempos[i].mark.horas + ":" + tiempos[i].mark.minutos + ":"+ tiempos[i].mark.segundos) + "</td></tr>";
			}
			cadena = cadena + "</table>";
			document.getElementById('divTablaIn').innerHTML = cadena; 
		}

		function calculateTableTimeFromPacePerMiles(tiempos){
			cadena = "<table border='1px'><tr><td>Corte en millas</td><td>Tiempo</td></tr>";
			for(i = 0, longi = tiempos.length; i < longi; i++){
				cadena = cadena + "<tr><td>" + tiempos[i].distance + "</td><td>" + (tiempos[i].mark.horas + ":" + tiempos[i].mark.minutos + ":"+ tiempos[i].mark.segundos) + "</td></tr>";
			}
			cadena = cadena + "</table>";
			document.getElementById('divTablaIm').innerHTML = cadena; 
		}



		return {
			init: function () {
				events.subscribe('pace-km', calculatePaceKm);
				events.subscribe('pace-ml', calculatePaceMilles);
				events.subscribe('mark-km', calculateMarkPerKm);
				events.subscribe('mark-ml', calculateMarkPerMiles);
				events.subscribe('table-km', calculateTableTimeFromPacePerKm);
				events.subscribe('table-ml', calculateTableTimeFromPacePerMiles);
			}
		}
	}());

	calculatorView.init();
	return calculatorView;
});

