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
var miApp = angular.module("miApp",[]);
// cargamos lo que tengo guardado
// verifico si existe una sesion
    var sesion = JSON.parse(localStorage.getItem("usuario")) || null;
    console.log(sesion.tipo_usuario[0].tipo);
    if (sesion === null) {
        location.href = "../login.html";
    } else if (sesion.tipo_usuario.length < 2) {
        if (sesion.tipo_usuario[0].tipo !== 'Empleado') {
            cerrarSession();
        } else if (sesion.tipo_usuario.length > 2) {
            if (sesion.tipo_usuario[0].tipo !== 'Administrador' || sesion.tipo_usuario[0].tipo !== 'Seguridad') {
                cerrarSession();
            }
        }
    }
    var url = '/api/logout/' + sesion.id;
        

//localStorage.setItem(tprueba,undefined);

    miApp.controller("preguntaList", function ($scope, $http) {
        $scope.tipos = sesion.tipo_usuario[0].tipo;
        $scope.usuario = sesion;

        $scope.LogOut = function () {
            // cerramos session
            cerrarSession();
        }
        $scope.CambiarPagina = function () {
            if ($scope.tipos == "Administrador") {
                location.href = "/public_html/Empleados/indexempleado.html";
            } else if ($scope.tipos == "Seguridad") {
                location.href = "/public_html/seguridad/index.html";
            } else {
                location.href = "/public_html/login-empleados/Moduloempleados.html";
            }
        };
        var idperiodo = localStorage.getItem("idperiodo");
        $http.get('/Examen/'+idperiodo+'/').then(function (d) {
            $scope.respuestas = [
		        { respuesta: "CASI NUNCA" },
		        { respuesta: "EN POCAS OCASIONES" },
		        { respuesta: "NORMALMENTE" },
		        { respuesta: "CON FRECUENCIA" },
		        { respuesta: "SIEMPRE" },
            ];
            // obtengo el EVALUADO
            $scope.evaluado = JSON.parse(localStorage.getItem("evaluando"));

            $scope.pagina = localStorage.getItem("competencia" + sesion.empleado.cedula + tprueba + $scope.evaluado.cedula) || 0;
            var respuestas = JSON.parse(localStorage.getItem(tprueba + sesion.empleado.cedula + $scope.evaluado.cedula)) || [];

            $scope.contador = 0;
            //marco solo la primera vez
            console.log(respuestas);
            for (var i in respuestas) {
                console.log(d.data[respuestas[i].competencia].preguntas[respuestas[i].idpregunta]);
                if (d.data[respuestas[i].competencia].preguntas[respuestas[i].idpregunta] !== undefined) {
                    d.data[respuestas[i].competencia].preguntas[respuestas[i].idpregunta]["seleccion"] = respuestas[i].respuesta;
                }
            }
            $scope.examen = d.data;
            var cont = 0;
            // obtengo la cantidad de preguntas
            var cantidad_preguntas = 0;
            for (var i in $scope.examen) {
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
                for (var j in respuestas) {
                    var rr = respuestas[j];
                    if (rr.competencia === r.target.id && rr.idpregunta === r.target.alt) {
                        rr.respuesta = r.target.value;
                        cont++;
                    }
                }
                // primera vez
                if (cont == 0) {
                    respuestas.push({
                        competencia: r.target.id,
                        idpregunta: r.target.alt,
                        respuesta: r.target.value
                    });
                    $scope.faltan -= 1;
                } else {
                    cont = 0;
                }
                console.log(JSON.stringify(respuestas));
                $scope.GuardarRespuestas(r.target.id);

            };

            $scope.GuardarRespuestas = function (c) {
                localStorage.setItem("competencia" + sesion.empleado.cedula + tprueba + $scope.evaluado.cedula, c);
                localStorage.setItem(tprueba + sesion.empleado.cedula + $scope.evaluado.cedula, JSON.stringify(respuestas));
                $scope.error = false;
                $scope.mensaje = false;
            };

            $scope.EnviarRespuestas = function () {
                // obtengo la cantidad de preguntas

                $scope.faltan = cantidad_preguntas - respuestas.length;
                $scope.npreguntas = cantidad_preguntas;
                // verifico si la cantidad es igual a la de las respuestas marcadas
                if (cantidad_preguntas === respuestas.length) {
                    // aqui envio las respuestas
                    console.log(respuestas);
                    // mensajes
                    $scope.error = false;
                    $scope.mensaje = true;
                    // reiniciamos todo
                    localStorage.setItem("competencia" + sesion.empleado.cedula + tprueba, "0");
                    localStorage.setItem(tprueba + sesion.empleado.cedula + $scope.evaluado.cedula, JSON.stringify([]));
                    // aqui lo cambio de vista
                    // location.href = "#pagina1";
                    // desmarco todos
                    for (var i in respuestas) {
                        //console.log(examen[respuestas[i].competencia].preguntas[respuestas[i].idpregunta].respuestas[respuestas[i].idrespuesta]);
                        if (examen[respuestas[i].competencia].preguntas[respuestas[i].idpregunta] !== undefined) {
                            examen[respuestas[i].competencia].preguntas[respuestas[i].idpregunta]["seleccion"] = undefined;
                        }
                    }
                    respuestas = [];
                    $scope.examen = examen;
                } else {
                    $scope.error = true;
                    $scope.mensaje = false;

                }
            };
        });
	

    });
    function cerrarSession() {
        localStorage.removeItem("usuario");
        location.href = "../login.html";
    }