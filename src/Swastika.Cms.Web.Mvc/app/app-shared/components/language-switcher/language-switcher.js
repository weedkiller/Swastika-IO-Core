﻿(function (angular) {
    app.component('languageSwitcher', {
        templateUrl: '/app-shared/components/language-switcher/language-switcher.html',
        controller: ['$rootScope', '$location', 'CommonServices', 'TranslatorService', function ($rootScope, $location, commonServices, translatorService) {
            var ctrl = this;
            ctrl.changeLang = async function (lang, langIcon) {
                var oldLang = ctrl.settings.lang;
                ctrl.settings.lang = lang;
                ctrl.settings.langIcon = langIcon;
                await commonServices.removeSettings();
                await commonServices.removeTranslator();
                commonServices.fillSettings(lang).then(function () {
                    translatorService.reset(lang).then(function () {
                        var url = $location.$$absUrl;
                        window.top.location = url.replace(oldLang, lang);
                    });
                });
            };
            ctrl.logOut = function () {
                $rootScope.logOut();
            };
        }],
        bindings: {
            settings: '=',
            ulStyle: '=',
            liStyle: '=',
            aStyle: '=',
            activeClass: '='
        }
    });
})(window.angular);