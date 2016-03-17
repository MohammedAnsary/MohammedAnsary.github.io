'use strict';

var music = angular.module('music', [
  'ui.router',
  'ngAudio',
]);

music.config(function($locationProvider, $stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/tracks/2ye2Wgw4gimLv2eAKyk1NB");
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('tracks', {
      url: "/tracks/:id",
      templateUrl: "views/tracks.html"
    })
    .state('albumDetails', {
      url: "/album/:id",
      templateUrl: "views/album.html"
    })

}).controller('artists',function($scope, $stateParams) {
  $scope.artists = [
    {
      id: '2ye2Wgw4gimLv2eAKyk1NB',
      name: 'Metallica',
      active: false
    },
    {
      id: '5M52tdBnJaKSvOpJGz8mfZ',
      name: 'Black Sabbath',
      active: false
    },
    {
      id: '0k17h0D3J5VfsdmQ1iZtE9',
      name: 'Pink Floyd',
      active: false
    }
  ];
}).controller('tracks',function($scope, $stateParams, $http, ngAudio) {
  $scope.Math = window.Math;
  for (var i = 0; i < $scope.$parent.artists.length; i++) {
    if($scope.$parent.artists[i].id == $stateParams.id) {
      $scope.$parent.artists[i].active = true;
    } else {
      $scope.$parent.artists[i].active = false;
    }
  }
  $http.get("https://ansary.xyz/spotify-access-token-generator/token-request.php").then(function(response) {
    var token = response.data.access_token;
    $http({
      method: 'GET',
      url: 'https://api.spotify.com/v1/artists/' + $stateParams.id + '/top-tracks?country=US',
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + token
      },
    }).then(function successCallback(response) {
      $scope.tracks = response.data.tracks;
      $scope.audio = ngAudio.load(response.data.tracks[0].preview_url);
      $scope.currentID = response.data.tracks[0].id;
      $scope.currentName = response.data.tracks[0].name;
      $scope.currentImg = response.data.tracks[0].album.images[0].url;
      $scope.currentAlbum = response.data.tracks[0].album.name;
      $scope.currentAlbumID = response.data.tracks[0].album.id;
    });
    $scope.playTrack = function (track) {
      if ($scope.audio != undefined) {
          $scope.audio.stop();
      }
      $scope.audio = ngAudio.play(track.preview_url);
      $scope.currentID = track.id;
      $scope.currentName = track.name;
      $scope.currentImg = track.album.images[0].url;
      $scope.currentAlbum = track.album.name;
      $scope.currentAlbumID = track.album.id;
    }
   // 	$scope.audio = ngAudio.load('https://p.scdn.co/mp3-preview/1ee9f1b0c3e3b327dd49ebc6dd64266b01adb96a');

   $scope.$on("$destroy", function() {
     $scope.audio.stop();
   });
  });
}).controller('album',function($scope, $stateParams, $http) {
  $http.get("https://ansary.xyz/spotify-access-token-generator/token-request.php").then(function(response) {
    var token = response.data.access_token;
    $http({
      method: 'GET',
      url: 'https://api.spotify.com/v1/albums/' + $stateParams.id + '?market=US',
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + token
      },
    }).then(function successCallback(response) {
      $scope.albumName = response.data.name;
      $scope.albumID = response.data.id;
      $scope.albumImg = response.data.images[0].url;
      $scope.albumArtist = response.data.artists[0].id;
      console.log($scope.albumArtist);
      $scope.tracks = response.data.tracks.items;

      for (var i = 0; i < $scope.$parent.artists.length; i++) {
        if($scope.$parent.artists[i].id == $scope.albumArtist) {
          $scope.$parent.artists[i].active = true;
        } else {
          $scope.$parent.artists[i].active = false;
        }
      }

    });
  });
});
