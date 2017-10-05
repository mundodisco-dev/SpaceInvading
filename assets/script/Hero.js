cc.Class({
    extends: cc.Component,

    properties: {
        canvas: cc.Node,
        speed: 250,
    },

    // use this for initialization
    onLoad: function () {
      this.moveThreshold = 1;
      this.isMoving = false;
      this.direction = 0;
      // screen boundaries
      this.sideMargin = this.canvas.getComponent("Game").sideMargin;
      this.minPosX = -this.node.parent.width/2 + this.sideMargin;
      this.maxPosX = this.node.parent.width/2 - this.sideMargin;
      this.currentSideAnimation = 0;
      this.alive = true;
      // this.setInputControlByTouch();
      // this.setInputControl();
    },

    setInputControlByTouch: function ()
    {
      var self = this;
      this.canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
          var touches = event.getTouches();
          var touchLoc = touches[0].getLocation();
          self.isMoving = true;
          self.moveToPos = this.parent.convertToNodeSpaceAR(touchLoc);
      }, this.node);
      this.canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
          var touches = event.getTouches();
          var touchLoc = touches[0].getLocation();
          self.moveToPos = this.parent.convertToNodeSpaceAR(touchLoc);
      }, this.node);
      this.canvas.on(cc.Node.EventType.TOUCH_END, function (event) {
          self.isMoving = false; // when touch ended, stop moving
      }, this.node);
    },

    setInputControl: function () {
        var self = this;
        //add keyboard input listener to jump, turnLeft and turnRight
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            // set a flag when key pressed
            onKeyPressed: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:
                        self.accLeft = true;
                        self.accRight = false;
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        self.accLeft = false;
                        self.accRight = true;
                        break;
                }
            },
            // unset a flag when key released
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:
                        self.accLeft = false;
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        self.accRight = false;
                        break;
                }
            }
        }, self.node);

        // touch input
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                var touchLoc = touch.getLocation();
                if (touchLoc.x >= cc.winSize.width/2) {
                    self.accLeft = false;
                    self.accRight = true;
                } else {
                    self.accLeft = true;
                    self.accRight = false;
                }
                // don't capture the event
                return true;
            },
            onTouchEnded: function(touch, event) {
                self.accLeft = false;
                self.accRight = false;
            }
        }, self.node);
    },


    setSideAnimation: function (side) {
      if (side == 0) side = ''
      else if (side > 0) side = 'Right'
      else side = 'Left';
      var sprite = this.getComponent(cc.Sprite);
      var url = "Sprites/Hero/player"+side;
      cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
        sprite.spriteFrame = spriteFrame;
      });
    },

    onCollisionEnter: function (other, self) {
      return;
      this.alive = false;
      var event = new cc.Event.EventCustom("GameOver", true);
      this.node.dispatchEvent(event);
      this.node.destroy();
      // TO-DO colision del UFO te da escudo
    },

    moveLeft: function(){
      this.isMoving = true;
      this.direction = {x:-1,y:0};
    },

    moveRight: function(){
      this.isMoving = true;
      this.direction = {x:1,y:0};
    },

    stopped: function(){
      this.isMoving = false;
      this.direction = {x:0,y:0};
    },

    // called every frame
    update: function (dt) {
      if (!this.alive) return;
      if (!this.isMoving)
      {
        if (this.currentSideAnimation != 0) return;
        this.currentSideAnimation = 0;
        this.setSideAnimation(0);
        return;
      }
      var oldPos = this.node.position;
      // get move direction
      // var direction = cc.pNormalize(cc.pSub(this.moveToPos, oldPos));
      // console.log(direction);
      // console.log(this.direction);
      // multiply direction with distance to get new position
      var newPos = cc.pAdd(oldPos, cc.pMult(this.direction, this.speed * dt));

      // limit player position inside screen
      if ( newPos.x > this.maxPosX) {
          newPos.x = this.maxPosX;
          return;
      } else if (newPos.x < this.minPosX) {
          this.node.x = this.minPosX;
          return;
      }
      if (Math.abs(oldPos.x - newPos.x) > this.moveThreshold)
      {
        this.setSideAnimation(this.direction.x);
        this.currentSideAnimation = this.direction.x;
        this.node.setPositionX(newPos.x);
      }

    },
});
