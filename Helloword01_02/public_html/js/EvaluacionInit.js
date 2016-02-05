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
        {"idevaluacion":1,"evaluacion":"evaluacion 1", "estado":true},
        {"idevaluacion":2,"evaluacion":"evaluacion 2", "estado":true},
        {"idevaluacion":3,"evaluacion":"evaluacion 3", "estado":false},
        {"idevaluacion":4,"evaluacion":"evaluacion 4", "estado":true},
        {"idevaluacion":5,"evaluacion":"evaluacion 5", "estado":false},
        {"idevaluacion":6,"evaluacion":"evaluacion 6", "estado":false},
        {"idevaluacion":7,"evaluacion":"evaluacion 7", "estado":false},
        {"idevaluacion":8,"evaluacion":"evaluacion 8", "estado":true},
        {"idevaluacion":9,"evaluacion":"evaluacion 9", "estado":false},
        {"idevaluacion":10,"evaluacion":"evaluacion 10", "estado":true},
        {"idevaluacion":11,"evaluacion":"evaluacion 11", "estado":false},
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
