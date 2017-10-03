cc.Class({
    extends: cc.Component,

    properties: {
        speed: 2,
    },

    // use this for initialization
    onLoad: function () {
      this.speedRotation = 0.5;
      this.maxRotation = 25;
      this.isSpawned = false;
      this.minPosX = -this.node.parent.width/2 - 200;
      this.maxPosX = this.node.parent.width/2 + 200;
    },

    onCollisionEnter: function (other, self) {
      // TO-DO
      console.log("UFO hit! Shoot!");
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
      if (this.isSpawned || this.decidedToSpawn())
      {
        this.goOtherSide();
      }
    },
});
