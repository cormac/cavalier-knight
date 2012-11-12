//CAVALIER
// the cavalier has three types of attack, sword shield and mace
//
// these are attached to different buttons

var CK = CK || {};
CK.cavalier = ( function (window, document, undefined) {
  var createCavalier,
      newCavalier,
      ee = CK.events.ee,
      acceptAttack,
      currentAttack,
      attackDelay = 1000,
      attackSuccess = true,
      processAttack,
      cavalier,
      keyListener,
      cavalierState,
      canvas;
  
  //dod declared varibles 12-11-12
	var cwidth = 1280;
	var cheight = 720;
	var ctx;
	var everything = [];
	var curwall;
	var wallwidth = 5;
	var wallstyle = "rgb(200,0,200)";
	var walls = [];
	var inmotion = false;
	var unit = 10;
  

  // constructor for cavalier
  cavalier = function() {
    acceptAttack = true;
    this.addListeners();
    this.moveit = movetoken;
  }

  // implement a keylistener function
  // this calls the keyDown function passing the newly created cavalier
  // instance in as context, it also passes the keydown event along as 
  // a parameter
  keyListener = function ( e ) {
    newCavalier.keyDown.call(newCavalier, e);
  }

  // add event listener for cavalier keypresses
  cavalier.prototype.addListeners = function () {
    document.addEventListener( 'keydown', keyListener, false );
    ee.addListener( 'shield defence', shieldDefenceListener );
    ee.addListener( 'sword defence', swordDefenceListener );
    ee.addListener( 'mace defence', maceDefenceListener );
  }


  // handle the key presses
  // limit the attack to 1 per second
  cavalier.prototype.keyDown = function ( e ) {
	  var keyCode; 
	  if(e == null)
	  {
	    keyCode = window.event.keyCode; 
		window.event.preventDefault();
	  }
	  else 
	  {
	    keyCode = event.keyCode; 
		event.preventDefault();
	  }
	  
	  switch(keyCode)
	  {
	      case 37:  //left arrow
	    	  mypent.moveit(-unit,0);
	    	  break; 
	      case 38:  //up arrow
	    	  mypent.moveit(0,-unit);
	    	  break; 
	      case 39: //right arrow
	    	  mypent.moveit(unit,0);
	    	  break; 
	      case 40:  //down arrow
	    	  mypent.moveit(0,unit);
	    	  break; 
	      default:
	    	  window.removeEventListener('keydown',getkeyAndMove,false);
	 	 }
	  
	  if ( acceptAttack === true ) {
      if ( e.keyCode === 65 )
        this.triggerAttack('shield attack');
      if ( e.keyCode === 83 )
        this.triggerAttack('sword attack');
      if ( e.keyCode === 68 )
        this.triggerAttack('mace attack') 

      // todo ( cormac ) separate this function to handle defensive moves
      window.setTimeout(processAttack, attackDelay);

      acceptAttack = false;
      attackSuccess = true;
    }
  }


  // fire the attack event
  cavalier.prototype.triggerAttack = function ( attackType ) {
    currentAttack = attackType;
    ee.emitEvent( attackType );
  };

  // remove the keydown listener
  cavalier.prototype.removeEventListener = function () {
    document.removeEventListener( 'keydown', keyListener, false );
  }

  ///////////////////////////////////////////////////////////////////////
  // Observe the attack and deal with the results

  // Listen for blocking moves
  var shieldDefenceListener = function() {
    if ( currentAttack === 'shield attack' ) {
      ee.emitEvent( 'attack blocked' );
      attackSuccess = false;
    }
  };
  var swordDefenceListener = function() {
    if ( currentAttack === 'sword attack' ) {
      ee.emitEvent( 'attack blocked' );
      attackSuccess = false;
    }
  };
  var maceDefenceListener = function() {
    if ( currentAttack === 'mace attack' ) {
      ee.emitEvent( 'attack blocked' );
      attackSuccess = false;
    }
  };

  // Check the result of the attack
  processAttack = function () {
    if ( attackSuccess === true ) {
      if ( currentAttack === 'shield attack')
        ee.emitEvent( 'shield success' );
      if ( currentAttack === 'sword attack')
        ee.emitEvent( 'sword success' );
      if ( currentAttack === 'mace attack')
        ee.emitEvent( 'mace success' );
    }
    acceptAttack = true;
    currentAttack = '';
    
  };

  // cavalier creation function
  createCavalier = function () {
    newCavalier = new cavalier();
    return newCavalier;
  }


  return {
    create: createCavalier
  };
}( window, document ) );
