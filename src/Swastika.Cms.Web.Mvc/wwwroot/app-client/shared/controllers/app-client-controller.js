(function (angular) {
    'use strict';
    app.controller('AppClientController', [ '$rootScope', '$scope', 'ngAppSettings', 'CommonServices', 'AuthService'
        , 'TranslatorService', 'ModuleDataServices',
        function ($rootScope, $scope, ngAppSettings, commonServices, authService, translatorService, moduleDataServices) {
            $scope.lang = '';
            $scope.isInit = false;
            $scope.init = async function (lang) {
                if (!$rootScope.isBusy) {
                    $rootScope.isBusy = true;
                    commonServices.fillSettings(lang).then(function (response) {
                        $scope.isInit = true;
                        $rootScope.settings = response;
                        if ($rootScope.settings) {
                            $scope.settings = $rootScope.settings;
                            $rootScope.translator.fillTranslator(lang).then(function () {
                                authService.fillAuthData().then(function (response) {
                                    $rootScope.authentication = authService.authentication;
                                });
                                $rootScope.isBusy = false;
                                $scope.$apply();
                            });

                        } else {
                            $rootScope.isBusy = false;
                        }
                    });
                }
            };

            $scope.translate = $rootScope.translate;

            $scope.initModuleForm = async function (name) {
                var resp = null;
                $scope.name = name;
                if ($scope.id) {
                    resp = await moduleDataServices.getModuleData($scope.id, $scope.dataId, 'be');
                }
                else {
                    resp = await moduleDataServices.initModuleForm($scope.name);
                }

                if (resp && resp.isSucceed) {
                    $scope.activedModuleData = resp.data;
                    $rootScope.isBusy = false;
                    $scope.$apply();
                }
                else {
                    if (resp) { $rootScope.showErrors(resp.errors); }
                    $rootScope.isBusy = false;
                    $scope.$apply();
                }
            };
            $scope.saveModuleData = async function () {

                var resp = await moduleDataServices.saveModuleData($scope.activedModuleData);
                if (resp && resp.isSucceed) {
                    $scope.activedModuleData = resp.data;
                    $rootScope.showMessage('Success', 'success');
                    $rootScope.isBusy = false;
                    $scope.initModuleForm($scope.name);
                    $rootScope.isBusy = false;
                    $scope.$apply();
                    //$location.path('/backend/moduleData/details/' + resp.data.id);
                }
                else {
                    if (resp) { $rootScope.showErrors(resp.errors); }
                    $rootScope.isBusy = false;
                    $scope.$apply();
                }
            };
        }]);


})(window.angular);