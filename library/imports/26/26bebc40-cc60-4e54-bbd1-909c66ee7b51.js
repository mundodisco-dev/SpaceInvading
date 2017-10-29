"use strict";
cc._RF.push(module, '26bebxAzGBOVLvRkJxm7ntR', 'EnemyLaser');
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