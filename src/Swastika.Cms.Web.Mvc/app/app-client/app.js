﻿'use strict';

var app = angular.module('SwastikaClient', ['ngRoute', 'LocalStorageModule', 'components']);
var serviceBase = '';

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
}).directive('file', function () {
    return {
        scope: {
            file: '='
        },
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                var file = files[0];
                scope.file = file;
                scope.$apply();
            });
        }
    };
}).directive('imageonload', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function () {
            });
            element.bind('error', function () {
            });
        }
    };
}).filter('utcToLocal', Filter);

app.run(['$rootScope', 'ngAppSettings', '$location', 'CommonServices', 'AuthService', 'TranslatorService',
    function ($rootScope, ngAppSettings, $location, commonServices, authService, translatorService) {
        $rootScope.isBusy = false;
        $rootScope.translator = translatorService;
        $rootScope.message = {
            title: 'test',
            content: '',
            errors: [],
            okFuncName: null,
            okArgs: [],
            cancelFuncName: null,
            cancelArgs: [],
            lblOK: 'OK',
            lblCancel: 'Cancel',
            context: $rootScope
        };

        ngAppSettings.swStatus = [
            'Deleted',
            'Preview',
            'Published',
            'Draft',
            'Schedule'
        ]
        ngAppSettings.orders = [
            {
                value: 'CreatedDateTime',
                title: 'Created Date'
            }
            ,
            {
                value: 'Priority',
                title: 'Priority'
            },

            {
                value: 'Title',
                title: 'Title'
            }
        ];
        ngAppSettings.directions = [
            {
                value: '0',
                title: 'Asc'
            },
            {
                value: '1',
                title: 'Desc'
            }
        ]
        ngAppSettings.pageSizes = [
            '5',
            '10',
            '15',
            '20'
        ]
        ngAppSettings.request = {
            pageSize: '10',
            pageIndex: 0,
            status: ngAppSettings.swStatus[1],
            orderBy: 'CreatedDateTime',
            direction: '1',
            fromDate: null,
            toDate: null,
            keyword: ''
        };
        ngAppSettings.editorConfigurations = {
            core: {},
            plugins: {
                btnsDef: {
                    // Customizables dropdowns
                    image: {
                        dropdown: ['insertImage', 'upload', 'base64', 'noembed'],
                        ico: 'insertImage'
                    }
                },
                btns: [
                    ['viewHTML'],
                    ['undo', 'redo'],
                    ['formatting'],
                    ['strong', 'em', 'del', 'underline'],
                    ['link'],
                    ['image'],
                    ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                    ['unorderedList', 'orderedList'],
                    ['foreColor', 'backColor'],
                    ['preformatted'],
                    ['horizontalRule'],
                    ['fullscreen']
                ],
                plugins: {
                    // Add imagur parameters to upload plugin
                    upload: {
                        serverPath: 'https://api.imgur.com/3/image',
                        fileFieldName: 'image',
                        headers: {
                            'Authorization': 'Client-ID 9e57cb1c4791cea'
                        },
                        urlPropertyName: 'data.link'
                    }
                }
            },
            dataTypes: [
                { title: 'string', value: 0 },
                { title: 'int', value: 1 },
                { title: 'image', value: 2 },
                { title: 'codeEditor', value: 4 },
                { title: 'html', value: 5 },
                { title: 'textArea', value: 6 },
                { title: 'boolean', value: 7 },
                { title: 'mdTextArea', value: 8 },
                { title: 'date', value: 9 },
                { title: 'datetime', value: 10 },
            ]
        };
        $rootScope.range = function (max) {
            var input = [];
            for (var i = 1; i <= max; i += 1) input.push(i);
            return input;
        };

        $rootScope.$watch('isBusy', function (newValue, oldValue) {
            if (newValue) {
                $rootScope.message.content = '';
                $rootScope.errors = [];
            }
        });

        $rootScope.executeFunctionByName = async function (functionName, args, context) {
            if (functionName !== null) {
                var namespaces = functionName.split(".");
                var func = namespaces.pop();
                for (var i = 0; i < namespaces.length; i++) {
                    context = context[namespaces[i]];
                }
                functionName = null;
                return context[func].apply(this, args);
            }
        };
        $rootScope.changeLang = function (lang) {
            commonServices.fillSettings(lang).then(function (response) {
                $rootScope.settings = response;
                translatorService.fillTranslator($rootScope.settings.lang);
            });
        };
        $rootScope.showConfirm = function (context, okFuncName, okArgs, cancelFuncName, title, msg
            , cancelArgs, lblOK, lblCancel) {
            $rootScope.confirmMessage = {
                title: title,
                content: msg,
                context: context,
                okFuncName: okFuncName,
                okArgs: okArgs,
                cancelFuncName: cancelFuncName,
                cancelArgs: cancelArgs,
                lblOK: lblOK ? lblOK : 'OK',
                lblCancel: lblCancel ? lblCancel : 'Cancel'
            };
            $('#dlg-confirm-msg').modal('show');
        };
        $rootScope.initEditor = function () {
            setTimeout(function () {
                // Init Code editor
                $.each($('.code-editor'), function (i, e) {
                    var container = $(this);
                    var editor = ace.edit(e);
                    if (container.hasClass('json')) {
                        editor.session.setMode("ace/mode/json");
                    }
                    else {
                        editor.session.setMode("ace/mode/razor");
                    }
                    editor.setTheme("ace/theme/chrome");
                    //editor.setReadOnly(true);

                    editor.session.setUseWrapMode(true);
                    editor.setOptions({
                        maxLines: Infinity
                    });
                    editor.getSession().on('change', function (e) {
                        // e.type, etc
                        $(container).parent().find('.code-content').val(editor.getValue());
                    });
                })
                $.each($('.editor-content'), function (i, e) {
                    var $demoTextarea = $(e);
                    $demoTextarea.trumbowyg(ngAppSettings.editorConfigurations.plugins);
                });
            }, 200)
        }

        $rootScope.showErrors = function (errors) {
            $.each(errors, function (i, e) {
                $rootScope.showMessage(e, 'danger');
            });
        }

        $rootScope.showMessage = function (content, type) {
            var from = 'bottom';
            var align = 'right';
            $.notify({
                icon: "now-ui-icons ui-1_bell-53",
                message: content,

            }, {
                    type: type,
                    timer: 2000,
                    placement: {
                        from: from,
                        align: align
                    }
                });
        }

        $rootScope.translate = function (keyword, defaultValue) {
            if ($rootScope.settings && ($rootScope.translator || $rootScope.isBusy)) {
                return $rootScope.translator.get(keyword, defaultValue);
            }
            else {
                return defaultValue || keyword;
            }
        }
    }]);

function Filter($filter) {
    return function (utcDateString, format) {
        // return if input date is null or undefined
        if (!utcDateString) {
            return;
        }

        // append 'Z' to the date string to indicate UTC time if the timezone isn't already specified
        if (utcDateString.indexOf('Z') === -1 && utcDateString.indexOf('+') === -1) {
            utcDateString += 'Z';
        }

        // convert and format date using the built in angularjs date filter
        return $filter('date')(utcDateString, format);
    };
}
var modules = angular.module('components', []);