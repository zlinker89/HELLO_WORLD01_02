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
var data = [];
app.controller('resultados', function ($scope, $http) {
    $scope.tipos = sesion.tipo_usuario[0].tipo;
    $scope.usuario = sesion;

    $scope.LogOut = function () {
        // cerramos session
        cerrarSession();
    }
    $scope.CambiarPagina = function () {
        if ($scope.tipos == "Administrador") {
            location.href = "/public_html/Empleados/indexempleado.html";
        } else if ($scope.tipos == "Seguridad") {
            location.href = "/public_html/seguridad/index.html";
        } else {
            location.href = "/public_html/login-empleados/evaluacion-empleados.html";
        }
    };

    // OBTENGO LOS DATOS DEL SERVER
    $http.get('/PeriodoEmpleados/' + sesion.empleado.id).then(function (p) {
        $scope.periodos = p.data;
        $scope.periodo_seleccionado = p.data[0].nombre;
        $scope.Cambiarperiodo = function () {
            // RETIRAMOS LA GRAFICA
            d3.select("svg").remove();
            $scope.resultados = undefined; // BORRAMOS LA TABLA SI EXISTE
            // BORRAMOS DATOS
            data = [];
                var idperiodo_seleccionado;
                // obtengo id periodo
                for (var l in p.data) {
                    if (p.data[l].nombre == $scope.periodo_seleccionado) {
                        $scope.metodologia = p.data[l].metodologia
                        idperiodo_seleccionado = p.data[l].id;
                    }
                }
                console.log('/ResultadosToGraph/' + sesion.empleado.id + '/' + idperiodo_seleccionado + '/');
                $http.get('/ResultadosToGraph/' + sesion.empleado.id + '/' + idperiodo_seleccionado + '/').then(function (resultado) {
                    console.log(resultado.data);
                    if ((resultado.data.length - 1) >= 0) {
                        $scope.resultados = resultado.data;
                        /*
                        $scope.resultados = [
		        { competencia: "Orientacion a Resultados", liderados: 2.8, jefe: 1.0, pares: 2.8, autoevaluacion: 1.3 },
		        { competencia: "Enfoque en la Seguridad, \nSalud y Medio Ambiente", liderados: 2, jefe: 1, pares: 1.8, autoevaluacion: 2.4 },
		        { competencia: "Capacidad de Aprendizaje y\n de Enseñar a otros", liderados: 3, jefe: 1, pares: 3, autoevaluacion: 1.5 },
		        { competencia: "Comunicación Efectiva", liderados: 2.5, jefe: 1.8, pares: 3, autoevaluacion: 1.8 },
		        { competencia: "Trabajo en Equipo", liderados: 2, jefe: 2, pares: 2, autoevaluacion: 3 },
		        { competencia: "Liderazgo Capacidad de\n Influenciar", liderados: 1.9, jefe: 1.5, pares: 1.5, autoevaluacion: 2 },
		        { competencia: "Liderazgo Promotor de\n Confianza", liderados: 2.4, jefe: 2.3, pares: 2.3, autoevaluacion: 2.3 },
                        ];*/
                ////////////////////////////////////////////////////////////// 
                //////////////////////// Set-Up ////////////////////////////// 
                ////////////////////////////////////////////////////////////// 
                var margin = { top: 100, right: 100, bottom: 100, left: 100 },
                    width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
                    height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

                ////////////////////////////////////////////////////////////// 
                ////////////////////////// Data ////////////////////////////// 
                //////////////////////////////////////////////////////////////
                var resultadosArray = $.map($scope.resultados, function (value, index) {
                    return [value];
                });
                for (var i = 0; i <= resultadosArray.length - 2; i++) {
                    data.push([]);
                    var cont = 1;
                    for (var j = 0; j <= $scope.resultados.length - 1; j++) {
                        resultadosArray = $.map($scope.resultados[j], function (value, index) {
                            return [value];
                        });

                        if (resultadosArray[cont + i] !== undefined) {
                            if (cont <= $scope.resultados.length - 1) {
                                data[i].push({ axis: $scope.resultados[j].competencia, value: resultadosArray[cont + i] });

                            } else {
                                data[i].push({ axis: $scope.resultados[j].competencia, value: resultadosArray[cont] });
                            }
                        };
                    }
                };

                ////////////////////////////////////////////////////////////// 
                //////////////////// Draw the Chart ////////////////////////// 
                ////////////////////////////////////////////////////////////// 
                var color = d3.scale.ordinal()
                    .range(["#EDC951", "#CC333F", "#00A0B0", "#ffaa99"]);

                var radarChartOptions = {
                    w: 300,
                    h: 300,
                    margin: margin,
                    maxValue: 5,
                    levels: 5,
                    roundStrokes: false,
                    color: color
                };
                //Call function to draw the Radar chart
                RadarChart(".radarChart", data, radarChartOptions);
            }
        });
            
        };

        //iniciamos la app
        $scope.Cambiarperiodo();
    });
	
	

});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function cerrarSession() {
    localStorage.removeItem("usuario");
    location.href = "../login.html";
}