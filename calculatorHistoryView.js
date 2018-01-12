define(['events'], function(events){
	var events = events.getInstance();
	//View
	var calculatorHistoryView = (function () {

	function renderValues(arr){
		cadena = "<table class='table'><thead><tr><th scope='col'>#</th><th scope='col'>Tipo</th><th scope='col'>Unidades</th><th scope='col'>Ritmo</th><th scope='col'>Distancia</th><th scope='col'>Marca</th></tr></thead><tbody>";
	
		for(i = 0, longi = arr.length; i < longi; i++){
			cadena = cadena + "<tr><th scope='row'>" + i + "</th><td>" + arr[i].type + "</td><td>" + arr[i].units + "</td><td>" + (arr[i].pace.horas + ":" + arr[i].pace.minutos + ":" + arr[i].pace.segundos) + "</td><td>" + arr[i].distance + "</td><td>";
			if(arr[i].mark == 'Sin calcular' || arr[i].mark == undefined){
				cadena = cadena + arr[i].mark + "</td></tr>";
			}else{
			 	cadena = cadena + (arr[i].mark.horas + ":" + arr[i].mark.minutos + ":" + arr[i].mark.segundos) + "</td></tr>";
			}
		}
		cadena = cadena + "</tbody></table>";
		document.getElementById('historial').innerHTML = cadena;
	}

	return {
			init: function () {
				events.subscribe('renderValues', renderValues);
			}
		}
	})();

	calculatorHistoryView.init();
	return calculatorHistoryView;

});