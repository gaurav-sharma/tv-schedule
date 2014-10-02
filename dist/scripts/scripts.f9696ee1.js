"use strict";angular.module("yoAngularApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("yoAngularApp").controller("MainCtrl",["$scope","$http","API_KEY",function(a,b,c){a.apiKey=c,a.filterText=null,a.genreFilter=null,a.availableGenres=[],a.orderFields=["Air Date","Rating"],a.orderDirections=["Descending","Ascending"],a.orderField="Air Date",a.orderReverse="false",a.results=[],a.init=function(){var c=new Date,d=c.getFullYear()+("0"+(c.getMonth()+1)).slice(-2)+""+("0"+c.getDate()).slice(-2);b.jsonp("http://api.trakt.tv/calendar/premieres.json/"+a.apiKey+"/"+d+"/30/?callback=JSON_CALLBACK").success(function(b){angular.forEach(b,function(b){var c=b.date;angular.forEach(b.episodes,function(b){b.date=c,a.results.push(b),angular.forEach(b.show.genres,function(b){var c=!1;angular.forEach(a.availableGenres,function(a){a===b&&(c=!0)}),c===!1&&a.availableGenres.push(b)})})})}).error(function(a){console.log(a)})},a.customOrder=function(b){switch(a.orderField){case"Air Date":return b.episode.first_aired;case"Rating":return b.episode.ratings.percentage}},a.setGenreFilter=function(b){a.genreFilter=b}}]),angular.module("yoAngularApp").constant("API_KEY","637a468fe83e483e79eaeefa93849329"),angular.module("yoAngularApp").filter("isGenre",function(){return function(a,b){if("undefined"==typeof b||null===b)return a;for(var c=[],d=0;d<a.length;d++)for(var e=0;e<a[d].show.genres.length;e++)a[d].show.genres[e]===b&&c.push(a[d]);return c}});