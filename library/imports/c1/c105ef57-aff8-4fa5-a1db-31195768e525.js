"use strict";
cc._RF.push(module, 'c105e9Xr/hPpaHbMRlXaOUl', 'UFOLaser');
// script/UFOLaser.js

"use strict";

cc.Class({
  extends: cc.Component,

  properties: {
    isActive: false
  },

  // use this for initialization
  onLoad: function onLoad() {
    this.originalHeight = this.node.height;
    this.originalPositionY = this.node.position.y;
  },

  restoreInitialValues: function restoreInitialValues() {
    this.node.height = this.originalHeight;
    this.node.setPositionY(this.originalPositionY);
    this.node.active = false;
  },

  activateLaser: function activateLaser(activatedByHit) {
    this.isActive = true;
    this.activatedByHit = activatedByHit;
  },

  shoot: function shoot() {
    this.node.height += 20;
    this.node.setPositionY(this.node.position.y - 20);
  },

  onCollisionEnter: function onCollisionEnter(other, self) {
    if (!this.activatedByHit || this.activatedByHit && other.node.name == "Wall") {
      this.restoreInitialValues();
      var event = new cc.Event.EventCustom("laserDone", true);
      this.node.dispatchEvent(event);
      this.isActive = false;
    }
  },

  update: function update() {
    if (this.isActive) {
      this.shoot();
    }
  }

});

cc._RF.pop();