// valor temporal
var tprueba = localStorage.getItem("tprueba");
var examen = [
	{competencia: "Orientación a Resultados", preguntas: [
	    {pregunta: "Contribuye a generar una cultura orientada al logro de resultados velando por mantener la efectividad de los procesos."},
		{pregunta: "Alinea sus propios planes de trabajo con las metas del área e identifica recursos y planes de acción realistas y necesarios a corto, mediano y largo plazo. " },
		{pregunta: "Actúa con confianza en sí mismo, tomando la iniciativa y decisiones para resolver desafíos o situaciones complejas cuando surjan. " },
		{pregunta: "Analiza posibles obstáculos o barreras que pueden impedir el logro de los objetivos y propone soluciones para removerlos.  "}]},
	{competencia: "Enfoque en la Salud, Seguridad y Medio Ambiente", preguntas: [
	    {pregunta: "1Contribuye a generar una cultura orientada al logro de resultados velando por mantener la efectividad de los procesos."},
		{pregunta: "1Alin2ea sus propios planes de trabajo con las metas del área e identifica recursos y planes de acción realistas y necesarios a corto, mediano y largo plazo. " },
		{pregunta: "1Anali3za posibles obstáculos o barreras que pueden impedir el logro de los objetivos y propone soluciones para removerlos.  " },
		{pregunta: "1Anali4za posibles obstáculos o barreras que pueden impedir el logro de los objetivos y propone soluciones para removerlos.  "}]},
	{competencia: "Capacidad de aprendizaje y de enseñar a otros", preguntas: [
	    {pregunta: "2Contribudye a generar una cultura orientada al logro de resultados velando por mantener la efectividad de los procesos."},
		{pregunta: "2Alinea sfus propios planes de trabajo con las metas del área e identifica recursos y planes de acción realistas y necesarios a corto, mediano y largo plazo. " },
		{pregunta: "2Analiza josibles obstáculos o barreras que pueden impedir el logro de los objetivos y propone soluciones para removerlos.  " },
		{pregunta: "2Analiza posibles obsthgháculos o barreras que pueden impedir el logro de los objetivos y propone soluciones para removerlos.  "}]},
	{competencia: "Trabajo en Equipo", preguntas: [
	    {pregunta: "3Contribuye a generar una c6567ultura orientada al logro de resultados velando por mantener la efectividad de los procesos."},
		{pregunta: "3Alinea sus propios pjfhlanes de trabajo con las metas del área e identifica recursos y planes de acción realistas y necesarios a corto, mediano y largo plazo. " },
		{pregunta: "3Analiza posibles obsthfgáculos o barreras que pueden impedir el logro de los objetivos y propone soluciones para removerlos.  " },
		{pregunta: "3Analiza posibles obstácuooplos o barreras que pueden impedir el logro de los objetivos y propone soluciones para removerlos.  "}]},
	{competencia: "Comunicación Efectiva", preguntas: [
	    {pregunta: "4Contribuye a generar unlpa cultura orientada al logro de resultados velando por mantener la efectividad de los procesos."},
		{pregunta: "4Alinea sus propios plankks de trabajo con las metas del área e identifica recursos y planes de acción realistas y necesarios a corto, mediano y largo plazo. " },
		{pregunta: "4Analiza posibles obstá{{culos o barreras que pueden impedir el logro de los objetivos y propone soluciones para removerlos.  " },
		{pregunta: "4Analiza posibles obst}áculos o barreras que pueden impedir el logro de los objetivos y propone soluciones para removerlos.  "}]},
	{competencia: "Liderazgo - Capacidad de Influenciar", preguntas: [
	    {pregunta: "5Contribuye a generar una cgultura orientada al logro de resultados velando por mantener la efectividad de los procesos."},
		{pregunta: "5Alinea sus propios plahnes de trabajo con las metas del área e identifica recursos y planes de acción realistas y necesarios a corto, mediano y largo plazo. " },
		{pregunta: "5Analiza posibles obstáculos o barireras que pueden impedir el logro de los objetivos y propone soluciones para removerlos.  " },
		{pregunta: "5Analiza posibles obstáculos o barpreras que pueden impedir el logro de los objetivos y propone soluciones para removerlos.  "}]},
	{competencia: "Líderazgo -Promotor de Confianza", preguntas: [
	    {pregunta: "6Contribuye a generar una cultura´´ orientada al logro de resultados velando por mantener la efectividad de los procesos."},
		{pregunta: "6Alinea sus propios planes de- trabajo con las metas del área e identifica recursos y planes de acción realistas y necesarios a corto, mediano y largo plazo. " },
		{pregunta: "6Analiza posibles obstáculos o barrerans que pueden impedir el logro de los objetivos y propone soluciones para removerlos.  "},
		{pregunta: "6Analiza posibles obstáculos o bamrreras que pueden impedir el logro de los objetivos y propone soluciones para removerlos.  "}]}
];
// esto estara visible en mis apps
var miApp = angular.module("preguntas",[]);
// cargamos lo que tengo guardado


//localStorage.setItem(tprueba,undefined);

miApp.controller("preguntaList", function($scope, $http){
	$scope.respuestas = [
		{respuesta: "CASI NUNCA"},
		{respuesta: "EN POCAS OCASIONES"},
		{respuesta: "NORMALMENTE"},
		{respuesta: "CON FRECUENCIA"},
		{respuesta: "SIEMPRE"},
	];
	$scope.nombres = "Franklin ospino";
	$scope.pagina = localStorage.getItem("competencia" + tprueba) || 0;
	var respuestas = JSON.parse(localStorage.getItem(tprueba)) || [];
	
	$scope.contador = 0;
	//marco solo la primera vez
	for (var i in respuestas){
		console.log(examen[respuestas[i].competencia].preguntas[respuestas[i].idpregunta]);
		if(examen[respuestas[i].competencia].preguntas[respuestas[i].idpregunta] !== undefined){
			 examen[respuestas[i].competencia].preguntas[respuestas[i].idpregunta]["seleccion"] = respuestas[i].respuesta;
		}
	}
	$scope.examen = examen;
	var cont = 0;
	// obtengo la cantidad de preguntas
	var cantidad_preguntas = 0;
	for(var i in $scope.examen){
		cantidad_preguntas += $scope.examen[i].preguntas.length;
	}
	

	$scope.seleccion = function (r) {
		
		/*
			Guardo la seleccion de las respuestas
		*/
		// deselecciono los demas

		/*
		// marco la seleccion
		$scope.examen[r.target.name].preguntas[r.target.value].respuestas[i].respuesta["seleccion"] = true;*/
		// VERIFICO SI EXISTE
		for(var j in respuestas){
			var rr = respuestas[j];
			if(rr.competencia === r.target.id && rr.idpregunta ===  r.target.alt){
				rr.respuesta =  r.target.value;
				cont++;
			}
		}
		// primera vez
		if(cont == 0){
			respuestas.push({
				competencia: r.target.id, 
				idpregunta: r.target.alt , 
				respuesta: r.target.value
			});
			$scope.faltan -= 1;
		}else{
			cont = 0;
		}
			console.log(JSON.stringify(respuestas));
		$scope.GuardarRespuestas(r.target.id);
		
	};

	$scope.GuardarRespuestas = function (c) {
		localStorage.setItem("competencia" + tprueba,c);
		localStorage.setItem(tprueba,JSON.stringify(respuestas));
		$scope.error = false;
		$scope.mensaje = false;
	};

	$scope.EnviarRespuestas = function () {
		// obtengo la cantidad de preguntas
		
		$scope.faltan = cantidad_preguntas - respuestas.length;
		$scope.npreguntas = cantidad_preguntas;
		// verifico si la cantidad es igual a la de las respuestas marcadas
		if(cantidad_preguntas === respuestas.length){
			// aqui envio las respuestas
			console.log(respuestas);
			// mensajes
			$scope.error = false;
			$scope.mensaje = true;
			// reiniciamos todo
			localStorage.setItem("competencia" + tprueba, "0");
			localStorage.setItem(tprueba,JSON.stringify([]));
			// aqui lo cambio de vista
			// location.href = "#pagina1";
			// desmarco todos
			for (var i in respuestas){
				//console.log(examen[respuestas[i].competencia].preguntas[respuestas[i].idpregunta].respuestas[respuestas[i].idrespuesta]);
				if(examen[respuestas[i].competencia].preguntas[respuestas[i].idpregunta] !== undefined){
					 examen[respuestas[i].competencia].preguntas[respuestas[i].idpregunta]["seleccion"] = undefined;
				}
			}
			respuestas = [];
			$scope.examen = examen;
		}else{
			$scope.error = true;
			$scope.mensaje = false;

		}
	};
	// // init
	// $scope.sortingOrder = sortingOrder;
	// $scope.reverse = false;
	// $scope.filteredItems = [];
	// $scope.groupedItems = [];
	// $scope.itemsPerPage = 1;
	// $scope.pagedItems = [];
	// $scope.currentPage = 0;
	// $scope.items = [
	//     {pregunta: "Contribuye a generar una cultura orientada al logro de resultados velando por mantener la efectividad de los procesos.", respuestas:[
	// 	{respuesta: "CASI NUNCA"},
	// 	{respuesta: "EN POCAS OCASIONES"},
	// 	{respuesta: "NORMALMENTE"},
	// 	{respuesta: "CON FRECUENCIA"},
	// 	{respuesta: "SIEMPRE"}
	// ]},
	// 	{pregunta: "Alinea sus propios planes de trabajo con las metas del área e identifica recursos y planes de acción realistas y necesarios a corto, mediano y largo plazo. ", respuestas:[
	// 	{respuesta: "CASI NUNCA"},
	// 	{respuesta: "EN POCAS OCASIONES"},
	// 	{respuesta: "NORMALMENTE"},
	// 	{respuesta: "CON FRECUENCIA"},
	// 	{respuesta: "SIEMPRE"}
	// ] },
	// 	{pregunta: "Analiza posibles obstáculos o barreras que pueden impedir el logro de los objetivos y propone soluciones para removerlos.  ", respuestas:[
	// 	{respuesta: "CASI NUNCA"},
	// 	{respuesta: "EN POCAS OCASIONES"},
	// 	{respuesta: "NORMALMENTE"},
	// 	{respuesta: "CON FRECUENCIA"},
	// 	{respuesta: "SIEMPRE"}
	// ] },
	// 	{pregunta: "Analiza posibles obstáculos o barreras que pueden impedir el logro de los objetivos y propone soluciones para removerlos.  ", respuestas:[
	// 	{respuesta: "CASI NUNCA"},
	// 	{respuesta: "EN POCAS OCASIONES"},
	// 	{respuesta: "NORMALMENTE"},
	// 	{respuesta: "CON FRECUENCIA"},
	// 	{respuesta: "SIEMPRE"}
	// ]}];
	// // respuestas que seleccionan
	// var respuestas = [];
	// var searchMatch = function (haystack, needle) {
	//     if (!needle) {
	//         return true;
	//     }
	//     return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
	// };

	// // init the filtered items
	// $scope.search = function () {
	//     $scope.filteredItems = $filter('filter')($scope.items, function (item) {
	//         for(var attr in item) {
	//             if (searchMatch(item[attr], $scope.query))
	//                 return true;
	//         }
	//         return false;
	//     });
	//     // take care of the sorting order
	//     if ($scope.sortingOrder !== '') {
	//         $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
	//     }
	//     $scope.currentPage = 0;
	//     // now group by pages
	//     $scope.groupToPages();
	// };
	
	// // calculate page in place
	// $scope.groupToPages = function () {
	//     $scope.pagedItems = [];
	    
	//     for (var i = 0; i < $scope.filteredItems.length; i++) {
	//         if (i % $scope.itemsPerPage === 0) {
	//             $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
	//         } else {
	//             $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
	//         }
	//     }
	// };
	
	// $scope.range = function (start, end) {
	//     var ret = [];
	//     if (!end) {
	//         end = start;
	//         start = 0;
	//     }
	//     for (var i = start; i < end; i++) {
	//         ret.push(i);
	//     }
	//     return ret;
	// };
	
	// $scope.prevPage = function () {
	//     if ($scope.currentPage > 0) {
	//         $scope.currentPage--;
	//     }
	// };
	
	// $scope.nextPage = function () {
	//     if ($scope.currentPage < $scope.pagedItems.length - 1) {
	//         $scope.currentPage++;
	//     }
	// };
	
	// $scope.setPage = function () {
	//     $scope.currentPage = this.n;
	// };

	// // functions have been describe process the data for display
	// $scope.search();

	// $scope.seleccion = function (r) {
	// 	/*
	// 		Guardo la seleccion de las respuestas
	// 	*/
	// 	// deselecciono los demas
	// 	for (var i in $scope.items[r.target.name].respuestas){
	// 		$scope.items[r.target.name].respuestas[i]["seleccion"] = false;
	// 	}
	// 	// marco la seleccion
	// 	$scope.items[r.target.name].respuestas[r.target.value]["seleccion"] = true;
	// 	// capturo la seleccion
	// 	respuestas[r.target.name] = $scope.items[r.target.name].respuestas[r.target.value].respuesta;
	// 	// refresco la paginacion
	// 	var pagina = $scope.currentPage; // guardo la pagina
	// 	$scope.search();
	// 	$scope.currentPage = pagina; // pongo la misma pagina
	// };
	// $scope.EnviarRespuestas = function(){
	// 	// AQUI EL CODIGO PARA ENVIAR RESPUESTAS AL SERVIDOR
	// 	var cont = 0;
	// 	for(var i in respuestas){
	// 		cont++;
	// 	};
	// 	if ((cont == $scope.pagedItems.length)) {
	// 		alert(JSON.stringify(respuestas));
	// 		// Metodo post Angular
	// 		// $http.post('/api/respuestas', respuestas).then(function(d){
	// 		// 	console.log(d.data);
	// 		// });
	// 	}else{
	// 		$scope.error = true;
	// 	}
	// };
});