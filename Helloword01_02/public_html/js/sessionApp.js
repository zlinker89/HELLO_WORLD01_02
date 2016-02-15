    var app = angular.module('miApp', []);
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
    app.controller("pagina", function ($scope, $http) {
        $scope.tipos = "Empleado";
        $scope.usuario = sesion;

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
    