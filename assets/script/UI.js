cc.Class({
    extends: cc.Component,

    properties: {
      canvas: cc.Node,
      ShootCollider: {
          default: null,
          type: cc.CircleCollider
      },
      LeftCollider: {
          default: null,
          type: cc.CircleCollider
      },
      RightCollider: {
          default: null,
          type: cc.CircleCollider
      },
      Shooter: {
          default: null,
          type: cc.Node
      },
      Hero: {
          default: null,
          type: cc.Node
      }
    },

    // use this for initialization
    onLoad: function () {
      this.pressedShoot = false;
      this.pressedLeft = false;
      this.pressedRight = false;
      // TO-DO revisar
      this.rightPosition = cc.p({x: this.RightCollider.node.position.x -50, y: this.RightCollider.node.position.y});
      this.leftPosition =  cc.p({x: this.LeftCollider.node.position.x -50, y: this.LeftCollider.node.position.y});

      this.ShooterComponent = this.Shooter.getComponent("Shooter");
      this.HeroComponent = this.Hero.getComponent("Hero");
      this.setInputControlTouches();
    },

    checkButtonsPressed: function(self,touchLoc,buttons)
    {
      var distanceSquared = cc.pDistanceSQ(self.ShootCollider.node.position, touchLoc);
      buttons.shoot = (distanceSquared < (self.ShootCollider.radius * self.ShootCollider.radius));
      var distanceSquared = cc.pDistanceSQ(this.rightPosition, touchLoc);
      buttons.right = (distanceSquared < (self.RightCollider.radius * self.RightCollider.radius));
      var distanceSquared = cc.pDistanceSQ(this.leftPosition, touchLoc);
      buttons.left = (distanceSquared < (self.LeftCollider.radius * self.LeftCollider.radius));
    },

    setButtonsAsPressed: function(self,touch)
    {
      self.buttons = {left: false, right: false, shoot: false};
      self.checkButtonsPressed(self,touch.getLocation(),self.buttons);
      self.pressedShoot = self.buttons.shoot;
      self.pressedLeft = self.buttons.left;
      self.pressedRight = self.buttons.right;
    },

    restartButtonsOnEnd: function(self,touch)
    {
      self.buttons = {left: false, right: false, shoot: false};
      self.checkButtonsPressed(self,touch.getLocation(),self.buttons);
      if (self.buttons.shoot) self.pressedShoot = false;
      if (self.buttons.left) self.pressedLeft = false;
      if (self.buttons.right) self.pressedRight = false;
    },

    setInputControlTouches: function(){
      this.buttons = {left: false, right: false, shoot: false};
      var self = this;
      self.canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
          var touches = event.getTouches();
          self.setButtonsAsPressed(self,touches[0]);
          if (touches.length >= 2)
          {
            self.setButtonsAsPressed(self,touches[1]);
          }
          return true;
      }, self.node);

      self.canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
          var touches = event.getTouches();
          self.setButtonsAsPressed(self,touches[0]);
          if (touches.length >= 2)
          {
            self.setButtonsAsPressed(self,touches[1]);
          }
          return true;
      }, self.node);
      self.canvas.on(cc.Node.EventType.TOUCH_END, function (event) {
          console.log("TOUCH_END");
          var touches = event.getTouches();
          self.restartButtonsOnEnd(self,touches[0]);
          if (touches.length >= 2)
          {
            self.restartButtonsOnEnd(self,touches[1]);
          }
          return true;
      }, self.node);
    },

    update: function (dt) {
      if (this.pressedShoot)
      {
        this.pressedShoot = false;
        this.ShooterComponent.startShooting();
      }

      if (this.pressedLeft) this.HeroComponent.moveLeft();
      else if (this.pressedRight) this.HeroComponent.moveRight();
      else this.HeroComponent.stopped();
    },


});
