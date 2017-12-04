(function() {
    function SongPlayer(Fixtures) {
      var SongPlayer = {};

/**
* @desc returns album Picasso
*/
      var currentAlbum = Fixtures.getAlbum();

      var currentBuzzObject = null;

/**
* @function stopSong
* @desc stop the played music in buzz and set the playing property to null
* @param {Object} none
*/
var stopSong = function() {
    currentBuzzObject.stop();
    SongPlayer.currentSong.playing = null;
      }

/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/

var setSong = function(song) {
  if (currentBuzzObject) {
    stopSong();
  };

  currentBuzzObject = new buzz.sound(song.audioUrl, {
    formats: ['mp3'],
    preload: true
  });

  SongPlayer.currentSong  = song;
}

/**
* @function playSong
* @desc start playing a song and set the playing property to true
* @param {Object} song
*/

var playSong = function(song) {
  currentBuzzObject.play();
  song.playing = true;
  console.log('play test')
}

/**
* @function getSongIndex
* @desc returns the index of a song
* @param {Object} song
*/
var getSongIndex = function(song) {
    return currentAlbum.songs.indexOf(song);
}



SongPlayer.currentSong  = null;

SongPlayer.play = function(song) {
        song = song || SongPlayer.currentSong;
        if (SongPlayer.currentSong  !== song) {
          setSong(song);
          console.log('test-play')
        currentBuzzObject.play();
        song.playing = true;
      } else if (SongPlayer.currentSong  === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };

    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
      console.log('test')
    }


    /**
    * @function SongPlayer.previous
    * @desc decrease by 1 rank currentSongIndex
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
      stopSong();
    } else {
      var song = currentAlbum.songs[currentSongIndex];
      setSong(song);
      playSong(song);
    }
    };

    /**
    * @function SongPlayer.next
    * @desc increase by 1 rank currentSongIndex
    */

    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex >= currentAlbum.songs.length) {
      stopSong();
    } else {
      var song = currentAlbum.songs[currentSongIndex];
      setSong(song);
      playSong(song);
    }
    };


      return SongPlayer;
    }

    angular
      .module('blocJams')
      .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
