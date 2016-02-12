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
        $scope.usuario = sesion;

        $scope.LogOut = function () {
            // cerramos session
            cerrarSession();
        }
    });

    function cerrarSession() {
        localStorage.removeItem("usuario");
        location.href = "../login.html";
    }
    