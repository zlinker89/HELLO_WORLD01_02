var app = angular.module("miApp", []);
// verifico si existe una sesion
var sesion = JSON.parse(localStorage.getItem("usuario")) || null;
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

app.controller("pagina", function ($scope, $filter, $http) {
    $scope.tipos = "Administrador";
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
    // init
    $scope.sortingOrder = sortingOrder;
    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    // get y filtrado
    $scope.iniciar = function () {
        $http.get('/api/Evaluacion/').then(function (d) {
            $scope.items = d.data;
            
            // respuestas que seleccionan
            var respuestas = [];
            var searchMatch = function (haystack, needle) {
                if (!needle) {
                    return true;
                }
                return haystack.toString().toLowerCase().indexOf(needle.toLowerCase()) !== -1;
            };

            // init the filtered items
            $scope.search = function () {
                $scope.filteredItems = $filter('filter')($scope.items, function (item) {
                    for (var attr in item) {
                        if (searchMatch(item[attr], $scope.query))
                            return true;
                    }
                    return false;
                });
                // take care of the sorting order
                if ($scope.sortingOrder !== '') {
                    $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
                }
                $scope.currentPage = 0;
                // now group by pages
                $scope.groupToPages();
            };

            // calculate page in place
            $scope.groupToPages = function () {
                $scope.pagedItems = [];

                for (var i = 0; i < $scope.filteredItems.length; i++) {
                    if (i % $scope.itemsPerPage === 0) {
                        $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
                    } else {
                        $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                    }
                }
            };

            $scope.range = function (start, end) {
                var ret = [];
                if (!end) {
                    end = start;
                    start = 0;
                }
                for (var i = start; i < end; i++) {
                    ret.push(i);
                }
                return ret;
            };

            $scope.prevPage = function () {
                if ($scope.currentPage > 0) {
                    $scope.currentPage--;
                }
            };

            $scope.nextPage = function () {
                if ($scope.currentPage < $scope.pagedItems.length - 1) {
                    $scope.currentPage++;
                }
            };

            $scope.setPage = function () {
                $scope.currentPage = this.n;
            };

            // functions have been describe process the data for display
            $scope.search();

            $scope.cambiarEvaluacion = function (i) {
                $scope.nombre_update = $scope.items[i].nombre;
                $scope.estado_update = $scope.items[i].estado;
                $scope.id = $scope.items[i].id;
                $scope.tipoevaluacion_update = $scope.items[i].tipo_de_evaluacion;
            }
        });
    };
    
    // create
    $scope.RegistrarEvaluacion = function () {
        var evaluacion = {
            id: null,
            nombre: $scope.nombre_evaluacion,
            tipo_de_evaluacion: "Evaluacion",
            estado: true
        };
        console.log(evaluacion);
        $http.post('/api/Evaluacion/', evaluacion).then(function (d) {
            console.log(d.data);
            // refrescamos
            $scope.iniciar();
        });
    };

    // update
    $scope.UpdateEvaluacion = function () {
        var evaluacion = {
            id: $scope.id,
            nombre: $scope.nombre_update,
            tipo_de_evaluacion: $scope.tipoevaluacion_update,
            estado: $scope.estado_update
        };
        console.log(evaluacion);
        $http.put('/api/Evaluacion/' + evaluacion.id, evaluacion).then(function () {
            // refrescamos
            $scope.iniciar();
        });
    };
    

    // iniciamos
    $scope.iniciar();
});
function cerrarSession() {
    localStorage.removeItem("usuario");
    location.href = "../login.html";
}
