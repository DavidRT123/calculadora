define(['events'], function(events){
	var events = events.getInstance();
	var arrayOH = [];
	
	function calculatorHistory(){
		
		//Clase para crear el objeto plano 
		var objectHistory = function(t, u, p, d, m){
			objeto = {
				type: t,
				units: u,
				pace: p,
				distance: d,
				mark: m	
			}
			return objeto;
		}

		var add = function(oH){
			arrayOH.push(oH);
		}

		var Delete = function(indice){
			arrayOH.splice(indice, 1);
		}

		var GetValues = function(){
			events.publish('renderValues', arrayOH);
			return arrayOH;
		}

		return{
			objectHistory: objectHistory,
			add: add,
			delete: Delete,
			GetValues: GetValues
		}	
	}

	return{
		calculatorHistory: calculatorHistory()
	}
	
});