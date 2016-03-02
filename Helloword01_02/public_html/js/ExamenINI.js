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
        $scope.tipos = sesion.tipo_usuario[0].tipo;
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
                location.href = "/public_html/login-empleados/Moduloempleados.html";
            }
        };
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
                //envio de preguntas ala base de datos
                $("#capturar").click(function () {
                    //instancio variable para capturar datos

                    var respuesta = (JSON.stringify(respuestas))

                    $.ajax({
                        type: "POST",
                        url: "http://localhost:1442/api/R_Evaluacion",
                        data: JSON.stringify(respuesta),
                        dataType: "json",
                        processData: true,
                        success: function (data, status, xhr) {
                            alert(data.competencia + " - " + xhr.competencia);
                        },
                        error: function (xhr) {
                            alert(xhr.responseText);
                        }
                    });
                });

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
        
        function cerrarSession() {
            localStorage.removeItem("usuario");
            location.href = "../login.html";
        }
    })