CK = CK || {};
CK.start = ( function ( document, window, undefined ) {
  console.log( 'load' );
  var load = function( e ) {
    console.log( CK );
    CK.sockets.startSockets();
    CK.easel.startPainting();
    CK.cavalier.create();
  };
  document.addEventListener("DOMContentLoaded", load, false);

} ( document, window ) );
