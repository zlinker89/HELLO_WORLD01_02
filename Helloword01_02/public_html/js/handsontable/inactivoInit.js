﻿var hot;
// Obtengo los id de la evaluacion y competencia
var vars = getVarsUrl();
console.log(vars);
// verifico si existe una sesion
var sesion = JSON.parse(localStorage.getItem("usuario")) || null;
console.log(sesion.tipo_usuario[0].tipo);
if (sesion === null) {
    location.href = "../login.html";
} else if (sesion.tipo_usuario.length < 2) {
    if (sesion.tipo_usuario[0].tipo !== 'Administrador') {
        cerrarSession();
    }
} else {
    var cont = 0;
    for (var i in sesion.tipo_usuario) {
        if (sesion.tipo_usuario[i] === 'Administrador') {
            cont++;
        }
    }
    if (cont > 0) {
        cerrarSession();
        location.href = "../login.html";
    }
}
var url = '/api/logout/' + sesion.id;
var empleado_seleccionado;
var row;
angular.module("miApp", []).controller("tabla", function ($scope, $http) {
    $scope.tipos = "Administrador";
    $scope.usuario = sesion;

    $scope.LogOut = function () {
        // cerramos session
        cerrarSession();
    };
    $scope.CambiarPagina = function () {
        // session
        if ($scope.tipos == "Administrador") {
            location.href = "/public_html/Empleados/indexempleado.html";
        } else if ($scope.tipos == "Seguridad") {
            location.href = "/public_html/seguridad/index.html";
        } else {
            location.href = "/public_html/login-empleados/Moduloempleados.html";
        }
    };
    // fin session
    $scope.enviado = false;

    $scope.iniciar = function () {
        /*SIMULACION LOCAL*/
        $http.get('/EmpleadosInactivos/' + vars.periodo).then(function (d) {
            var empleados = d.data;
            var hotElement = document.getElementById('example');
            hot = new Handsontable(hotElement, {
                data: empleados,
                columns: [
                        {
                            data: "id",
                            type: "text",
                            readOnly: true,
                        },
                        {
                            data: "cedula",
                            type: "text",
                            readOnly: true,
                        },
                        {
                            data: "Nombre",
                            type: "text",
                            readOnly: true,
                        },
                        {
                            data: "email",
                            type: "text",
                            readOnly: true,
                        },
                        {
                            data: "tipo",
                            type: "text",
                            readOnly: true,
                        },
                        {
                            data: "Departament",
                            type: "text",
                            readOnly: true,
                        },
                        {
                            data: "Area",
                            type: "text",
                            readOnly: true,
                        },
                        {
                            data: "SubArea",
                            type: "text",
                            readOnly: true,
                        },
                        {
                            data: "CrewCd",
                            type: "text",
                            readOnly: true,
                        },
                        {
                            data: "RosterPosition",
                            type: "text",
                            readOnly: true,
                        },
                        {
                            data: "Unit",
                            type: "text",
                            readOnly: true,
                        }
                ],
                stretchH: "all",
                rowHeaders: true,
                columnSorting: true,
                afterSelectionByProp: function (r1, c1, rf, ct) {
                    row = r1;
                    $("#nombre").val(empleados[r1].Nombre);
                    $("#documento").val(empleados[r1].cedula);
                    empleado_seleccionado = empleados[r1];
                    $("#ventana2").modal("show");
                },
                colHeaders: [
                    "ID",
                    "Cedula",
                    "Nombre",
                    "Email",
                    "Type",
                    "Department",
                    "Area",
                    "SubArea",
                    "Crew Cd",
                    "Roster position",
                    "Unit"
                ],
            });
            // funciones
            //console.log(hot.getDataAtRow(1));
            $scope.AddEmpleado = function () {
                    // AQUI EL CODIGO PARA ENVIAR el empleado AL SERVIDOR a seleccionados
                    // en este punto se manda el id al server para remover el empleado
                    var seleccionado = {
                        id: null,
                        id_empleados: empleado_seleccionado.id,
                        id_periodos: Number(vars.periodo),
                        estado: 1
                    };
                    console.log(seleccionado);
                    $http.post('/AddEmpleados/', seleccionado).then(function (d) {
                        hot.destroy();
                        $scope.iniciar();
                    });
                }
        });
    };

    $scope.iniciar();
    



});
function cerrarSession() {
    localStorage.removeItem("usuario");
    location.href = "../login.html";
}
/*
    * Funcion que recoje los valores pasados por get de una url.
*/
function getVarsUrl() {
    var url = location.search.replace("?", "");
    var arrUrl = url.split("&");
    var urlObj = {};
    for (var i = 0; i < arrUrl.length; i++) {
        var x = arrUrl[i].split("=");
        urlObj[x[0]] = x[1]
    }
    return urlObj;
}