"use strict";
cc._RF.push(module, '6633aRiwgpIVqE6NbCh/RCa', 'UFO');
// script/UFO.js

"use strict";

cc.Class({
  extends: cc.Component,

  properties: {
    speed: 2,
    canvas: cc.Node,
    laser: {
      default: null,
      type: cc.Node
    }
  },

  // use this for initialization
  onLoad: function onLoad() {
    this.speedRotation = 0.5;
    this.maxRotation = 25;
    this.isSpawned = false;
    this.isMoving = true;
    this.minPosX = -this.node.parent.width / 2 - 400;
    this.maxPosX = this.node.parent.width / 2 + 400;
    this.points = 125;
    this.UFOLaser = this.laser.getComponent("UFOLaser");
    this.node.on('laserDone', this.laserDone, this);
    this.setInputControlByTouch();
  },

  setInputControlByTouch: function setInputControlByTouch() {
    var self = this;
    this.canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
      var touches = event.getTouches();
      var touchLoc = touches[0].getLocation();
      if (self.inRange(self.node.position, this.parent.convertToNodeSpaceAR(touchLoc))) {
        // TO-DO activar tras un tiempo
        self.activateLaser(false);
      }
    }, this.node);
  },

  inRange: function inRange(myPosition, clickedPosition) {
    return myPosition.x < clickedPosition.x + 50 && myPosition.x > clickedPosition.x - 50 && myPosition.y < clickedPosition.y + 50 && myPosition.y > clickedPosition.y - 50;
  },

  laserDone: function laserDone() {
    this.isMoving = true;
    this.laserAttacked = false;
  },

  activateLaser: function activateLaser(activatedByHit) {
    this.isMoving = false;
    this.laserAttacked = true;
    this.activatedByHit = activatedByHit;
  },

  onCollisionEnter: function onCollisionEnter(other, self) {
    // TO-DO heroe para escudo
    this.canvas.getComponent("Game").updateScore(this.points);
    this.activateLaser(true);
  },

  decidedToSpawn: function decidedToSpawn() {
    // TO-DO
    return true;
  },

  rotate: function rotate() {
    var newRotation = this.node.rotation + this.speedRotation;
    if (newRotation > this.maxRotation || newRotation < -this.maxRotation) {
      this.speedRotation *= -1;
    } else if (cc.random0To1() < 0.05) this.speedRotation *= -1;
    this.node.rotation = newRotation;
  },

  goOtherSide: function goOtherSide() {
    var newPosX = this.node.position.x + this.speed;
    this.node.setPositionX(newPosX);
    if (newPosX > this.maxPosX || newPosX < this.minPosX) {
      this.speed *= -1;
      this.isSpawned = false;
    }
    this.rotate();
  },

  // called every frame, uncomment this function to activate update callback
  update: function update(dt) {
    if (this.isMoving && (this.isSpawned || this.decidedToSpawn())) {
      this.goOtherSide();
    }
    if (this.laserAttacked) {
      this.laser.active = true;
      this.UFOLaser.activateLaser(this.activatedByHit);
    }
  }
});

cc._RF.pop();