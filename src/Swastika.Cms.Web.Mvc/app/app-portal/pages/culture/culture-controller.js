﻿'use strict';
app.controller('CultureController', ['$scope', '$rootScope', 'ngAppSettings', '$routeParams', '$timeout', '$location', 'AuthService', 'CultureServices',
    function ($scope, $rootScope, ngAppSettings, $routeParams, $timeout, $location, authService, cultureServices) {
        $scope.request = {
            pageSize: '10',
            pageIndex: 0,
            status: '2',
            orderBy: 'Priority',
            direction: '0',
            fromDate: null,
            toDate: null,
            keyword: ''
        };
        $scope.cultures = [

            { specificulture: 'en-us', fullName: 'United States - English (Default)', icon: 'flag-icon-us' },
            { specificulture: 'fr-dz', fullName: 'Algeria - Français', icon: 'flag-icon-dz' },
            { specificulture: 'es-ar', fullName: 'Argentina - Español', icon: 'flag-icon-ar' },
            { specificulture: 'en-au', fullName: 'Australia - English', icon: 'flag-icon-au' },
            { specificulture: 'nl-be', fullName: 'België - Nederlands', icon: 'flag-icon-be' },
            { specificulture: 'fr-be', fullName: 'Belgique - Français', icon: 'flag-icon-be' },
            { specificulture: 'es-bo', fullName: 'Bolivia - Español', icon: 'flag-icon-bo' },
            { specificulture: 'bs-ba', fullName: 'Bosna i Hercegovina – Bosanski', icon: 'flag-icon-ba' },
            { specificulture: 'pt-br', fullName: 'Brasil - Português', icon: 'flag-icon-br' },
            { specificulture: 'en-ca', fullName: 'Canada - English', icon: 'flag-icon-ca' },
            { specificulture: 'fr-ca', fullName: 'Canada - Français', icon: 'flag-icon-ca' },
            { specificulture: 'cs-cz', fullName: 'Česká Republika - Čeština', icon: 'flag-icon-cz' },
            { specificulture: 'es-cl', fullName: 'Chile - Español', icon: 'flag-icon-cl' },
            { specificulture: 'es-co', fullName: 'Colombia - Español', icon: 'flag-icon-co' },
            { specificulture: 'es-cr', fullName: 'Costa Rica - Español', icon: 'flag-icon-cr' },
            { specificulture: 'sr-latn-me', fullName: 'Crna Gora - Srpski', icon: 'flag-icon-me' },
            { specificulture: 'en-cy', fullName: 'Cyprus - English', icon: 'flag-icon-cy' },
            { specificulture: 'da-dk', fullName: 'Danmark - Dansk', icon: 'flag-icon-dk' },
            { specificulture: 'de-de', fullName: 'Deutschland - Deutsch', icon: 'flag-icon-de' },
            { specificulture: 'es-ec', fullName: 'Ecuador - Español', icon: 'flag-icon-ec' },
            { specificulture: 'et-ee', fullName: 'Eesti - Eesti', icon: 'flag-icon-ee' },
            { specificulture: 'en-eg', fullName: 'Egypt - English', icon: 'flag-icon-eg' },
            { specificulture: 'es-sv', fullName: 'El Salvador - Español', icon: 'flag-icon-sv' },
            { specificulture: 'es-es', fullName: 'España - Español', icon: 'flag-icon-es' },
            { specificulture: 'fr-fr', fullName: 'France - Français', icon: 'flag-icon-fr' },
            { specificulture: 'es-gt', fullName: 'Guatemala - Español', icon: 'flag-icon-gt' },
            { specificulture: 'en-gulf', fullName: 'Gulf - English', icon: 'flag-icon-lf' },
            { specificulture: 'es-hn', fullName: 'Honduras - Español', icon: 'flag-icon-hn' },
            { specificulture: 'en-hk', fullName: 'Hong Kong SAR - English', icon: 'flag-icon-hk' },
            { specificulture: 'hr-hr', fullName: 'Hrvatska - Hrvatski', icon: 'flag-icon-hr' },
            { specificulture: 'en-in', fullName: 'India - English', icon: 'flag-icon-in' },
            { specificulture: 'id-id', fullName: 'Indonesia - Bahasa Indonesia', icon: 'flag-icon-id' },
            { specificulture: 'en-ie', fullName: 'Ireland - English', icon: 'flag-icon-ie' },
            { specificulture: 'is-is', fullName: 'Ísland - Íslenska', icon: 'flag-icon-is' },
            { specificulture: 'it-it', fullName: 'Italia - Italiano', icon: 'flag-icon-it' },
            { specificulture: 'en-jo', fullName: 'Jordan - English', icon: 'flag-icon-jo' },
            { specificulture: 'lv-lv', fullName: 'Latvija - Latviešu', icon: 'flag-icon-lv' },
            { specificulture: 'en-lb', fullName: 'Lebanon - English', icon: 'flag-icon-lb' },
            { specificulture: 'lt-lt', fullName: 'Lietuva - Lietuvių', icon: 'flag-icon-lt' },
            { specificulture: 'hu-hu', fullName: 'Magyarország - Magyar', icon: 'flag-icon-hu' },
            { specificulture: 'en-my', fullName: 'Malaysia - English', icon: 'flag-icon-my' },
            { specificulture: 'en-mt', fullName: 'Malta - English', icon: 'flag-icon-mt' },
            { specificulture: 'es-mx', fullName: 'México - Español', icon: 'flag-icon-mx' },
            { specificulture: 'fr-ma', fullName: 'Morocco - Français', icon: 'flag-icon-ma' },
            { specificulture: 'nl-nl', fullName: 'Nederland - Nederlands', icon: 'flag-icon-nl' },
            { specificulture: 'en-nz', fullName: 'New Zealand - English', icon: 'flag-icon-nz' },
            { specificulture: 'es-ni', fullName: 'Nicaragua - Español', icon: 'flag-icon-ni' },
            { specificulture: 'en-ng', fullName: 'Nigeria - English', icon: 'flag-icon-ng' },
            { specificulture: 'nb-no', fullName: 'Norge - Bokmål', icon: 'flag-icon-no' },
            { specificulture: 'de-at', fullName: 'Österreich - Deutsch', icon: 'flag-icon-at' },
            { specificulture: 'en-pk', fullName: 'Pakistan - English', icon: 'flag-icon-pk' },
            { specificulture: 'es-pa', fullName: 'Panamá - Español', icon: 'flag-icon-pa' },
            { specificulture: 'es-py', fullName: 'Paraguay - Español', icon: 'flag-icon-py' },
            { specificulture: 'es-pe', fullName: 'Perú - Español', icon: 'flag-icon-pe' },
            { specificulture: 'en-ph', fullName: 'Philippines - English', icon: 'flag-icon-ph' },
            { specificulture: 'pl-pl', fullName: 'Polska - Polski', icon: 'flag-icon-pl' },
            { specificulture: 'pt-pt', fullName: 'Portugal - Português', icon: 'flag-icon-pt' },
            { specificulture: 'es-pr', fullName: 'Puerto Rico - Español', icon: 'flag-icon-pr' },
            { specificulture: 'es-do', fullName: 'República Dominicana - Español', icon: 'flag-icon-do' },
            { specificulture: 'ro-md', fullName: 'Republica Moldova - Română', icon: 'flag-icon-md' },
            { specificulture: 'ro-ro', fullName: 'România - Română', icon: 'flag-icon-ro' },
            { specificulture: 'en-sa', fullName: 'Saudi Arabia - English', icon: 'flag-icon-sa' },
            { specificulture: 'de-ch', fullName: 'Schweiz - Deutsch', icon: 'flag-icon-ch' },
            { specificulture: 'en-sg', fullName: 'Singapore - English', icon: 'flag-icon-sg' },
            { specificulture: 'sl-si', fullName: 'Slovenija - Slovenščina', icon: 'flag-icon-si' },
            { specificulture: 'sk-sk', fullName: 'Slovensko - Slovenčina', icon: 'flag-icon-sk' },
            { specificulture: 'en-za', fullName: 'South Africa - English', icon: 'flag-icon-za' },
            { specificulture: 'sr-latn-rs', fullName: 'Srbija - Srpski', icon: 'flag-icon-rs' },
            { specificulture: 'en-lk', fullName: 'Sri Lanka - English', icon: 'flag-icon-lk' },
            { specificulture: 'fr-ch', fullName: 'Suisse - Français', icon: 'flag-icon-ch' },
            { specificulture: 'fi-fi', fullName: 'Suomi - Suomi', icon: 'flag-icon-fi' },
            { specificulture: 'sv-se', fullName: 'Sverige - Svenska', icon: 'flag-icon-se' },
            { specificulture: 'fr-tn', fullName: 'Tunisia - Français', icon: 'flag-icon-tn' },
            { specificulture: 'tr-tr', fullName: 'Türkiye - Türkçe', icon: 'flag-icon-tr' },
            { specificulture: 'en-gb', fullName: 'United Kingdom - English', icon: 'flag-icon-gb' },
            { specificulture: 'en-us', fullName: 'United States - English', icon: 'flag-icon-us' },
            { specificulture: 'es-uy', fullName: 'Uruguay - Español', icon: 'flag-icon-uy' },
            { specificulture: 'es-ve', fullName: 'Venezuela - Español', icon: 'flag-icon-ve' },
            { specificulture: 'vi-vn', fullName: 'Việt Nam - Tiếng việt', icon: 'flag-icon-vn' },
            { specificulture: 'el-gr', fullName: 'Ελλάδα - Ελληνικά', icon: 'flag-icon-gr' },
            { specificulture: 'ru-by', fullName: 'Беларусь - Беларуская', icon: 'flag-icon-by' },
            { specificulture: 'bg-bg', fullName: 'България - Български', icon: 'flag-icon-bg' },
            { specificulture: 'ru-kz', fullName: 'Казахстан - Русский', icon: 'flag-icon-kz' },
            { specificulture: 'ru-ru', fullName: 'Россия - Русский', icon: 'flag-icon-ru' },
            { specificulture: 'uk-ua', fullName: 'Україна - Українська', icon: 'flag-icon-ua' },
            { specificulture: 'he-il', fullName: 'ישראל - עברית', icon: 'flag-icon-il' },
            { specificulture: 'ar-iq', fullName: 'العراق - العربية', icon: 'flag-icon-iq' },
            { specificulture: 'ar-sa', fullName: 'المملكة العربية السعودية - العربية', icon: 'flag-icon-sa' },
            { specificulture: 'ar-ly', fullName: 'ليبيا - العربية', icon: 'flag-icon-ly' },
            { specificulture: 'ar-eg', fullName: 'مصر - العربية', icon: 'flag-icon-eg' },
            { specificulture: 'ar-gulf', fullName: 'دول الخليج - العربية', icon: 'flag-icon-lf' },
            { specificulture: 'th-th', fullName: 'ไทย - ไทย', icon: 'flag-icon-th' },
            { specificulture: 'ko-kr', fullName: '대한민국 - 한국어', icon: 'flag-icon-kr' },
            { specificulture: 'zh-cn', fullName: '中国 - 简体中文', icon: 'flag-icon-cn' },
            { specificulture: 'zh-tw', fullName: '台灣 - 繁體中文', icon: 'flag-icon-tw' },
            { specificulture: 'ja-jp', fullName: '日本 - 日本語', icon: 'flag-icon-jp' },
            { specificulture: 'zh-hk', fullName: '香港特別行政區 - 繁體中文', icon: 'flag-icon-hk' }

        ]
        $scope.icons = [
            'flag-icon-us',
            'flag-icon-vn',
            'flag-icon-gb',
            'flag-icon-fr',
            'flag-icon-cn',
            'flag-icon-be',
        ];
        $scope.activedCulture = null;

        $scope.relatedCultures = [];

        $rootScope.isBusy = false;

        $scope.data = {
            pageIndex: 0,
            pageSize: 1,
            totalItems: 0
        };

        $scope.errors = [];

        $scope.range = function (max) {
            var input = [];
            for (var i = 1; i <= max; i += 1) input.push(i);
            return input;
        };

        $scope.getCulture = async function (id) {
            $rootScope.isBusy = true;
            var resp = await cultureServices.getCulture(id, 'be');
            if (resp && resp.isSucceed) {
                $scope.activedCulture = resp.data;
                $rootScope.initEditor();
                $rootScope.isBusy = false;
                $scope.$apply();
            }
            else {
                if (resp) { $rootScope.showErrors(resp.errors); }
                $rootScope.isBusy = false;
                $scope.$apply();
            }
        };

        $scope.syncTemplates = async function (id) {
            $rootScope.isBusy = true;
            var response = await cultureServices.syncTemplates(id);
            if (response.isSucceed) {
                $scope.activedCulture = response.data;
                $rootScope.isBusy = false;
                $scope.$apply();
            }
            else {
                $rootScope.showErrors(response.errors);
                $rootScope.isBusy = false;
                $scope.$apply();
            }
        };

        $scope.loadCulture = async function () {
            $rootScope.isBusy = true;
            var id = $routeParams.id;
            var response = await cultureServices.getCulture(id, 'be');
            if (response.isSucceed) {
                $scope.activedCulture = response.data;
                if (!id) {
                    $scope.activedCulture.icon = $scope.icons[0];
                }
                $rootScope.isBusy = false;
                $scope.$apply();
            }
            else {
                $rootScope.showErrors(response.errors);
                $rootScope.isBusy = false;
                $scope.$apply();
            }
        };
        $scope.loadCultures = async function (pageIndex) {
            if (pageIndex != undefined) {
                $scope.request.pageIndex = pageIndex;
            }
            if ($scope.request.fromDate != null) {
                var d = new Date($scope.request.fromDate);
                $scope.request.fromDate = d.toISOString();
            }
            if ($scope.request.toDate != null) {
                var d = new Date($scope.request.toDate);
                $scope.request.toDate = d.toISOString();
            }
            $rootScope.isBusy = true;
            var resp = await cultureServices.getCultures($scope.request);
            if (resp && resp.isSucceed) {
                ($scope.data = resp.data);
                //$("html, body").animate({ "scrollTop": "0px" }, 500);
                $.each($scope.data.items, function (i, culture) {
                    $.each($scope.activedCultures, function (i, e) {
                        if (e.cultureId == culture.id) {
                            culture.isHidden = true;
                        }
                    })
                })
                $rootScope.isBusy = false;
                $scope.$apply();
            }
            else {
                if (resp) { $rootScope.showErrors(resp.errors); }
                $rootScope.isBusy = false;
                $scope.$apply();
            }
        };

        $scope.saveCulture = async function (culture) {
            culture.content = $('.editor-content').val();
            $rootScope.isBusy = true;
            var resp = await cultureServices.saveCulture(culture);
            if (resp && resp.isSucceed) {
                $scope.activedCulture = resp.data;
                $rootScope.showMessage('success', 'success');
                $rootScope.isBusy = false;
                $rootScope.updateSettings();
                window.location.href = '/backend/culture/list';
                $rootScope.isBusy = false;
                $scope.$apply();
            }
            else {
                if (resp) { $rootScope.showErrors(resp.errors); }
                $rootScope.isBusy = false;
                $scope.$apply();
            }
        };

        $scope.removeCulture = function (id) {
            $rootScope.showConfirm($scope, 'removeCultureConfirmed', [id], null, 'Remove Culture', 'Are you sure');
        }

        $scope.removeCultureConfirmed = async function (id) {
            $rootScope.isBusy = true;
            var result = await cultureServices.removeCulture(id);
            if (result.isSucceed) {
                $rootScope.updateSettings();
                window.location.href = '/backend/culture/list';
            }
            else {
                $rootScope.showMessage('failed');
                $rootScope.isBusy = false;
                $scope.$apply();
            }
        }

        $scope.changeIcon = function (icon) {
            $scope.activedCulture.icon = icon;
        }
    }]);