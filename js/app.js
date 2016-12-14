$(document).ready( function() {

  var findTopTracks = function( id ) {
    var request = { 
      country: 'US'
    };
    $.ajax({
      url: "https://api.spotify.com/v1/artists/" + id + "/top-tracks",
      data: request
    })
    .done(function(result){
      showTracks(result);
    })
  }
})