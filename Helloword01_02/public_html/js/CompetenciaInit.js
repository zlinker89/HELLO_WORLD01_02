var app = angular.module("miApp", []);

// Obtengo el id de la evaluacion
var idevalaucion = getVarsUrl();
console.log(idevalaucion);

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
        $http.get('/api/competenciasevaluacion/' + idevalaucion.evaluacion).then(function (d) {
            console.log(d.data);
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

            $scope.cambiarCompetencia = function (i) {
                $scope.nombre_competencia_update = $scope.items[i].nombre;
                $scope.rango_evaluacion_update = $scope.items[i].rango_evaluacion;
                $scope.id = $scope.items[i].id;
            }
        });
    };

    // create
    $scope.RegistrarCompetencia = function () {
        var competencia = {
            id: null,
            nombre: $scope.nombre_competencia,
            rango_evaluacion: $scope.rango_evaluacion,
            idevaluacion: Number(idevalaucion.evaluacion)
        };
        console.log(competencia);
        $http.post('/api/Competencias/', competencia).then(function (d) {
            console.log(d.data);
            // refrescamos
            $scope.iniciar();
        });
    };

    // update
    $scope.UpdateCompetencia = function () {
        var competencia = {
            id: $scope.id,
            nombre: $scope.nombre_competencia_update,
            rango_evaluacion: $scope.rango_evaluacion_update,
        };
        console.log(competencia);
        $http.put('/api/Competencias/' + competencia.id, competencia).then(function () {
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