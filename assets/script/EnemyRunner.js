cc.Class({
    extends: cc.Component,

    properties: {
      laser: {
          default: null,
          type: cc.Node
      },
    },

    // use this for initialization
    onLoad: function () {
      this.sideMargin = 60;
      this.canvas = cc.director.getScene().getChildByName('Canvas');
      this.maxPosX = this.canvas.width/2 - this.sideMargin;
      this.minPosX = -this.canvas.width/2 + this.sideMargin;
      this.minPosY = -100;
      this.speedX = -5;
      this.speedY = 1;
      this.downStep = 100;
      this.goingDown = false;
      this.lastShot = null;
      this.waitMssTimePerShot = 5000;
    },

    init: function(direction, minPosY,waitMssTimePerShot)
    {
      this.speedX *= direction;
      this.minPosY += minPosY;
      this.waitMssTimePerShot -= waitMssTimePerShot;
    },

    onCollisionEnter: function (other, self) {
      // TO-DO all Dead 
      this.node.destroy();
    },

    shoot: function ()
    {
      var laser = cc.instantiate(this.laser);
      var tempPos = this.node.position;
      tempPos.y -= 50;
      laser.position = tempPos;
      laser.active = true;
      laser.zIndex = 1;
      laser.getComponent("EnemyLaser").setSpeed(180);
      this.canvas.addChild(laser);
      return true;
    },

    update: function (dt) {
      // TO-DO
      if (this.shootingAllowed && (Date.now() - this.lastShot) > this.waitMssTimePerShot)
      {
        this.shootingAllowed = false;
        this.lastShot = Date.now();
        this.shoot();
      }

      if (this.goingDown)
      {
        var newPosY = this.node.position.y - this.speedY;
        if ((newPosY > this.minPosY) && (this.goingDownStart - newPosY < this.downStep))
        {
          this.node.setPositionY(newPosY)
        }
        else
        {
          if (newPosY <= this.minPosY)
          {
            // TO-DO increase shooting
            this.shootingAllowed = true;
          }
          this.goingDown = false;
        }
      }

      var newPosX = this.node.position.x + this.speedX;
      if (this.speedX > 0 && (newPosX > this.maxPosX) || (newPosX < this.minPosX) && this.speedX < 0)
      {
        this.goingDownStart = this.node.position.y;
        this.goingDown = true;
        this.speedX *=-1;
      }
      else
      {
        this.node.setPositionX(newPosX);
      }
    },


});
