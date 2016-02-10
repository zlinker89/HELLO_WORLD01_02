var app = angular.module("miApp", []);
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

app.controller('PreviewController', function($scope, XLSXReaderService,$http) {
    document.getElementById("mensaje").style.display = "none";
    document.getElementById("error").style.display = "none";
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
        document.getElementById("mensaje").style.display = "none";
        document.getElementById("error").style.display = "none";
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
                /* ---------------------------------BARRA PROGRESO ---------------------------------*/
                var barra = $(".progress-bar");
                barra.width("100%");
                //console.log($scope.sheets["Sheet1"]);
                

                if(obj[0].Cedula === undefined){
                    alert("No se encuentra el campo cedula");
                } else {
                    $scope.contador = 0;
                    $scope.tamano = obj.length;
                    // lista de empleados
                    var empleados = [];
                    for (var i = 0; i < obj.length;i++) {
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
                                Unit: obj[i].Unit
                            }
                            //console.log(JSON.stringify(empleado));
                            empleados.push(empleado);
                    }
                    $http.post("/api/Empleado/", empleados).then(function (data) {
                        $scope.contador++;
                        console.log(JSON.stringify(data.data));
                        if ($scope.contador == obj.length - 1) {
                            barra.removeClass("active");
                            // aqui oculto la barra y muestro el mensaje
                            setTimeout(function () {
                                $(".progress").css("display", "none");
                                document.getElementById("mensaje").style.display = "block";
                                // cerramos el modal
                                setTimeout(function () { $('#ventana1').modal('hide'); }, 1500)
                            }, 1000);
                        }
                    });
                }
                
            }else{
                document.getElementById("error").style.display = "block";

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