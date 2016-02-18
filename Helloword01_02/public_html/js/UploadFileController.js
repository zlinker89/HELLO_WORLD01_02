var app = angular.module("miApp", []);
// verifico si existe una sesion
var sesion = JSON.parse(localStorage.getItem("usuario")) || null;
if (sesion == null) {
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


app.factory("XLSXReaderService", ['$q', '$rootScope',
    function($q, $rootScope) {
        var service = function(data) {
            angular.extend(this, data);
        }

        service.readFile = function(file, readCells, toJSON) {
            var deferred = $q.defer();

            XLSXReader(file, readCells, toJSON, function(data) {
                $rootScope.$apply(function() {
                    deferred.resolve(data);
                });
            });

            return deferred.promise;
        }


        return service;
    }
]);

app.controller('PreviewController', function ($scope, XLSXReaderService, $http) {
    
    $scope.mensaje = false;
    $scope.error = false;
    $scope.showPreview = false;
    $scope.showJSONPreview = true;
    $scope.json_string = "";

    $scope.fileChanged = function(files) {
        $scope.isProcessing = true;
        $scope.sheets = [];
        $scope.excelFile = files[0];
        XLSXReaderService.readFile($scope.excelFile, $scope.showPreview, $scope.showJSONPreview).then(function(xlsxData) {
            $scope.sheets = xlsxData.sheets;
            $scope.isProcessing = false;
            // mi ediciones
            var file_name = document.getElementById("uploadBtn").value;
            document.getElementById("uploadFile").value = file_name.substring(12,file_name.length);
            
        });
    };

    $scope.EnviarLista = function(){
        // reiniciamos siempre el modal
        $scope.mensaje = false;
        $scope.error = false;
        $(".progress").css("display","block");
        $(".progress-bar").css("width","0%");

        try{
            if($scope.sheets !== undefined){
                var obj2 = $scope.sheets[$scope.sheet];
                var obj = [];
                for (var j = 0; j < obj2.length; j++) {
                    if (obj2[j].Cedula !== "" && obj2[j].Cedula !== null && obj2[j].Cedula !== undefined) {
                        obj.push(obj2[j]);
                    }
                }
                //console.log($scope.sheets["Sheet1"]);
                /* ---------------------------------BARRA PROGRESO ---------------------------------*/
                var barra = $(".progress-bar");

                barra.width("100%");

                if(obj[0].Cedula === undefined){
                    alert("No se encuentra el campo cedula");
                }else{
                    $scope.contador = 0;
                    $scope.tamano = obj.length;
                    for (var i = 0; i < obj.length; i++) {
                        if (obj[i].Cedula !== "" && obj[i].Cedula !== null && obj[i].Cedula !== undefined) {
                            var empleado = {
                                id: null,
                                cedula: obj[i].Cedula,
                                Nombre: obj[i].Nombre,
                                tipo: obj[i].Type,
                                Departament: obj[i].Department,
                                Area: obj[i].Area,
                                SubArea: obj[i].SubArea,
                                CrewCd: obj[i]['Crew Cd'],
                                RosterPosition: obj[i]['Roster position'],
                                Unit: obj[i].Unit,
                                email: obj[i].Email
                            }
                            //console.log(JSON.stringify(empleado));
                            $http.post("/api/Empleado/", empleado).then(function (data) {
                                $scope.contador++;
                                console.log(JSON.stringify(data.data));
                                if ($scope.contador == obj.length - 1) {
                                    barra.removeClass("active");
                                    // aqui oculto la barra y muestro el mensaje
                                    $scope.mensaje = true;
                                    setTimeout(function () {
                                        $(".progress").css("display", "none");
                                        // cerramos el modal
                                    }, 200);
                                }
                            });
                        }else{
                            alert("No se encuentra la cedula en la fila" + (Number(i) + 2));
                        }
                    }
                }
                
            }else{
                $scope.error = true;
            }
        }catch(Exepcion){
            alert("Debe seleccionar una hoja valida");
        }
        

        
    };

    //$scope.updateJSONString = function() {
    //    $scope.json_string = JSON.stringify($scope.sheets[$scope.selectedSheetName], null, 2);
    //}

    //$scope.showPreviewChanged = function() {
    //    if ($scope.showPreview) {
    //        $scope.showJSONPreview = false;
    //        $scope.isProcessing = true;
    //        XLSXReaderService.readFile($scope.excelFile, $scope.showPreview, $scope.showJSONPreview).then(function(xlsxData) {
    //            $scope.sheets = xlsxData.sheets;
    //            $scope.isProcessing = false;
    //        });
    //    }
    //}
});


app.controller("pagina", function ($scope) {
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
            location.href = "/public_html/login-empleados/Moduloempleados.html";
        }
    };
    // fin session

});
function cerrarSession() {
    localStorage.removeItem("usuario");
    location.href = "../login.html";
}
