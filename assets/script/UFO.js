cc.Class({
    extends: cc.Component,

    properties: {
        speed: 2,
        canvas: cc.Node,
        laser: {
            default: null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
      this.speedRotation = 0.5;
      this.maxRotation = 25;
      this.isSpawned = false;
      this.isMoving = true;
      this.minPosX = -this.node.parent.width/2 - 400;
      this.maxPosX = this.node.parent.width/2 + 400;
      this.UFOLaser = this.laser.getComponent("UFOLaser");
      this.node.on('laserDone', this.laserDone, this);
      this.setInputControlByTouch();
    },

    setInputControlByTouch: function ()
    {
      var self = this;
      this.canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
      var touches = event.getTouches();
      var touchLoc = touches[0].getLocation();
      if (self.inRange(self.node.position,this.parent.convertToNodeSpaceAR(touchLoc)))
      {
        self.activateLaser(false);
      }
      }, this.node);
    },

    inRange: function (myPosition,clickedPosition)
    {
      return ((myPosition.x < clickedPosition.x + 50) && (myPosition.x > clickedPosition.x - 50) && (myPosition.y < clickedPosition.y + 50) && (myPosition.y > clickedPosition.y - 50))
    },

    laserDone: function ()
    {
      this.isMoving = true;
      this.laserAttacked = false;
    },

    activateLaser: function (activatedByHit)
    {
      this.isMoving = false;
      this.laserAttacked = true;
      this.activatedByHit = activatedByHit;
    },

    onCollisionEnter: function (other, self)
    {
      // TO-DO
      console.log("UFO hit! Shoot!");
      this.activateLaser(true);
    },


    decidedToSpawn: function (){
      // TO-DO
      return true;
    },

    rotate: function (){
      var newRotation = this.node.rotation + this.speedRotation;
      if (newRotation > this.maxRotation || newRotation < -this.maxRotation)
      {
        this.speedRotation *=-1;
      }
      else if (cc.random0To1() < 0.05) this.speedRotation *=-1;
      this.node.rotation = newRotation;
    },

    goOtherSide: function () {
      var newPosX = this.node.position.x + this.speed;
      this.node.setPositionX(newPosX);
      if (newPosX > this.maxPosX || newPosX < this.minPosX)
      {
        this.speed *=-1;
        this.isSpawned = false;
      }
      this.rotate();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
      if (this.isMoving && (this.isSpawned || this.decidedToSpawn()))
      {
        this.goOtherSide();
      }
      if (this.laserAttacked)
      {
        this.laser.active = true;
        this.UFOLaser.activateLaser(this.activatedByHit);
      }

    },
});
