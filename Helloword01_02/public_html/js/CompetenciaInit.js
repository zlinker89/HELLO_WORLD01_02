var app = angular.module("miApp", []);

app.controller("evaluaciones", function($scope, $filter, $http){
    // init
    $scope.sortingOrder = sortingOrder;
    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.items = [
        {"idcompetencia":1,"competencia":"competencia 1", "estado":true},
        {"idcompetencia":2,"competencia":"competencia 2", "estado":true},
        {"idcompetencia":3,"competencia":"competencia 3", "estado":false},
        {"idcompetencia":4,"competencia":"competencia 4", "estado":true},
        {"idcompetencia":5,"competencia":"competencia 5", "estado":false},
        {"idcompetencia":6,"competencia":"competencia 6", "estado":false},
        {"idcompetencia":7,"competencia":"competencia 7", "estado":false},
        {"idcompetencia":8,"competencia":"competencia 8", "estado":true},
        {"idcompetencia":9,"competencia":"competencia 9", "estado":false},
        {"idcompetencia":10,"competencia":"competencia 10", "estado":true},
        {"idcompetencia":11,"competencia":"competencia 11", "estado":false},
    ];
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
            for(var attr in item) {
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
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
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

    
});
