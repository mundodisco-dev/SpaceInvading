"use strict";
cc._RF.push(module, '771a5ftLYlICYxixpe4odxs', 'Laser');
// script/Laser.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 600
    },

    // use this for initialization
    onLoad: function onLoad() {},

    onCollisionEnter: function onCollisionEnter(other, self) {
        this.node.destroy();
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        this.node.y += this.speed * dt;
    }
});

cc._RF.pop();