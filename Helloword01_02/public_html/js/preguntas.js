// valor temporal
var preguntalst = [
	{pregunta: "Contribuye a generar una cultura orientada al logro de resultados velando por mantener la efectividad de los procesos." },
	{pregunta: "Alinea sus propios planes de trabajo con las metas del área e identifica recursos y planes de acción realistas y necesarios a corto, mediano y largo plazo. " },
	{pregunta: "Analiza posibles obstáculos o barreras que pueden impedir el logro de los objetivos y propone soluciones para removerlos.  " },
	{pregunta: "Analiza posibles obstáculos o barreras que pueden impedir el logro de los objetivos y propone soluciones para removerlos.  " }
];
miApp.controller("preguntaList", function($scope, $filter, $http){
	// init
	$scope.sortingOrder = sortingOrder;
	$scope.reverse = false;
	$scope.filteredItems = [];
	$scope.groupedItems = [];
	$scope.itemsPerPage = 1;
	$scope.pagedItems = [];
	$scope.currentPage = 0;
	$scope.items = [
	    {pregunta: "Contribuye a generar una cultura orientada al logro de resultados velando por mantener la efectividad de los procesos.", respuestas:[
		{respuesta: "CASI NUNCA"},
		{respuesta: "EN POCAS OCASIONES"},
		{respuesta: "NORMALMENTE"},
		{respuesta: "CON FRECUENCIA"},
		{respuesta: "SIEMPRE"}
	]},
		{pregunta: "Alinea sus propios planes de trabajo con las metas del área e identifica recursos y planes de acción realistas y necesarios a corto, mediano y largo plazo. ", respuestas:[
		{respuesta: "CASI NUNCA"},
		{respuesta: "EN POCAS OCASIONES"},
		{respuesta: "NORMALMENTE"},
		{respuesta: "CON FRECUENCIA"},
		{respuesta: "SIEMPRE"}
	] },
		{pregunta: "Analiza posibles obstáculos o barreras que pueden impedir el logro de los objetivos y propone soluciones para removerlos.  ", respuestas:[
		{respuesta: "CASI NUNCA"},
		{respuesta: "EN POCAS OCASIONES"},
		{respuesta: "NORMALMENTE"},
		{respuesta: "CON FRECUENCIA"},
		{respuesta: "SIEMPRE"}
	] },
		{pregunta: "Analiza posibles obstáculos o barreras que pueden impedir el logro de los objetivos y propone soluciones para removerlos.  ", respuestas:[
		{respuesta: "CASI NUNCA"},
		{respuesta: "EN POCAS OCASIONES"},
		{respuesta: "NORMALMENTE"},
		{respuesta: "CON FRECUENCIA"},
		{respuesta: "SIEMPRE"}
	]}];
	// respuestas que seleccionan
	var respuestas = [];
	var searchMatch = function (haystack, needle) {
	    if (!needle) {
	        return true;
	    }
	    return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
	};

	// init the filtered items
	$scope.search = function () {
	    $scope.filteredItems = $filter('filter')($scope.items, function (item) {
	        for(var attr in item) {
	            if (searchMatch(item[attr], $scope.query))
	                return true;
	        }
	        return false;
	    });
	    // take care of the sorting order
	    if ($scope.sortingOrder !== '') {
	        $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
	    }
	    $scope.currentPage = 0;
	    // now group by pages
	    $scope.groupToPages();
	};
	
	// calculate page in place
	$scope.groupToPages = function () {
	    $scope.pagedItems = [];
	    
	    for (var i = 0; i < $scope.filteredItems.length; i++) {
	        if (i % $scope.itemsPerPage === 0) {
	            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
	        } else {
	            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
	        }
	    }
	};
	
	$scope.range = function (start, end) {
	    var ret = [];
	    if (!end) {
	        end = start;
	        start = 0;
	    }
	    for (var i = start; i < end; i++) {
	        ret.push(i);
	    }
	    return ret;
	};
	
	$scope.prevPage = function () {
	    if ($scope.currentPage > 0) {
	        $scope.currentPage--;
	    }
	};
	
	$scope.nextPage = function () {
	    if ($scope.currentPage < $scope.pagedItems.length - 1) {
	        $scope.currentPage++;
	    }
	};
	
	$scope.setPage = function () {
	    $scope.currentPage = this.n;
	};

	// functions have been describe process the data for display
	$scope.search();

	$scope.seleccion = function (r) {
		/*
			Guardo la seleccion de las respuestas
		*/
		// deselecciono los demas
		for (var i in $scope.items[r.target.name].respuestas){
			$scope.items[r.target.name].respuestas[i]["seleccion"] = false;
		}
		// marco la seleccion
		$scope.items[r.target.name].respuestas[r.target.value]["seleccion"] = true;
		// capturo la seleccion
		respuestas[r.target.name] = $scope.items[r.target.name].respuestas[r.target.value].respuesta;
		// refresco la paginacion
		var pagina = $scope.currentPage; // guardo la pagina
		$scope.search();
		$scope.currentPage = pagina; // pongo la misma pagina
	};
	$scope.EnviarRespuestas = function(){
		// AQUI EL CODIGO PARA ENVIAR RESPUESTAS AL SERVIDOR
		var cont = 0;
		for(var i in respuestas){
			cont++;
		};
		if ((cont == $scope.pagedItems.length)) {
			alert(JSON.stringify(respuestas));
			// Metodo post Angular
			// $http.post('/api/respuestas', respuestas).then(function(d){
			// 	console.log(d.data);
			// });
		}else{
			$scope.error = true;
		}
	};
});