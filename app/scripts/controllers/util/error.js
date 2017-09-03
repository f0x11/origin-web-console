'use strict';

/**
 * @ngdoc function
 * @name openshiftConsole.controller:ErrorController
 * @description
 * # ErrorController
 * Controller of the openshiftConsole
 */
angular.module('openshiftConsole')
  .controller('ErrorController', function ($scope, $window, gettext, gettextCatalog) {
    var params = URI(window.location.href).query(true);
    var error = params.error;

    switch(error) {
      case 'access_denied':
        $scope.errorMessage = gettextCatalog.getString(gettext("Access denied"));
        break;
      case 'not_found':
        $scope.errorMessage = gettextCatalog.getString(gettext("Not found"));
        break;
      case 'invalid_request':
        $scope.errorMessage = gettextCatalog.getString(gettext("Invalid request"));
        break;
      case 'API_DISCOVERY':
        $scope.errorLinks = [{
          href: window.location.protocol + "//" + window.OPENSHIFT_CONFIG.api.openshift.hostPort + window.OPENSHIFT_CONFIG.api.openshift.prefix,
          label: "Check Server Connection",
          target: "_blank"
        }];
        break;
      default:
        $scope.errorMessage = gettextCatalog.getString(gettext("An error has occurred"));
    }

    if (params.error_description) {
      $scope.errorDetails = params.error_description;
    }

    $scope.reloadConsole = function() {
      $window.location.href = "/";
    };
  });
