(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Enemy.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1f009VQR7hIYohoY8NWoY7o', 'Enemy', __filename);
// script/Enemy.js

'use strict';

cc.Class({
  extends: cc.Component,

  properties: {
    enemyLaser: {
      default: null,
      type: cc.Node
    },
    speedX: 1,
    speedY: 1,
    downStep: 10
  },

  // use this for initialization
  onLoad: function onLoad() {
    var nodeCN = this.node.parent;
    nodeCN.on('reEvaluateMargins', this.reCalculateMargin, this);
    nodeCN.on('enemyDown', this.enemyDown, this);

    this.canvas = cc.director.getScene().getChildByName('Canvas');
    this.game = this.canvas.getComponent("Game");
    this.lastShot = Date.now();
    this.waitMssTimePerShot = 4000;
    this.resetNumberTimesAllowedReachFinal();
  },

  init: function init(game, enemyPool, positionX, positionY, url, numberEnemies, sideMargin, horizontalEnemyMargin, verticalEnemyMargin, numberLines) {
    var self = this;
    // TO-DO levels
    // TO-DO refactor
    this.speedXIncrease = 0.04;
    this.baseIncreaseShootingByLevel = 0.0002;
    this.baseShooting = 0.01;
    this.increaseShooting = 0;
    this.goingDown = false;
    this.enemyPool = enemyPool;
    this.positionX = positionX;
    this.positionY = positionY;
    this.numberEnemies = numberEnemies;
    this.numberAliveEnemies = numberEnemies * numberLines;
    this.sideMargin = sideMargin;
    this.horizontalEnemyMargin = horizontalEnemyMargin;
    this.verticalEnemyMargin = verticalEnemyMargin;
    this.maxPosX = this.node.parent.width / 2 - this.sideMargin - (numberEnemies - positionX - 1) * horizontalEnemyMargin;
    this.minPosX = -this.node.parent.width / 2 + this.sideMargin + positionX * horizontalEnemyMargin;
    // TO-DO
    this.minPosY = -250 + verticalEnemyMargin * positionY;
    this.points = 10 + 10 * positionY;

    var sprite = this.node.getComponent(cc.Sprite);
    cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
      sprite.spriteFrame = spriteFrame;
      self.positionX = positionX;
      self.positionY = positionY;
      self.game = game;
      self.enabled = true;
      self.node.opacity = 255;
    });
  },

  resetNumberTimesAllowedReachFinal: function resetNumberTimesAllowedReachFinal(e) {
    this.numberTimesAllowedReachFinal = 6;
  },

  reCalculateMargin: function reCalculateMargin(e) {
    var type = e.getUserData();
    switch (type) {
      case "left":
        this.reEvaluateLeftMargin();
        break;
      case "right":
        this.reEvaluateRightMargin();
        break;
      case "bottom":
        this.reEvaluateBottomMargin();
        break;
    }
  },

  reEvaluateLeftMargin: function reEvaluateLeftMargin(e) {
    var leftMost = 0;
    for (var i = 1; i < this.enemyPool[0].length; i++) {
      for (var j = 0; j < this.enemyPool.length; j++) {
        if (this.enemyPool[j][i] == 1) {
          leftMost = i;
          break;
        }
      }
      if (leftMost != 0) {
        break;
      }
    }
    this.minPosX = -this.node.parent.width / 2 + this.sideMargin + (this.positionX - leftMost) * this.horizontalEnemyMargin;
  },
  reEvaluateRightMargin: function reEvaluateRightMargin(e) {
    var rightMost = this.enemyPool[0].length;
    for (var i = this.enemyPool[0].length - 2; i > -1; i--) {
      for (var j = 0; j < this.enemyPool.length; j++) {
        if (this.enemyPool[j][i] == 1) {
          rightMost = i;
          break;
        }
      }
      if (rightMost != this.enemyPool[0].length) {
        break;
      }
    }
    this.maxPosX = this.node.parent.width / 2 - this.sideMargin - (rightMost - this.positionX) * this.horizontalEnemyMargin;
  },
  reEvaluateBottomMargin: function reEvaluateBottomMargin(e) {
    var currentLevelY = 0;
    for (var j = 0; j < this.positionY; j++) {
      for (var i = 0; i < this.enemyPool[j].length; i++) {
        if (this.enemyPool[j][i] == 1) {
          currentLevelY++;
          break;
        }
      }
    }
    this.minPosY = -250 + this.verticalEnemyMargin * currentLevelY;
  },

  isLeftMost: function isLeftMost(x, y) {
    var leftMost = true;
    for (var j = 0; j < this.enemyPool.length; j++) {
      for (var i = 0; i < x + 1; i++) {
        leftMost = leftMost && !this.enemyPool[j][i];
      }
    }
    return leftMost;
  },

  isRightMost: function isRightMost(x, y) {
    var rightMost = true;
    for (var j = this.enemyPool.length - 1; j > -1; j--) {
      for (var i = this.enemyPool[y].length - 1; i > x - 1; i--) {
        rightMost = rightMost && !this.enemyPool[j][i];
      }
    }
    return rightMost;
  },
  isLastBottom: function isLastBottom(x, y) {
    var bottom = true;
    for (var j = 0; j < y + 1; j++) {
      for (var i = 0; i < this.enemyPool[j].length; i++) {
        bottom = bottom && !this.enemyPool[j][i];
      }
    }
    return bottom;
  },

  allDead: function allDead() {
    var allDead = true;
    for (var j = 0; j < this.enemyPool.length; j++) {
      for (var i = 0; i < this.enemyPool[j].length; i++) {
        allDead = allDead && !this.enemyPool[j][i];
        if (!allDead) return false;
      }
    }
    return allDead;
  },

  onCollisionEnter: function onCollisionEnter(other, self) {
    // TO-DO Explosion
    // console.log(" HIT ! " + this.positionX + ","+this.positionY);
    var event = new cc.Event.EventCustom("enemyDown", true);
    this.node.dispatchEvent(event);

    this.enemyPool[this.positionY][this.positionX] = 0;
    if (this.isLeftMost(this.positionX, this.positionY)) {
      var event = new cc.Event.EventCustom("reEvaluateMargins", true);
      event.setUserData("left");
      this.node.dispatchEvent(event);
    }
    if (this.isRightMost(this.positionX, this.positionY)) {
      var event = new cc.Event.EventCustom("reEvaluateMargins", true);
      event.setUserData("right");
      this.node.dispatchEvent(event);
    }
    if (this.isLastBottom(this.positionX, this.positionY)) {

      this.resetNumberTimesAllowedReachFinal();
      var event = new cc.Event.EventCustom("reEvaluateMargins", true);
      event.setUserData("bottom");
      this.node.dispatchEvent(event);
    }

    this.game.enemyDown({ "type": "standard", "points": this.points });
    var nodeCN = this.node.parent;
    nodeCN.targetOff(this.node);
    // nodeCN.off('reEvaluateMargins', this.reCalculateMargin, this);
    // nodeCN.off('enemyDown', this.enemyDown, this);
    this.node.destroy();
  },

  enemyDown: function enemyDown() {
    this.numberAliveEnemies -= 1;
  },

  createLaser: function createLaser() {
    var laser = cc.instantiate(this.enemyLaser);
    var tempPos = this.node.position;
    tempPos.y -= 50;
    laser.position = tempPos;
    laser.active = true;
    laser.zIndex = 1;
    laser.getComponent("EnemyLaser").setSpeed(150);
    this.canvas.addChild(laser);
    return true;
  },

  decidedToShoot: function decidedToShoot() {
    if (Date.now() - this.lastShot > this.waitMssTimePerShot) {
      return cc.random0To1() < (this.baseShooting + this.increaseShooting) / this.numberAliveEnemies;
    }
  },

  update: function update(dt) {
    // TO-DO randomize
    if (this.decidedToShoot()) {
      this.createLaser(150);
      this.lastShot = Date.now();
    }

    if (this.goingDown) {
      var newPosY = this.node.position.y - this.speedY;

      /// TO-DO , si llega varias veces a este tope vertical, retirarlo y game over
      //(newPosY > this.minPosY)

      if ((this.numberTimesAllowedReachFinal != 0 || newPosY > this.minPosY) && this.goingDownStart - newPosY < this.downStep) {
        this.node.setPositionY(newPosY);
      } else {
        if (newPosY <= this.minPosY) {
          this.numberTimesAllowedReachFinal--;
        }
        this.goingDown = false;
      }
    } else {
      var newPosX = this.node.position.x + this.speedX;
      // TO-DO si speed es demasiado grande no se mueve -> setear el máximo
      if (newPosX > this.maxPosX || newPosX < this.minPosX) {
        this.increaseShooting += this.baseIncreaseShootingByLevel;

        this.goingDown = true;
        this.goingDownStart = this.node.position.y;
        if (this.speedX > 0) this.speedX += this.speedXIncrease;else this.speedX -= this.speedXIncrease;
        this.speedX *= -1;
      } else {
        this.node.setPositionX(newPosX);
      }
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
        //# sourceMappingURL=Enemy.js.map
        