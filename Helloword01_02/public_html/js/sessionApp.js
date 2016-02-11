var app = angular.module('miApp', []);
// verifico si existe una sesion
var sesion = JSON.parse(localStorage.getItem("usuario")) || null;
if (sesion === null) {
    location.href = "../login.html";
} else if (sesion.tipo_usuario !== "Empleado") {
    cerrarSession();
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