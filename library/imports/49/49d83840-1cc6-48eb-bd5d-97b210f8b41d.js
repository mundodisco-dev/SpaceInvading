"use strict";
cc._RF.push(module, '49d83hAHMZI671dl7IQ+LQd', 'Shooter');
// script/Shooter.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        shootingPosYThreshold: 100,
        waitMssTimePerShot: 900,
        laser: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.shooting = false;
        this.lastShot = Date.now();
        this.canvas = cc.director.getScene().getChildByName('Canvas');
        // this.touchPadShooting();
    },

    startShooting: function startShooting(self) {
        this.shooting = true;
    },

    stopShooting: function stopShooting() {
        this.shooting = false;
    },

    touchPadShooting: function touchPadShooting() {
        var _this = this;

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function onTouchBegan(touch, event) {
                var touchLoc = touch.getLocation();
                if (_this.node.parent.convertToNodeSpaceAR(touchLoc).y > _this.shootingPosYThreshold) return true;
                _this.shooting = true;
                return true;
            },
            onTouchMoved: function onTouchMoved(touch, event) {
                var touchLoc = touch.getLocation();
                if (_this.node.parent.convertToNodeSpaceAR(touchLoc).y > _this.shootingPosYThreshold) {
                    _this.shooting = false;
                    return false;
                }
                _this.shooting = true;
                return true;
            },
            onTouchEnded: function onTouchEnded(touch, event) {
                _this.shooting = false;
            }
        }, this.node);
    },

    createLaser: function createLaser() {
        var laser = cc.instantiate(this.laser);
        var tempPos = this.node.parent.position;
        tempPos.y += 50;
        laser.position = tempPos;
        laser.active = true;
        laser.zIndex = -1;
        this.canvas.addChild(laser);
        return true;
    },

    onDisable: function onDisable() {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },

    inTimeRange: function inTimeRange() {
        return Date.now() - this.lastShot > this.waitMssTimePerShot;
    },

    update: function update(dt) {
        // TO-DO , power up, multidisparo
        // TO-DO , permitir disparar solo tras la muerte del laser previo
        if (this.shooting && this.inTimeRange()) {
            this.lastShot = Date.now();
            this.createLaser();
            this.shooting = false;
        }
    }
});

cc._RF.pop();