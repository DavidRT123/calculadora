define(['calculator', 'calculatorView', 'calculatorHistory', 'calculatorHistoryView'], function(calculator, calculatorView, cH, cHV){

cH = cH.calculatorHistory;

tHistorial = document.getElementById('tabHistorial');

tHistorial.addEventListener('click', function(){
	cH.GetValues();
});

//////////////////////////////////////// INTERNACIONAL ////////////////////////////////////////

	bRitmoIn = document.getElementById('calcRitIn');
	bMarcaIn = document.getElementById('calcMarIn');
	tabIn = document.getElementById('tabIn');
	bCalcDistCorteIn = document.getElementById('botonDistCortIn'); 

	//Evento resetear valores ritmo/Marca
	tabIn.addEventListener('click', function(){
		document.getElementById('ritmoIn').value = "";
		document.getElementById('horasIn').value = "";
		document.getElementById('minutosIn').value = "";
		document.getElementById('segundosIn').value = "";
		document.getElementById('distanciaIn').value = "";
		document.getElementById('marcaIn').value = "";
		document.getElementById('distCorteIn').value = "";
		document.getElementById("tablaIn").setAttribute("hidden", "hidden");
		document.getElementById('divTablaIn').innerHTML = "";	
	});

	//Evento botón ritmo internacional
	bRitmoIn.addEventListener('click', function(){
		hh = document.getElementById('horasIn').value;
		mm = document.getElementById('minutosIn').value;
		ss = document.getElementById('segundosIn').value;
		dist = document.getElementById('distanciaIn').value;
		opt = document.getElementById('optIn').value;

		if(hh == undefined || hh == "" || mm == undefined || mm == "" || ss == undefined || ss == "" || dist == undefined || dist == ""){
			alert("Rellena todos los CAMPOS (Distancia y Tiempo)");
		}else{
			tiempo = new calculator.Time(hh, mm, ss);
			switch(opt){
				case "Kilómetros":
					ritmo = calculator.MODULE.paceInKm(calculator.MODULE.timeConverter.timeToSeconds(tiempo), dist);
					ritmo = ritmo.tiempos[0];
					cH.add(cH.objectHistory('pace', 'km', ritmo, dist, 'Sin calcular'));
					// cH.GetValues();	
				break;

				case "Metros":
					ritmo = calculator.MODULE.paceInKm(calculator.MODULE.timeConverter.timeToSeconds(tiempo), calculator.MODULE.distanceConverter.metersToKm(dist));
					ritmo = ritmo.tiempos[0];
					cH.add(cH.objectHistory('pace', 'metros', ritmo, dist, 'Sin calcular'));
					// cH.GetValues();	
				break;
			}
			//Hacer la sección de tiempos visible tras calcular el ritmo
			document.getElementById("tablaIn").removeAttribute("hidden");
		}
	});

	//Evento botón marca internacional
	bMarcaIn.addEventListener('click', function(){
		dist = document.getElementById('distanciaIn').value;
		ritmo = document.getElementById('ritmoIn').value;
		opt = document.getElementById('optIn').value;
		if(dist == undefined || dist == "" || ritmo == undefined || ritmo == ""){
			alert("Rellena todos los CAMPOS REQUERIDOS para calcular la marca (DISTANCIA y RITMO)");
		}else{
			ritmo = ritmo.split(":");
			ritmo = new calculator.Time(ritmo[0], ritmo[1], ritmo[2]);
			switch(opt){
				case "Kilómetros":
					marca = calculator.MODULE.markFromPacePerKm(ritmo, calculator.MODULE.distanceConverter.kmToMeters(dist));
					cH.add(cH.objectHistory('mark', 'km', ritmo, dist, marca));
				break;

				case "Metros":
					marca = calculator.MODULE.markFromPacePerKm(ritmo, dist);
					cH.add(cH.objectHistory('mark', 'metros', ritmo, dist, marca));
				break;
			}
		}
	});

	//Evento botón calcular tabla
	bCalcDistCorteIn.addEventListener('click', function(){
		corte = document.getElementById('distCorteIn').value;
		if(corte == undefined || corte == ""){
			alert("Tienes que rellenar la DISTANCIA DE CORTE");
		}else{
			ritmo = document.getElementById('ritmoIn').value;
			ritmo = ritmo.split(":");
			ritmo = new calculator.Time(ritmo[0], ritmo[1], ritmo[2]);
			dist = document.getElementById('distanciaIn').value;
			switch(opt){
				case "Kilómetros":
					calculator.MODULE.tableTimeFromPacePerKm(ritmo, calculator.MODULE.distanceConverter.kmToMeters(dist), corte);
				break;

				case "Metros":
					calculator.MODULE.tableTimeFromPacePerKm(ritmo, dist, corte);
				break;
			}
		}
	});

//////////////////////////////////////// IMPERIAL ////////////////////////////////////////

	bRitmoIm = document.getElementById('calcRitIm');
	bMarcaIm = document.getElementById('calcMarIm');
	bCalcDistCorteIm = document.getElementById('botonDistCortIm');
	tabIm = document.getElementById('tabIm');

	//Evento resetear valores ritmo/Marca
	tabIm.addEventListener('click', function(){
		document.getElementById('ritmoIm').value = "";
		document.getElementById('horasIm').value = "";
		document.getElementById('minutosIm').value = "";
		document.getElementById('segundosIm').value = "";
		document.getElementById('distanciaIm').value = "";
		document.getElementById('marcaIm').value = "";
		document.getElementById('distCorteIm').value = "";
		document.getElementById('tablaIm').setAttribute("hidden", "hidden");
		document.getElementById('divTablaIm').innerHTML = "";
	});

	//Evento botón ritmo imperial
	bRitmoIm.addEventListener('click', function(){
		hh = document.getElementById('horasIm').value;
		mm = document.getElementById('minutosIm').value;
		ss = document.getElementById('segundosIm').value;
		dist = document.getElementById('distanciaIm').value;
		opt = document.getElementById('optIm').value;

		if(hh == undefined || hh == "" || mm == undefined || mm == "" || ss == undefined || ss == "" || dist == undefined || dist == ""){
			alert("Rellena todos los CAMPOS (Distancia y Tiempo)");
		}else{
			tiempo = new calculator.Time(hh, mm, ss);
			switch(opt){
				case "Millas":
					ritmo = calculator.MODULE.paceInMiles(calculator.MODULE.timeConverter.timeToSeconds(tiempo), dist);
					ritmo = ritmo.tiempos[1];
					cH.add(cH.objectHistory('pace', 'Millas', ritmo, dist, 'Sin calcular'));
					// cH.GetValues();
				break;

				case "Yardas":
					ritmo = calculator.MODULE.paceInMiles(calculator.MODULE.timeConverter.timeToSeconds(tiempo), calculator.MODULE.distanceConverter.imperialToMiles(calculator.MODULE.distanceConverter.yardsToImperial(dist)));
					ritmo = ritmo.tiempos[1];
					cH.add(cH.objectHistory('pace', 'Yardas', ritmo, dist, 'Sin calcular'));
					// cH.GetValues();
				break;
			}
			//Hacer la sección de tiempos visible tras calcular el ritmo
			document.getElementById("tablaIm").removeAttribute("hidden");
		}
	});

	//Evento botón marca internacional
	bMarcaIm.addEventListener('click', function(){
		dist = document.getElementById('distanciaIm').value;
		ritmo = document.getElementById('ritmoIm').value;
		opt = document.getElementById('optIm').value;
		if(dist == undefined || dist == "" || ritmo == undefined || ritmo == ""){
			alert("Rellena todos los CAMPOS REQUERIDOS para calcular la marca (DISTANCIA y RITMO)");
		}else{
			ritmo = ritmo.split(":");
			ritmo = new calculator.Time(ritmo[0], ritmo[1], ritmo[2]);
			switch(opt){
				case "Millas":
					marca = calculator.MODULE.markFromPacePerMile(ritmo, calculator.MODULE.distanceConverter.milesToImperial(dist));
					cH.add(cH.objectHistory('mark', 'Millas', ritmo, dist, marca));
				break;

				case "Yardas":
					marca = calculator.MODULE.markFromPacePerMile(ritmo, calculator.MODULE.distanceConverter.yardsToImperial(dist));
					cH.add(cH.objectHistory('mark', 'Yardas', ritmo, dist, marca));
				break;
			}
		}
	});

	//Evento botón calcular tabla
	bCalcDistCorteIm.addEventListener('click', function(){
		corte = document.getElementById('distCorteIm').value;
		if(corte == undefined || corte == ""){
			alert("Tienes que rellenar la DISTANCIA DE CORTE");
		}else{
			ritmo = document.getElementById('ritmoIm').value;
			ritmo = ritmo.split(":");
			ritmo = new calculator.Time(ritmo[0], ritmo[1], ritmo[2]);
			opt = document.getElementById('optIm').value;
			dist = document.getElementById('distanciaIm').value;
			switch(opt){
				case "Millas":
					calculator.MODULE.tableTimeFromPacePerMile(ritmo, dist, corte);
				break;

				case "Yardas":
					calculator.MODULE.tableTimeFromPacePerMile(ritmo, calculator.MODULE.distanceConverter.imperialToMiles(calculator.MODULE.distanceConverter.yardsToImperial(dist)), corte);
				break;
			}
		}
	});
});