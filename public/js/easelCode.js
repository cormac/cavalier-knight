//TODO (Jose) This needs to be an object exporting some methods
CK = CK || {};
CK.easel = ( function ( document, window, undefined ){
  function startPainting(){
    console.log('all ready to paint');
    var stage = new createjs.Stage("gameCanvas");


    stage.mouseMoveOutside = true;
    var circle = new createjs.Shape();
    circle.graphics.beginFill("green").drawCircle(0, 0, 50);
    var dragger = new createjs.Container();
    dragger.x = dragger.y = 100;
    dragger.addChild(circle);
    stage.addChild(dragger);

    dragger.onPress = function(evt) {
      var offset = {x:evt.target.x-evt.stageX, y:evt.target.y-evt.stageY};

      // add a handler to the event object's onMouseMove callback
      // this will be active until the user releases the mouse button:
      evt.onMouseMove = function(ev) {
        ev.target.x = ev.stageX+offset.x;
        ev.target.y = ev.stageY+offset.y;
      }
    }
    
    // dod created function  12-11-12
    dragger.movetoken = function(dx,dy) {
    	this.sx +=dx;
    	this.sy +=dy;
    	var i;
    	var wall; 
    	for(i=0;i<walls.length;i++) {
             wall = walls[i];
    		if (intersect(wall.sx,wall.sy,wall.fx,wall.fy,this.sx,this.sy,this.rad)) {
    		this.sx -=dx;
    		this.sy -=dy;
    		break;
    		}
    	}
    }
    
    createjs.Ticker.addListener(stage);
    stage.update();
  }
  return {
    startPainting: startPainting
  };
} ( document, window ) );
