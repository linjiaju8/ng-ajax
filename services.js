/**
 * Created by jackie0 on 2018/7/6.
 */
'use strict';

define(['angular'], function (angular) {

    /* Services */
    var appServices = angular.module('appServices');

    appServices.factory('$ngAjax', ['$resource',
        function ($resource) {
            var checkConfig = function (config) {
                if (config) {
                    if (!config['url']) {
                        throw "缺少必要参数[url:请求地址]！";
                    } else if (!config['success'] || !(typeof config['success'] == "function" )) {
                        throw "缺少必要参数[success:请求成功后回调函数]或者success不是函数！";
                    }
                } else {
                    throw "缺少必要参数，url！";
                }
                return true;
            };

            var ajax = function (config, method) {
                if (!checkConfig(config)) {
                    return;
                }
                var successCallbackFunction = config['success'];
                var exceptionCallbackFunction = config['fail'];
                var params = config['params'];
                var url = config['url'];
                var $ngResource = $resource('../' + url + '.json?TIMESTAMP=' + (new Date()).getTime(), {}, {
                    post: {
                        method: 'POST',
                        params: {}
                    }
                });
                switch (method) {
                    case 'post':
                        $ngResource.post({}, params, function (responseData) {
                            successCallbackFunction(responseData);
                        }, function (errorData) {
                            exceptionCallbackFunction(errorData);
                        });
                        break;
                    case 'get':
                        $ngResource.get(params, function (responseData) {
                            successCallbackFunction(responseData);
                        }, function (errorData) {
                            exceptionCallbackFunction(errorData);
                        });
                        break;
                    case 'save':
                        $ngResource.save(params, function (responseData) {
                            successCallbackFunction(responseData);
                        }, function (errorData) {
                            exceptionCallbackFunction(errorData);
                        });
                        break;
                    case 'query':
                        $ngResource.query(params, function (responseData) {
                            successCallbackFunction(responseData);
                        }, function (errorData) {
                            exceptionCallbackFunction(errorData);
                        });
                        break;
                    default:
                        $ngResource.post({}, params, function (responseData) {
                            successCallbackFunction(responseData);
                        }, function (errorData) {
                            exceptionCallbackFunction(errorData);
                        });
                }
            };

            return {
                post: function (config) {
                    ajax(config, 'post');
                },
                get: function (config) {
                    ajax(config, 'get');
                }
                ,
                save: function (config) {
                    ajax(config, 'save');
                }
                ,
                query: function (config) {
                    ajax(config, 'query');
                }
            }
        }
    ]);

    return appServices;
});


