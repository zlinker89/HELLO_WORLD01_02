﻿var hot;
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
        $http.get('/api/Empleado/').then(function (d) {
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

            $scope.BuscarEmpleado = function () {
                $scope.enviado = false;
                if ($scope.buscar_cedula == undefined) {
                    $scope.resultado = false;
                    $scope.empleado = undefined;
                } else {
                    var cont = 0;
                    for (var i in empleados) {
                        if (empleados[i].cedula == $scope.buscar_cedula) {
                            // aqui el codigo cuando lo encuentro
                            $scope.empleado = empleados[i];
                            $scope.resultado = true;
                            cont++;
                        } else if (cont == 0) {
                            $scope.empleado = undefined;
                            $scope.resultado = false;
                        }
                    }
                }
            };

            $scope.SaveEmpleado = function () {
                // AQUI EL CODIGO PARA ENVIAR el empleado AL SERVIDOR a seleccionados
                $http.put('/api/Empleado/' + $scope.empleado.id, $scope.empleado).then(function () {
                    $scope.iniciar();
                    $scope.empleado = undefined;
                });
            };
            $scope.enviar = function () {
                if (confirm("¿Desea guardar cambios?")) {
                    var dataTable = hot.getData();
                    for (var i in dataTable) {
                        var empleado = {
                            id: dataTable[i][0],
                            Cedula: dataTable[i][1],
                            Nombre: dataTable[i][2],
                            tipo: dataTable[i][3],
                            Departament: dataTable[i][4],
                            Area: dataTable[i][5],
                            SubArea: dataTable[i][6],
                            CrewCd: dataTable[i][7],
                            RosterPosition: dataTable[i][8],
                            Unit: dataTable[i][9]
                        }
                        /*$http.post("/api/empleado/", empleado).then(function (data) {
                            console.log(JSON.stringify(data.data));
                        });*/
                        console.log(JSON.stringify(empleado));
                    }
                }
            };
        });
    };

    // iniciamos el script
    $scope.iniciar();
});
function cerrarSession() {
    localStorage.removeItem("usuario");
    location.href = "../login.html";
}