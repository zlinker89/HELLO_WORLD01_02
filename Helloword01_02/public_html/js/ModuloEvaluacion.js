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
            // GUARDAMOS EL PERIODO
            localStorage.setItem("idperiodo",idperiodo_seleccionado);
            // liderados
            
            for (var i = 1; i <= 5; i++) {
                $http.get('/ResultadoBy/' + idperiodo_seleccionado + '/' + sesion.id + '/' + sesion.empleado["liderado" + i] + '/').then(function (d) {
                    if (d.data.length > 0) {
                        cliderados++;
                    }
                    $scope.nliderados = 5 - cliderados;
                });
            }
            $scope.ClickLiderados = function () {
                list = [];
                for (var i = 1; i <= 5; i++) {
                    $http.get('/EmpleadosByCedula/' + sesion.empleado["liderado" + i]).then(function (d) {
                        list.push(d.data);
                        $scope.listado = list;
                    });
                }
            };
            // pares
            for (var i = 1; i <= 3; i++) {
                $http.get('/ResultadoBy/' + idperiodo_seleccionado + '/' + sesion.id + '/' + sesion.empleado["par" + i] + '/').then(function (d) {
                    if (d.data.length > 0) {
                        cpar++;
                        console.log(cpar + "i");
                    }
                    $scope.npares = 3 - cpar;
                });
            }
            $scope.ClickPares = function () {
                list = [];
                for (var i = 1; i <= 3; i++) {
                    $http.get('/EmpleadosByCedula/' + sesion.empleado["par" + i]).then(function (d) {
                        list.push(d.data);
                        $scope.listado = list;
                    });
                }
            };
            // jefe
            $http.get('/ResultadoBy/' + idperiodo_seleccionado + '/' + sesion.id + '/' + sesion.empleado["jefe"] + '/').then(function (d) {
                if (d.data.length > 0) {
                    jefe++;
                }
                $scope.njefe = 1 - jefe;

                
            });
            $scope.ClickJefe = function () {
                $http.get('/EmpleadosByCedula/' + sesion.empleado["jefe"]).then(function (d) {
                    localStorage.setItem("evaluando", JSON.stringify(d.data));
                    location.href = "explicacion.html";
                });
            };
            // autoevaluacion
            $http.get('/ResultadoBy/' + idperiodo_seleccionado + '/' + sesion.id + '/' + sesion.empleado["jefe"] + '/').then(function (d) {
                if (d.data.length > 0) {
                    auto++;
                }
                $scope.nauto = 1 - auto;
            });
            $scope.ClickAuto = function () {
                localStorage.setItem("evaluando", JSON.stringify(sesion));
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

