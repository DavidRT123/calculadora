var mySingleton = (function () {
 
 	var instance;
	
	function init() {
		//Código que se va a ejecutar colo una única instancia
	};
	
	return {
		getInstance: function () {
			if ( !instance ) {
				instance = init();
			}
			return instance;
		}
	};
	
})();