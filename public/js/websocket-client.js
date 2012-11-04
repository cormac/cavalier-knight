var Cavalier = {} || Cavalier;

Cavalier.Socket = ( function() {
  "use strict";
  var socket;

  socket = new WebSocket( "ws://localhost:8080" );  
  socket.onopen = function ( e ) {
    console.log( 'socket open' );
  }

}() );
