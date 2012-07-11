var Cube = function() {
  this.opened = true;
  this.xRotation = 0;
  this.yRotation = 0;
  this.translationZ = 956;

  this.cameraPosition = {
    x: 256,
    y: 256,
    z: -256
  }
};

Cube.prototype.loadImages = function(front, back, top, right, bottom, left){
  this.images = this.images || {};
  this.images.front = front || 'none';
  this.images.back = back || 'none';
  this.images.top = top || 'none';
  this.images.right = right || 'none';
  this.images.bottom = bottom || 'none';
  this.images.left = left || 'none';
  this.showImages();
};

Cube.prototype.showImages = function(){
  this.frontFace.css('background-image', 'url(' + this.images.front + ')');
  this.backFace.css('background-image', 'url(' + this.images.back + ')');
  this.topFace.css('background-image', 'url(' + this.images.top + ')');
  this.rightFace.css('background-image', 'url(' + this.images.right + ')');
  this.bottomFace.css('background-image', 'url(' + this.images.bottom + ')');
  this.leftFace.css('background-image', 'url(' + this.images.left + ')');
};

Cube.prototype.hideImages = function(){
  this.frontFace.css('background-image', 'none');
  this.backFace.css('background-image', 'none');
  this.topFace.css('background-image', 'none');
  this.rightFace.css('background-image', 'none');
  this.bottomFace.css('background-image', 'none');
  this.leftFace.css('background-image', 'none');
};

Cube.prototype.render = function(elementId) {

  var thisCube = this;

  var toggle = function() {
    thisCube.toggle();
  }

  this.world = $('<div></div>');
  this.world.addClass('world');

  this.world.css('transform-origin', this.cameraPosition.x + 'px ' + this.cameraPosition.y + 'px  ' + this.cameraPosition.z + 'px'); 
  this.world.css('-ms-transform-origin', this.cameraPosition.x + 'px ' + this.cameraPosition.y + 'px  ' + this.cameraPosition.z + 'px');  
  this.world.css('-webkit-transform-origin', this.cameraPosition.x + 'px ' + this.cameraPosition.y + 'px  ' + this.cameraPosition.z + 'px'); 
  this.world.css('-mox-transform-origin', this.cameraPosition.x + 'px ' + this.cameraPosition.y + 'px  ' + this.cameraPosition.z + 'px'); 
  this.world.css('-o-transform-origin', this.cameraPosition.x + 'px ' + this.cameraPosition.y + 'px  ' + this.cameraPosition.z + 'px'); 

  this.world.css('transform', 'translate3d(0px,0px, ' + this.translationZ + 'px) rotateX(' + this.xRotation + 'deg) rotateY(' + this.yRotation + 'deg)');
  this.world.css('-ms-transform', 'translate3d(0px,0px, ' + this.translationZ + 'px) rotateX(' + this.xRotation + 'deg) rotateY(' + this.yRotation + 'deg)');
  this.world.css('-webkit-transform', 'translate3d(0px,0px, ' + this.translationZ + 'px) rotateX(' + this.xRotation + 'deg) rotateY(' + this.yRotation + 'deg)');
  this.world.css('-moz-transform', 'translate3d(0px,0px, ' + this.translationZ + 'px) rotateX(' + this.xRotation + 'deg) rotateY(' + this.yRotation + 'deg)');
  this.world.css('-o-transform', 'translate3d(0px,0px, ' + this.translationZ + 'px) rotateX(' + this.xRotation + 'deg) rotateY(' + this.yRotation + 'deg)'); 

  this.leftFace = $('<div></div>');
  this.leftFace.addClass('face');
  this.leftFace.addClass('leftFace');

  this.bottomFace = $('<div></div>');
  this.bottomFace.addClass('face');
  this.bottomFace.addClass('bottomFace');

  this.frontFace = $('<div></div>');
  this.frontFace.addClass('face');
  this.frontFace.addClass('frontFace');

  this.backFace = $('<div></div>');
  this.backFace.addClass('face');
  this.backFace.addClass('backFace');

  this.rightFace = $('<div></div>');
  this.rightFace.addClass('face');
  this.rightFace.addClass('rightFace');

  this.topFace = $('<div></div>');
  this.topFace.addClass('face');
  this.topFace.addClass('topFace');

  this.world.append(this.leftFace);
  this.world.append(this.bottomFace);
  this.world.append(this.frontFace);
  this.world.append(this.rightFace);
  this.world.append(this.topFace);
  this.world.append(this.backFace);

  //this.world.append(this.cube);
  $('#' + elementId).append(this.world);

  // Attaches events
  this.leftFace.click(toggle);
  this.bottomFace.click(toggle);
  this.backFace.click(toggle);
  this.frontFace.click(toggle);
  this.rightFace.click(toggle);
  this.topFace.click(toggle);

  $(document).keydown(function(evt) {
    switch (evt.keyCode) {
      case 37: // left
        thisCube.rotate(0, 90);
        break;
      
      case 38: // up
        thisCube.rotate(270, 0);
        break;
      
      case 39: // right
        thisCube.rotate(0, 270);
        break;
      
      case 40: // down
        thisCube.rotate(90, 0);
        break;
      
      default:
        break;
    };
  }).bind('mousedown touchstart', function(event) {
    var start;
    var scaleFactor = event.originalEvent.touches? 4 : 1;
    
    event = event.originalEvent.touches? event.originalEvent.touches[0] : event;
    start = {
      x : event.pageX,
      y : event.pageY
    };


    $(document).bind('mousemove touchmove', function(event) {
        // Only perform rotation if one touch or mouse (e.g. still scale with pinch and zoom)
        if (!event.originalEvent.touches || !(event.originalEvent && event.originalEvent.touches.length > 1)) {
            event.preventDefault();
            // Get touch co-ords
            event = event.originalEvent.touches? event.originalEvent.touches[0] : event;
            thisCube.xRotation += (event.pageX - start.x) / scaleFactor;
            thisCube.yRotation -= (event.pageY - start.y) / scaleFactor;
            thisCube.rotate(thisCube.yRotation , thisCube.xRotation);
            start = {
              x : event.pageX,
              y : event.pageY
            };
        }
    });
    
    $(document).bind('mouseup touchend', function() {
        $(document).unbind('mousemove touchmove');
    });
  });

};

Cube.prototype.rotate = function(x, y) {
  this.world.css('transform', 'translate3d(0px,0px, ' + this.translationZ + 'px) rotateX(' + x + 'deg) rotateY(' + y + 'deg)');
  this.world.css('-ms-transform', 'translate3d(0px,0px, ' + this.translationZ + 'px) rotateX(' + x + 'deg) rotateY(' + y + 'deg)');
  this.world.css('-webkit-transform', 'translate3d(0px,0px, ' + this.translationZ + 'px) rotateX(' + x + 'deg) rotateY(' + y + 'deg)');
  this.world.css('-moz-transform', 'translate3d(0px,0px, ' + this.translationZ + 'px) rotateX(' + x + 'deg) rotateY(' + y + 'deg)');
  this.world.css('-o-transform', 'translate3d(0px,0px, ' + this.translationZ + 'px) rotateX(' + x + 'deg) rotateY(' + y + 'deg)');
};

Cube.prototype.toggle = function() {
  if (this.opened) {
    this.opened = false;
    this.close();
  } else {
    this.opened = true;
    this.open();
  }

};

Cube.prototype.close = function() {
  var thisCube = this; 
  this.leftFace.addClass('leftFaceClosed');
  this.frontFace.addClass('frontFaceClosed');
  this.backFace.addClass('backFaceClosed');
  this.rightFace.addClass('rightFaceClosed');
  this.topFace.addClass('topFaceClosed');
  setTimeout(function(){
    thisCube.topFace.addClass('topFaceClosed2');
  },210);
};

Cube.prototype.open = function() {
  var thisCube = this; 
  this.leftFace.removeClass('leftFaceClosed');
  this.frontFace.removeClass('frontFaceClosed');
  this.backFace.removeClass('backFaceClosed');
  this.rightFace.removeClass('rightFaceClosed');
  thisCube.topFace.removeClass('topFaceClosed2');
  this.topFace.removeClass('topFaceClosed');
};