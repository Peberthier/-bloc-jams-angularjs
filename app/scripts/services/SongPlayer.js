(function() {
    function SongPlayer() {
      var SongPlayer = {};
      console.log('test 1')
      var currentSong = null;
      var currentBuzzObject = null;
/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/

var setSong = function(song) {
  if (currentBuzzObject) {
    currentBuzzObject.stop();
    currentSong.playing = null;
  };

  currentBuzzObject = new buzz.sound(song.audioUrl, {
    formats: ['mp3'],
    preload: true
  });

  currentSong = song;
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

      SongPlayer.play = function(song) {
        if (currentSong !== song) {
          setSong(song);
          console.log('test-play')
        currentBuzzObject.play();
        song.playing = true;
      } else if (currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };

    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
      console.log('test')
    }

      return SongPlayer;
    }

    angular
      .module('blocJams')
      .factory('SongPlayer', SongPlayer);
})();
