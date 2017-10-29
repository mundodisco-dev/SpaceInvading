(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/UFOLaser.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c105e9Xr/hPpaHbMRlXaOUl', 'UFOLaser', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=UFOLaser.js.map
        