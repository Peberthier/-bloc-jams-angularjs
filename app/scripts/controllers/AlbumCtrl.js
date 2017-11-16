(function() {
  function AlbumCtrl() {
    this.songs = [];
    for (var i=0; i < albumPicasso.length; i++) {
      this.songs.push(angular.copy(albumPicasso.songs[i]));
    }
    }
  }

  angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();
