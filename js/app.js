// create an app used to search for an artist's most popular songs
$(document).ready( function() {

  $('#search-form').submit(function(e){
    e.preventDefault();
    var artist = $('.name').val();
    getArtistId( artist );
  });

  var getArtistId = function( artist ) {
    var request = { 
      q:    artist,
      type: 'artist'
    };
    $.ajax({
      url: "https://api.spotify.com/v1/search",
      data: request
    })
    .done(function(result){ 
      if(result.artists.items[0]){
        var artistId = result.artists.items[0].id;
        getTopTracks(artistId);
      }
    });
  }

  var getTopTracks = function( id ) {
    var request = { 
      country: 'US'
    };
    $.ajax({
      url: "https://api.spotify.com/v1/artists/" + id + "/top-tracks",
      data: request
    })
    .done(function(result){
      showTracks(result);
    });
  }

  var showTracks = function ( result ) {
    $('.results').show();
    $('h1').html(result.tracks[0].artists[0].name);
    var count = 0;
    $.each(result.tracks, function(key, value) {
      if( count > 0 ) {
        $('.track').eq(0).clone().appendTo('.result');
      }
      $('.track').eq(count).find('.name').text(this.name);
      $('.track').eq(count).find('iframe').attr( 'src', 'https://embed.spotify.com/?uri=spotify:track:' + this.id );
      count++;
    })
  }
});