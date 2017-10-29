"use strict";
cc._RF.push(module, 'c7065aos9pCbrfCRr/Le4qs', 'Hero');
// script/Hero.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        canvas: cc.Node,
        speed: 250
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.moveThreshold = 1;
        this.isMoving = false;
        this.direction = 0;
        // screen boundaries
        this.sideMargin = this.canvas.getComponent("Game").sideMargin;
        this.minPosX = -this.node.parent.width / 2 + this.sideMargin;
        this.maxPosX = this.node.parent.width / 2 - this.sideMargin;
        this.currentSideAnimation = 0;
        this.lives = 100;
        // this.setInputControlByTouch();
        // this.setInputControl();
    },

    setInputControlByTouch: function setInputControlByTouch() {
        var self = this;
        this.canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            self.isMoving = true;
            self.moveToPos = this.parent.convertToNodeSpaceAR(touchLoc);
        }, this.node);
        this.canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            self.moveToPos = this.parent.convertToNodeSpaceAR(touchLoc);
        }, this.node);
        this.canvas.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.isMoving = false; // when touch ended, stop moving
        }, this.node);
    },

    setInputControl: function setInputControl() {
        var self = this;
        //add keyboard input listener to jump, turnLeft and turnRight
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            // set a flag when key pressed
            onKeyPressed: function onKeyPressed(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:
                        self.accLeft = true;
                        self.accRight = false;
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        self.accLeft = false;
                        self.accRight = true;
                        break;
                }
            },
            // unset a flag when key released
            onKeyReleased: function onKeyReleased(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:
                        self.accLeft = false;
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        self.accRight = false;
                        break;
                }
            }
        }, self.node);

        // touch input
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function onTouchBegan(touch, event) {
                var touchLoc = touch.getLocation();
                if (touchLoc.x >= cc.winSize.width / 2) {
                    self.accLeft = false;
                    self.accRight = true;
                } else {
                    self.accLeft = true;
                    self.accRight = false;
                }
                // don't capture the event
                return true;
            },
            onTouchEnded: function onTouchEnded(touch, event) {
                self.accLeft = false;
                self.accRight = false;
            }
        }, self.node);
    },

    setSideAnimation: function setSideAnimation(side) {
        if (side == 0) side = '';else if (side > 0) side = 'Right';else side = 'Left';
        var sprite = this.getComponent(cc.Sprite);
        var url = "Sprites/Hero/player" + side;
        cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
            sprite.spriteFrame = spriteFrame;
        });
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        // TO-DO
        this.lives--;
        if (this.lives >= 0) {
            // TO-DO destroy y respawn
            var event = new cc.Event.EventCustom("numLifesChanged", true);
            event.setUserData({ type: -1 });
            this.node.dispatchEvent(event);
        } else {
            var event = new cc.Event.EventCustom("GameOver", true);
            this.node.dispatchEvent(event);
            this.node.destroy();
        }
        // TO-DO colision del UFO te da escudo
    },

    moveLeft: function moveLeft() {
        this.isMoving = true;
        this.direction = { x: -1, y: 0 };
    },

    moveRight: function moveRight() {
        this.isMoving = true;
        this.direction = { x: 1, y: 0 };
    },

    stopped: function stopped() {
        this.isMoving = false;
        this.direction = { x: 0, y: 0 };
    },

    lifeIncrease: function lifeIncrease() {
        var event = new cc.Event.EventCustom("numLifesChanged", true);
        this.lives++;
        event.setUserData({ type: 1 });
        this.node.dispatchEvent(event);
    },
    // called every frame
    update: function update(dt) {
        if (this.lives < 0) return;
        if (!this.isMoving) {
            if (this.currentSideAnimation == 0) return;
            this.currentSideAnimation = 0;
            this.setSideAnimation(0);
            return;
        }
        var oldPos = this.node.position;
        // get move direction
        // var direction = cc.pNormalize(cc.pSub(this.moveToPos, oldPos));
        // console.log(direction);
        // console.log(this.direction);
        // multiply direction with distance to get new position
        var newPos = cc.pAdd(oldPos, cc.pMult(this.direction, this.speed * dt));

        // limit player position inside screen
        if (newPos.x > this.maxPosX) {
            newPos.x = this.maxPosX;
            return;
        } else if (newPos.x < this.minPosX) {
            this.node.x = this.minPosX;
            return;
        }
        if (Math.abs(oldPos.x - newPos.x) > this.moveThreshold) {
            this.setSideAnimation(this.direction.x);
            this.currentSideAnimation = this.direction.x;
            this.node.setPositionX(newPos.x);
        }
    }
});

cc._RF.pop();