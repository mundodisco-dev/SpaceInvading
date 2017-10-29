(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/EnemyLaser.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '26bebxAzGBOVLvRkJxm7ntR', 'EnemyLaser', __filename);
// script/EnemyLaser.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 150
    },

    // use this for initialization
    onLoad: function onLoad() {},

    setSpeed: function setSpeed(speed) {
        this.speed = speed;
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        this.node.destroy();
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        this.node.y -= this.speed * dt;
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
        //# sourceMappingURL=EnemyLaser.js.map
        