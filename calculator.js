define(['events'], function(events){
	var events = events.getInstance();	
	//CLASE para crear objetos de tipo tiempo
	function Time(horas, minutos, segundos){
		this.horas = horas;
		this.minutos = minutos;
		this.segundos = segundos;
	}

	//CLASE para crera objetos de tipo imperial
	function Imperial(millas, yardas, pies){
		this.millas  = millas;
		this.yardas = yardas;
		this.pies = pies;
	}

	//MODULO calculator (el truco de esta "clase" es que no hace falta hacerle el new para que te devuelva un objeto)
	function calculator(){
		function paceInKm(timeInSeconds, distanceInKm){
			tiempo = timeInSeconds/distanceInKm;
			ritmoPerK = MODULE.timeConverter.secondsToTime(tiempo);
			millas = MODULE.distanceConverter.metersToMiles(MODULE.distanceConverter.kmToMeters(distanceInKm));
			tiempo = timeInSeconds/millas;
			ritmoPerM = MODULE.timeConverter.secondsToTime(tiempo);
			tiempos = [ritmoPerK, ritmoPerM];
			events.publish('pace-km', ritmoPerK);
			return {
				tiempos: tiempos
			};
		}

		function paceInMiles(timeInSeconds, distanceInMiles){
			tiempo = timeInSeconds/MODULE.distanceConverter.metersToKm(MODULE.distanceConverter.milesToMeters(distanceInMiles));
			ritmoPerK = MODULE.timeConverter.secondsToTime(tiempo);
			tiempo = timeInSeconds/distanceInMiles;
			ritmoPerM = MODULE.timeConverter.secondsToTime(tiempo);
			tiempos = [ritmoPerK, ritmoPerM];
			events.publish('pace-ml', ritmoPerM);
			return {
				tiempos: tiempos
			};
		}

		function markFromPacePerKm(pacePerKm, distanceInMeters){
			marca = MODULE.timeConverter.timeToSeconds(pacePerKm) * MODULE.distanceConverter.metersToKm(distanceInMeters);
			events.publish('mark-km', MODULE.timeConverter.secondsToTime(marca));
			return MODULE.timeConverter.secondsToTime(marca);
		}

		function markFromPacePerMile(pacePerMile, distanceInImperial){
			marca = MODULE.timeConverter.timeToSeconds(pacePerMile) * MODULE.distanceConverter.imperialToMiles(distanceInImperial);
			events.publish('mark-ml', MODULE.timeConverter.secondsToTime(marca));
			return MODULE.timeConverter.secondsToTime(marca);
		}

		function tableTimeFromPacePerKm(pacePerKm, distanceInMeters, cutDistanceInMeters){
			longitud = distanceInMeters / cutDistanceInMeters;
			tiempos = [];
			total = 0;
			for(i = 0; i < longitud; i++){
				total = parseInt(total) + parseInt(cutDistanceInMeters);
				tiempos[i] = {
					distance: MODULE.distanceConverter.metersToKm(total),
					mark: MODULE.timeConverter.secondsToTime((total * MODULE.timeConverter.timeToSeconds(pacePerKm))/1000)
				};
			}
			events.publish('table-km', tiempos);
			return tiempos;
		}

		function tableTimeFromPacePerMile(pacePerMile, distanceInMiles, cutDistanceInYards){
			longitud = (distanceInMiles*1760)/ cutDistanceInYards;
			tiempos = [];
			total = 0;
			for(i = 0; i < longitud; i++){
				total = parseInt(total) + parseInt(cutDistanceInYards);
				tiempos[i] = {
					distance: MODULE.distanceConverter.imperialToMiles(MODULE.distanceConverter.yardsToImperial(total)),
					mark: MODULE.timeConverter.secondsToTime((total * MODULE.timeConverter.timeToSeconds(pacePerMile))/1760)
				};
			}
			events.publish('table-ml', tiempos);
			return tiempos;
		}

		return {
			paceInKm: paceInKm,
			paceInMiles: paceInMiles,
			markFromPacePerKm: markFromPacePerKm,
			markFromPacePerMile: markFromPacePerMile,
			tableTimeFromPacePerKm: tableTimeFromPacePerKm,
			tableTimeFromPacePerMile: tableTimeFromPacePerMile
		};
	}

	//Crear módulo inicial
	var MODULE = calculator();

	//SUBMODULO timeConverter, que devuelve un objeto con dos funciones para calcular de tiempo a segundos y viceversa
	MODULE.timeConverter = (function(){
		var my = {};

		my.timeToSeconds = function(time){
			tiempo = parseInt(time.horas*3600) + parseInt(time.minutos*60) + parseInt(time.segundos);
			return tiempo;
		}

		my.secondsToTime = function(seconds){
			horas = seconds/3600;
			(horas - parseInt(horas) > 0) ? minutos = (horas - parseInt(horas))*60 : minutos = 0;
			(minutos - parseInt(minutos) > 0) ? segundos = (minutos - parseInt(minutos))*60 : segundos = 0;
			return tiempo = new Time(parseInt(horas), parseInt(minutos), parseInt(segundos));
		}
		return my;
	})();

	//SUBMODULO distanceConverter, que devuelve un objeto con varias funciones para hacer conversiones y calcular distancias
	MODULE.distanceConverter = (function(){
		var my = {};

		my.kmToMeters = function(km){
			return km*1000;
		}

		my.metersToKm = function(meters){
			
			return meters/1000;
		}

		my.milesToImperial = function(miles){
			(miles - parseInt(miles) > 0) ? yardas =  (miles - parseInt(miles))*1760 : yardas = 0;
			(yardas - parseInt(yardas) > 0) ? pies = (yardas - parseInt(yardas))*3 : pies = 0;
			return imperial = new Imperial(parseInt(miles), parseInt(yardas), parseInt(pies));
		}

		my.yardsToImperial = function(yards){
			(yards - parseInt(yards) > 0) ? pies = (yards - parseInt(yards))*3 : pies = 0;
			millas = yards/1760;
			(millas - parseInt(millas) > 0) ? yards = (millas - parseInt(millas))*1760: yards = 0; 
			return imperial = new Imperial(parseInt(millas), parseInt(yards), parseInt(pies));
		}

		my.imperialToMiles = function(imperial){
			millas = imperial.millas;
			return millas = millas + imperial.yardas/1760 + ((imperial.pies/3)/1760);
		}

		my.metersToMiles = function(meters){
			return millas = meters * 0.000621371;
		}

		my.milesToMeters = function(miles){
			return metros = miles / 0.000621371;
		}
		return my;
	})();
	return {
		Time: Time,
		Imperial: Imperial,
		MODULE: MODULE
	}
});	