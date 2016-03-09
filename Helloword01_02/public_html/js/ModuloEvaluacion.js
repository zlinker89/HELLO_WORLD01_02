var app = angular.module('miApp', []);
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
    $http.get('/PeriodoEmpleados/' + sesion.id).then(function (p) {
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
            // obtengo listas de empleados
            for (var l in p.data) {
                if (p.data[l].nombre == $scope.periodo_seleccionado) {
                    $scope.metodologia = p.data[l].metodologia
                    idperiodo_seleccionado = p.data[l].id;
                }
            }
            console.log(idperiodo_seleccionado);
            // GUARDAMOS EL PERIODO
            localStorage.setItem("idperiodo",idperiodo_seleccionado);
            // liderados
            var CANTIDAD_LIDERADOS = 5;
            for (var i = 1; i <= 5; i++) {
                if (sesion.empleado["liderado" + i] !== null) {
                    $http.get('/ResultadoBy/' + idperiodo_seleccionado + '/' + sesion.empleado.id + '/' + sesion.empleado["liderado" + i] + '/liderados/').then(function (d) {
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
                SetPrueba('liderados');
                // traigo la lista de empleados por evaluar
                list = [];
                for (var i = 1; i <= 5; i++) {
                    if (sesion.empleado["liderado" + i] !== null) {
                        console.log('/EmpleadosByCedula/' + sesion.empleado["liderado" + i] + '/' + idperiodo_seleccionado + '/' + sesion.empleado.id + '/liderados/');
                        $http.get('/EmpleadosByCedula/' + sesion.empleado["liderado" + i] + '/' + idperiodo_seleccionado + '/' + sesion.empleado.id + '/liderados/').then(function (d) {
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
            var CANTIDAD_PARES = 3;
            for (var i = 1; i <= 3; i++) {
                if (sesion.empleado["par" + i] !== null) {
                    $http.get('/ResultadoBy/' + idperiodo_seleccionado + '/' + sesion.empleado.id + '/' + sesion.empleado["par" + i] + '/par/').then(function (d) {
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
                for (var i = 1; i <= 3; i++) {
                    if (sesion.empleado["par" + i] !== null) {
                        $http.get('/EmpleadosByCedula/' + sesion.empleado["par" + i] + '/' + idperiodo_seleccionado + '/' + sesion.empleado.id + '/par/').then(function (d) {
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
            if (sesion.empleado["jefe"] !== null) {
                $http.get('/ResultadoBy/' + idperiodo_seleccionado + '/' + sesion.empleado.id + '/' + sesion.empleado["jefe"] + '/jefe/').then(function (d) {
                    if (d.data.length > 0) {
                        jefe++;
                    }
                    $scope.njefe = CANTIDAD_JEFE - jefe;
                });
            } else {
                $scope.njefe = 0;
            }
            
            $scope.ClickJefe = function () {
                SetPrueba('jefe');
                $http.get('/EmpleadosByCedula/' + sesion.empleado["jefe"] + '/' + idperiodo_seleccionado + '/' + sesion.empleado.id + '/jefe/').then(function (d) {
                    localStorage.setItem("evaluando", JSON.stringify(d.data));
                    location.href = "explicacion.html";
                });
            };
            // autoevaluacion
            $http.get('/ResultadoBy/' + idperiodo_seleccionado + '/' + sesion.empleado.id + '/' + sesion.empleado.cedula + '/autoevaluacion/').then(function (d) {
                if (d.data.length > 0) {
                    auto++;
                }
                $scope.nauto = 1 - auto;
            });
            $scope.ClickAuto = function () {
                SetPrueba('autoevaluacion');
                localStorage.setItem("evaluando", JSON.stringify(sesion.empleado));
                location.href = "explicacion.html";
            };
            // mostramos
            

            /* Funcciones */
            $scope.EvaluarA = function (i) {
                localStorage.setItem("evaluando", JSON.stringify(list[i]));
                location.href = "explicacion.html";
            }
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

