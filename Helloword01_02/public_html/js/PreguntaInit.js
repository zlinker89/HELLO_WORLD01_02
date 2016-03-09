var app = angular.module("miApp", []);

// Obtengo los id de la evaluacion y competencia
var vars = getVarsUrl();
console.log(vars);
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

app.controller("evaluaciones", function ($scope, $filter, $http) {
    $scope.idevaluacion = vars.evaluacion;
    // session
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
            location.href = "/public_html/login-empleados/evaluacion-empleados.html";
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
        $http.get('/api/preguntacompetencia/' + vars.competencia).then(function (d) {
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

            $scope.cambiarPregunta = function (i) {
                $scope.nombre_pregunta_update = $scope.items[i].nombre;
                $scope.id = $scope.items[i].id;
                $scope.idcompetencia = $scope.items[i].idcompetencia
            }
        });
    };

    // create
    $scope.RegistrarPregunta = function () {
        var pregunta = {
            id: null,
            nombre: $scope.pregunta,
            idcompetencia: Number(vars.competencia)
        };
        $http.post('/api/Preguntas/', pregunta).then(function (d) {
            console.log(d.data);
            $scope.pregunta = '';
            // refrescamos
            $scope.iniciar();
        });
    };

    // update
    $scope.UpdatePregunta = function () {
        var pregunta = {
            id: $scope.id,
            nombre: $scope.nombre_pregunta_update,
            idcompetencia: $scope.idcompetencia,
        };
        console.log(pregunta);
        $http.put('/api/Preguntas/' + pregunta.id, pregunta).then(function () {
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