// Generated by CoffeeScript 1.6.3
(function() {
  'use strict';
  angular.module('ngApkreator').controller('AppCreatorCtrl', function($scope, $rootScope, $compile, $http) {
    var dialog, hoodie, saveToLocalStorage;
    $rootScope.headerMenuItems = [
      {
        name: "Home",
        url: "#/",
        "class": ""
      }, {
        name: "App Creator",
        url: "#/app-creator",
        "class": "active"
      }, {
        name: "Features",
        url: "#/features",
        "class": ""
      }, {
        name: "Contact",
        url: "#",
        "class": ""
      }
    ];
    hoodie = new Hoodie();
    $scope.isAuthorized = false;
    if (hoodie.account.username) {
      $http.get('http://localhost:5000/is_confirmed/' + hoodie.account.username).success(function(data) {
        console.log("is confirmed: ", data.confirmed);
        if (data.confirmed) {
          return $scope.isAuthorized = true;
        } else {
          return vex.dialog.alert("Please confirm your account by clicking on the link that was sent to you by email");
        }
      }).error(function(data, status) {
        return console.log("error", data, status);
      });
    } else {
      dialog = $compile("<div ng-include ng-controller=\"SignInCtrl\" src=\"'views/parts/dialogs/sign-in.html'\"></div>");
      vex.open().append(dialog($scope)).bind("vexClose", function() {
        hoodie = new Hoodie();
        if (hoodie.account.username) {
          $rootScope.account.dropdownItems = [
            {
              name: "My Account",
              "route": ""
            }, {
              name: "My Apps",
              "route": ""
            }, {
              name: "Sign Out",
              onclick: "signOut()"
            }
          ];
          $scope.dropdown.label = hoodie.account.username;
          return $scope.$digest();
        } else {
          return window.location = "/#/";
        }
      });
    }
    $scope.hasYoutube = true;
    $scope.hasGplus = true;
    $scope.hasTwitter = true;
    $scope.hasWebsite = true;
    $scope.features_text = "";
    $scope.features = {
      youtube: localStorage.getItem("youtube"),
      gplus: localStorage.getItem("gplus"),
      twitter: localStorage.getItem("twitter")
    };
    $scope.config = {
      appName: localStorage.getItem("appName"),
      packageName: localStorage.getItem("packageName"),
      colorScheme: localStorage.getItem("colorScheme"),
      icon: localStorage.getItem("icon"),
      presentation: localStorage.getItem("presentation"),
      website: localStorage.getItem("website"),
      apiKey: localStorage.getItem("apiKey")
    };
    $scope.adjustFeaturesText = function() {
      if ($scope.hasYoutube && $scope.hasGplus) {
        return $scope.features_text = "YouTube & Google+";
      } else if ($scope.hasYoutube) {
        return $scope.features_text = "YouTube";
      } else {
        return $scope.features_text = "Google+";
      }
    };
    $scope.generateAPIRequest = function() {
      var request;
      saveToLocalStorage();
      request = "/app/" + encodeURIComponent($scope.config.appName) + "/package/" + encodeURIComponent($scope.config.packageName) + "/color/" + encodeURIComponent($scope.config.colorScheme) + "/icon/" + encodeURIComponent($scope.config.icon) + "/youtube/" + encodeURIComponent($scope.features.youtube) + "/gplus/" + encodeURIComponent($scope.features.gplus) + "/twitter/" + encodeURIComponent($scope.features.twitter) + "/facebook/unimplemented" + "/website/" + encodeURIComponent($scope.config.website) + "/welcome_title/Welcome!" + "/welcome_desc/" + encodeURIComponent($scope.config.presentation) + "/api_key/" + encodeURIComponent($scope.config.apiKey);
      console.log(request);
      vex.dialog.open({
        showCloseButton: false,
        escapeButtonCloses: false,
        overlayClosesOnClick: false
      }).html("<div class=\"sign-in-dialog\">\n     <div class=\"text-center\">\n         <h1 class=\"teal no-margin-top\">Building Your App</h1>\n     </div>\n     <div class=\"csspinner bar-follow\" style=\"width: 450px; margin-top: 30px; margin-bottom: 80px;\"></div>\n</div>");
      return $http.get('http://localhost:5000' + request, {
        timeout: 600000
      }).success(function(data, status, headers, config) {
        console.log(data, status, headers, config);
        vex.closeAll();
        return window.location = data.apkUrl;
      }).error(function(data, status, headers, config) {
        console.log("error", data, status, headers, config);
        return vex.dialog.open().html("<div class=\"sign-in-dialog\">\n     <div class=\"text-center\">\n         <h1 class=\"pumpkin no-margin-top\">There Was an Error!</h1>\n     </div>\n     <p class=\"aleo\">Sorry, an error seems to have occured while building your app. Please try again.</p>\n</div>");
      });
    };
    $scope.adjustFeaturesText();
    $scope.compileHtml = function(html) {
      var linkThat;
      linkThat = $compile(html);
      return linkThat($scope);
    };
    return saveToLocalStorage = function() {
      localStorage.setItem("appName", $scope.config.appName);
      localStorage.setItem("packageName", $scope.config.packageName);
      localStorage.setItem("colorScheme", $scope.config.colorScheme);
      localStorage.setItem("icon", $scope.config.icon);
      localStorage.setItem("presentation", $scope.config.presentation);
      localStorage.setItem("apiKey", $scope.config.apiKey);
      localStorage.setItem("hasYoutube", $scope.hasYoutube);
      localStorage.setItem("youtube", $scope.features.youtube);
      localStorage.setItem("twitter", $scope.features.twitter);
      localStorage.setItem("hasGplus", $scope.hasGplus);
      localStorage.setItem("gplus", $scope.features.gplus);
      return localStorage.setItem("website", $scope.config.website);
    };
  });

}).call(this);

/*
//@ sourceMappingURL=app-creator.map
*/
