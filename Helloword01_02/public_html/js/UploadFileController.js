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
                var obj = $scope.sheets[$scope.sheet];
                //console.log($scope.sheets["Sheet1"]);
                /* ---------------------------------BARRA PROGRESO ---------------------------------*/
                var barra = $(".progress-bar");
                var intervalo = setInterval(function(){
                   barra.width(barra.width() + (100/obj.length) +"%" );
                   if(barra.width() > 100){
                   
                        barra.removeClass("active");
                        // aqui oculto la barra y muestro el mensaje
                        setTimeout(function(){
                            $(".progress").css("display","none");
                            document.getElementById("mensaje").style.display = "block";
                            // cerramos el modal
                            setTimeout(function(){$('#ventana1').modal('hide');},1500)
                        },1000);
                        
                        clearInterval(intervalo);
                   }
                   
                },obj.length/10);

                if(obj[0].Cedula === undefined){
                    alert("No se encuentra el campo cedula");
                }else{
                    for (var i in obj) {
                        if(obj[i].Cedula !== ""){
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

                                $http.post("/api/Empleado/", empleado).then(function (data) {
                                    console.log(JSON.stringify(data.data));
                                });
                        }else{
                            alert("No se encuentra la cedula en la fila" + (Number(i) + 2));
                        }
                    }
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