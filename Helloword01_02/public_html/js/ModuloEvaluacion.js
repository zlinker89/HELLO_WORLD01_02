﻿var app = angular.module('miApp', []);
// BORRO EL EVALUADO
localStorage.removeItem("evaluando");
// verifico si existe una sesion
var sesion = JSON.parse(localStorage.getItem("usuario")) || null;
if (sesion === null) {
    location.href = "../login.html";
} else if (sesion.tipo_usuario.length < 2) {
    if (sesion.tipo_usuario[0].tipo !== 'Empleado') {
        cerrarSession();
    }
} else {
    var cont = 0;
    for (var i in sesion.tipo_usuario) {
        if (sesion.tipo_usuario[i].tipo === 'Empleado') {
            cont++;
        }
    }
    if (cont == 0) {
        cerrarSession();
        location.href = "../login.html";
    }
}
var url = '/api/logout/' + sesion.id;
app.controller("pagina", function ($scope, $http, $q) {
    $scope.tipos = "Empleado";
    $scope.usuario = sesion;
    var deferred = $q.defer();
    // mi codigo
    $http.get('/PeriodoEmpleados/' + sesion.empleado.id).then(function (p) {
        console.log(p.data);
        $scope.periodos = p.data;
        $scope.periodo_seleccionado = p.data[0].nombre;
        
        
            $scope.Cambiarperiodo = function () {
                // verifico si hay resultados
                var cliderados = 0;
                var cpar = 0;
                var jefe = 0;
                var auto = 0;
                var list = [];
                var idperiodo_seleccionado;
                // para que borrre los datos de pantalla
                $scope.nliderados = 0;
                $scope.npares = 0;
                $scope.njefe = 0;
                // obtengo listas de empleados
                for (var l in p.data) {
                    if (p.data[l].nombre == $scope.periodo_seleccionado) {
                        $scope.metodologia = p.data[l].metodologia
                        idperiodo_seleccionado = p.data[l].id;
                    }
                }
               $http.get('/GetEmpleadosSeleccionado/' + idperiodo_seleccionado + '/' + sesion.empleado.id).then(function (empleadoActualizado) {
                   console.log(idperiodo_seleccionado);
                   
                    // GUARDAMOS EL PERIODO
                    localStorage.setItem("idperiodo", idperiodo_seleccionado);
                    // liderados
                    var CANTIDAD_LIDERADOS = 10; // ESTA CANTIDAD REPRESENTA LA PERMITIDA EN LA BASE DE DATOS
                    for (var i = 1; i <= 10; i++) {
                        if (empleadoActualizado.data["liderado" + i]) {
                            $http.get('/ResultadoBy/' + idperiodo_seleccionado + '/' + sesion.empleado.id + '/' + empleadoActualizado.data["liderado" + i] + '/jefe/').then(function (d) {
                                if (d.data.length > 0) {
                                    cliderados++;
                                }
                                $scope.nliderados = CANTIDAD_LIDERADOS - cliderados;
                            });
                        } else {
                            // disminuye si en la tabla hay menos de la cantidad limite
                            CANTIDAD_LIDERADOS--;
                        }
                    }
                    $scope.ClickLiderados = function () {
                        // he invertido para indicar que estado tiene el evaluador
                        SetPrueba('jefe');
                        // traigo la lista de empleados por evaluar
                        list = [];
                        for (var i = 1; i <= 10; i++) {
                            if (empleadoActualizado.data["liderado" + i]) {
                                $http.get('/EmpleadosByCedula/' + empleadoActualizado.data["liderado" + i] + '/' + idperiodo_seleccionado + '/' + sesion.empleado.id + '/jefe/').then(function (d) {
                                    console.log(d.data);
                                    if (d.data !== null) {
                                        list.push(d.data);
                                        $scope.listado = list;
                                    }
                                });
                            }
                        }
                    };

                    // pares
                    var CANTIDAD_PARES = 5; // ESTA CANTIDAD REPRESENTA LA PERMITIDA EN LA BASE DE DATOS
                    for (var i = 1; i <= 5; i++) {
                        if (empleadoActualizado.data["par" + i]) {
                            $http.get('/ResultadoBy/' + idperiodo_seleccionado + '/' + sesion.empleado.id + '/' + empleadoActualizado.data["par" + i] + '/par/').then(function (d) {
                                if (d.data.length > 0) {
                                    cpar++;
                                    console.log(cpar + "i");
                                }
                                $scope.npares = CANTIDAD_PARES - cpar;
                            });
                        } else {
                            CANTIDAD_PARES--;
                        }
                    }
                    $scope.ClickPares = function () {
                        SetPrueba('par');
                        list = [];
                        for (var i = 1; i <= 5; i++) {
                            if (empleadoActualizado.data["par" + i]) {
                                $http.get('/EmpleadosByCedula/' + empleadoActualizado.data["par" + i] + '/' + idperiodo_seleccionado + '/' + sesion.empleado.id + '/par/').then(function (d) {
                                    if (d.data != null) {
                                        list.push(d.data);
                                        $scope.listado = list;
                                    }
                                });
                            }
                        }
                    };
                    // jefe
                    var CANTIDAD_JEFE = 1;
                    if (sesion.empleado["jefe"]) {
                        console.log('/ResultadoBy/' + idperiodo_seleccionado + '/' + sesion.empleado.id + '/' + empleadoActualizado.data["jefe"] + '/liderados/');
                        $http.get('/ResultadoBy/' + idperiodo_seleccionado + '/' + sesion.empleado.id + '/' + empleadoActualizado.data["jefe"] + '/liderados/').then(function (d) {
                            if (d.data.length > 0) {
                                jefe++;
                            }
                            $scope.njefe = CANTIDAD_JEFE - jefe;
                        });
                    } else {
                        $scope.njefe = 0;
                    }

                    $scope.ClickJefe = function () {
                        // he invertido para indicar que estado tiene el evaluador
                        SetPrueba('liderados');
                        $http.get('/EmpleadosByCedula/' + empleadoActualizado.data["jefe"] + '/' + idperiodo_seleccionado + '/' + sesion.empleado.id + '/liderados/').then(function (d) {
                            localStorage.setItem("evaluando", JSON.stringify(d.data));
                            location.href = "explicacion.html";
                        });
                    };
                    // autoevaluacion
                    $http.get('/ResultadoBy/' + idperiodo_seleccionado + '/' + sesion.empleado.id + '/' + sesion.empleado.cedula + '/autoevaluacion/').then(function (d) {
                        console.log(d.data);
                        if (d.data.length > 0) {
                            auto++;
                        }
                        $scope.nauto = 1 - auto;
                    });
                    $scope.ClickAuto = function () {
                        SetPrueba('autoevaluacion');
                        $http.get('/EmpleadosByCedula/' + sesion.empleado.cedula + '/' + idperiodo_seleccionado + '/' + sesion.empleado.id + '/liderados/').then(function (d) {
                            localStorage.setItem("evaluando", JSON.stringify(d.data));
                            location.href = "explicacion.html";
                        });
                    };
                    // mostramos


                    /* Funcciones */
                    $scope.EvaluarA = function (i) {
                        localStorage.setItem("evaluando", JSON.stringify(list[i]));
                        location.href = "explicacion.html";
                    }
                });

            };
            $scope.Cambiarperiodo();

        

    });


    $scope.LogOut = function () {
        // cerramos session
        cerrarSession();
    };
    $scope.CambiarPagina = function () {
        if ($scope.tipos == "Administrador") {
            location.href = "/public_html/Empleados/indexempleado.html";
        } else if ($scope.tipos == "Seguridad") {
            location.href = "/public_html/seguridad/index.html";
        } else {
            location.href = "/public_html/login-empleados/Moduloempleados.html";
        }
    };


    
});

function cerrarSession() {
    localStorage.removeItem("usuario");
    location.href = "../login.html";
}

