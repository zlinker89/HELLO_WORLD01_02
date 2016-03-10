// VERIFICO SI SE PUEDE REALIZAR
NoRepetirPrueba(); // primera vez
setInterval(NoRepetirPrueba(), 3000); // por si acaso

// valor temporal
var tprueba = localStorage.getItem("tprueba");

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
        // obtengo el EVALUADO
        $scope.evaluado = JSON.parse(localStorage.getItem("evaluando"));
        // verifico si tiene liderados lider
        $scope.es_lider = 'Empleado';
        // POR AHORA CINCO
        console.log($scope.evaluado);
        for (var k = 1; k < 10; k++) {
            if ($scope.evaluado["liderado" + k] != null) {
                $scope.es_lider = "Jefe";
                console.log($scope.es_lider);
            }
        }

        $scope.tipos = sesion.tipo_usuario[0].tipo;
        // OJO usuario contiene .empleado
        $scope.usuario = sesion;
        var idperiodo = localStorage.getItem("idperiodo");

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
                location.href = "/public_html/login-empleados/evaluacion-empleados.html";
            }
        };
        $http.get('/Examen/' + idperiodo + '/' + $scope.es_lider + '/').then(function (d) {
            $scope.respuestas = [
		        { respuesta: "CASI NUNCA" },
		        { respuesta: "EN POCAS OCASIONES" },
		        { respuesta: "NORMALMENTE" },
		        { respuesta: "CON FRECUENCIA" },
		        { respuesta: "SIEMPRE" },
            ];


            $scope.pagina = localStorage.getItem("competencia" + sesion.empleado.cedula + tprueba + $scope.evaluado.cedula) || 0;
            var respuestas = JSON.parse(localStorage.getItem(tprueba + sesion.empleado.cedula + $scope.evaluado.cedula)) || [];

            $scope.contador = 0;
            //marco solo la primera vez
            console.log(respuestas);
            for (var i in respuestas) {
                console.log(d.data[respuestas[i].indexCompetencia].preguntas[respuestas[i].idpregunta] !== undefined);
                if (d.data[respuestas[i].indexCompetencia].preguntas[respuestas[i].idpregunta] !== undefined) {
                    d.data[respuestas[i].indexCompetencia].preguntas[respuestas[i].idpregunta]["seleccion"] = respuestas[i].resultado;
                }
            }
            $scope.examen = d.data;

            var cont = 0;
            // obtengo la cantidad de preguntas
            var cantidad_preguntas = 0;
            for (var i in $scope.examen) {
                cantidad_preguntas += $scope.examen[i].preguntas.length;
            }


            // obtengo la cantidad de preguntas
            $scope.faltan = cantidad_preguntas - respuestas.length;
            $scope.npreguntas = cantidad_preguntas;

            $scope.seleccion = function (r) {

                /*
                    Guardo la seleccion de las respuestas
                */
                // deselecciono los demas

                /*
                // marco la seleccion
                $scope.examen[r.target.name].preguntas[r.target.value]resultados[i].resultado["seleccion"] = true;*/
                // VERIFICO SI EXISTE
                for (var j in respuestas) {
                    var rr = respuestas[j];
                    console.log(rr.id_competencia === r.target.id && rr.idpregunta === r.target.alt);
                    if (rr.id_competencia === $scope.examen[r.target.id].competencia.id && rr.idpregunta === r.target.alt) {
                        rr.resultado = r.target.value;
                        cont++;
                    }
                }
                // primera vez
                if (cont == 0) {
                    respuestas.push({
                        id_periodo: idperiodo,
                        id_empleados_selecionados: sesion.empleado.id,
                        id_competencia: $scope.examen[r.target.id].competencia.id,
                        resultado: r.target.value,
                        id_evaluado: $scope.evaluado.id,
                        tipo_evaluacion: tprueba,
                        idpregunta: r.target.alt,
                        indexCompetencia: r.target.id
                    });
                    $scope.faltan -= 1;
                } else {
                    cont = 0;
                }
                console.log(JSON.stringify(respuestas));
                $scope.GuardarRespuestas(r.target.id);
            };

            $scope.GuardarRespuestas = function (c) {
                // guardo
                localStorage.setItem("competencia" + sesion.empleado.cedula + tprueba + $scope.evaluado.cedula, c);
                localStorage.setItem(tprueba + sesion.empleado.cedula + $scope.evaluado.cedula, JSON.stringify(respuestas));
                $scope.error = false;
                $scope.mensaje = false;
            };

            $scope.EnviarRespuestas = function () {

                // verifico si la cantidad es igual a la de las respuestas marcadas
                if (cantidad_preguntas === respuestas.length) {
                    // aqui envio las respuestas
                    //_____________________envio al servidor
                    $http.post('/Resultados/', respuestas).then(function (d) {
                        console.log(d.data);
                    });
                    // ___________________________fin envio
                    // mensajes
                    $scope.error = false;
                    $scope.mensaje = true;

                    // reiniciamos todo
                    localStorage.setItem("competencia" + sesion.empleado.cedula + tprueba + $scope.evaluado.cedula, "0");
                    localStorage.setItem(tprueba + sesion.empleado.cedula + $scope.evaluado.cedula, JSON.stringify([]));
                    history.go(1);
                    // desmarco todos
                    respuestas = [];
                    localStorage.setItem("evaluando", undefined);
                    // bandera para que no se repita
                    localStorage.setItem("EstadoPrueba", false);
                    // aqui lo cambio de vista
                    location.href = "/public_html/login-empleados/evaluacion-empleados.html";
                } else {
                    $scope.error = true;
                    $scope.mensaje = false;
                }
            };
        });

        function cerrarSession() {
            localStorage.removeItem("usuario");
            location.href = "../login.html";
        }
    });
    // evito que repita prueba
    function NoRepetirPrueba() {
        var estado_prueba = localStorage.getItem("EstadoPrueba") || false;
        if (!estado_prueba) {
            location.href = "evaluacion-empleados.html";
        }
    }
    // fin evito que repita prueba 