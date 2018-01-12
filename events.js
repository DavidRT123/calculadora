define([], function(){
	var events = (function () {
		var instance;
	 	function init() {
	 		var topics = {};
			var hOP = topics.hasOwnProperty;

			return{
				//Aquí esta añadiendo eventos a un determinado registro del array
				subscribe: function(topic, listener){
					if(!hOP.call(topics, topic)){
						topics[topic] = [];
					}
					
					var index = topics[topic].push(listener) -1;

					return {
						//Se elimina del array el evento que se ha añadido (solo si se conserva la referencia)
						remove: function(){
							delete topics[topic][index];
						}
					}
				},
				publish: function(topic, info){
					if(!hOP.call(topics, topic)){
						return;
					}
					//Aquí esta ejecutando todos los eventos que hay en el array de topics[topic].[info]
					topics[topic].forEach(function(item){
						item(info != undefined ? info : {});
					});
				}
			}
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
	return events;	
});
