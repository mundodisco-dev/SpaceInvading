"use strict";
cc._RF.push(module, '53ea7rsrthMMJqP8LQjk9Jd', 'Game');
// script/Game.js

'use strict';

var Enemy = require("Enemy");

cc.Class({
  extends: cc.Component,

  properties: {
    sideMargin: 60,
    enemyPrefab: {
      default: null,
      type: cc.Prefab
    },
    runnerPrefab: {
      default: null,
      type: cc.Prefab
    },
    hero: {
      default: null,
      type: cc.Node
    },
    ui: {
      default: null,
      type: cc.Node
    },
    scoreDisplay: {
      default: null,
      type: cc.Label
    }
  },

  // use this for initialization
  onLoad: function onLoad() {
    this.isRunning = false;
    this.isSpawningRunners = false;
    this.node.on('GameOver', this.onGameOver, this);
    this.node.on('numLifesChanged', this.onNumLifesChanged, this);
    this.HeroComponent = this.hero.getComponent("Hero");
    this.livesA = this.ui.getChildByName('LivesA');
    this.livesB = this.ui.getChildByName('LivesB');
    this.horizontalEnemyMargin = 70;
    this.verticalEnemyMargin = 70;

    this.onStartGame();
  },

  loadSprite: function loadSprite(sprite, url) {
    cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
      sprite.spriteFrame = spriteFrame;
    });
  },

  onNumLifesChanged: function onNumLifesChanged(event) {
    var data = event.getUserData();
    if (data.type && data.type == -1) {
      // TO-DO pausar juego , respawn hero
    }
    if (this.HeroComponent.lives < 10) {
      this.loadSprite(this.livesA.getComponent(cc.Sprite), "Sprites/UI/numeral" + this.HeroComponent.lives);
      if (this.livesB.activeInHierarchy) this.livesB.active = false;
    } else if (this.HeroComponent.lives < 100) {
      this.loadSprite(this.livesA.getComponent(cc.Sprite), "Sprites/UI/numeral" + Math.trunc(this.HeroComponent.lives / 10));
      this.loadSprite(this.livesB.getComponent(cc.Sprite), "Sprites/UI/numeral" + this.HeroComponent.lives % 10);
      if (!this.livesB.activeInHierarchy) this.livesB.active = true;
    }
  },

  onStartGame: function onStartGame() {
    cc.director.getCollisionManager().enabled = true;
    // cc.director.getCollisionManager().enabledDebugDraw  = true;
    this.resetScore();
    this.currentLevel = 1;
    this.checkSpawnNextLevel = false;
    this.isRunning = true;

    // this.initiateRunners();
    this.spawnStandardEnemies();
  },

  resetScore: function resetScore() {
    this.score = 0;
    this.updateScoreUI();
  },

  updateScore: function updateScore(points) {
    this.score += points;
    this.updateScoreUI();
  },

  updateScoreUI: function updateScoreUI() {
    var score = this.score + "";
    while (score.length < 8) {
      score = "0" + score;
    }this.scoreDisplay.string = score;
  },

  nextLevel: function nextLevel() {
    this.currentLevel++;
    console.log("current Level " + this.currentLevel);
    // TO-DO
    // this.spawnStandardEnemies();
    this.initiateRunners();
  },

  enemyDown: function enemyDown(infoEnemy) {
    if (infoEnemy && infoEnemy.points) {
      this.updateScore(infoEnemy.points);
    }
    this.numberAliveEnemies--;
  },

  spawnStandardEnemies: function spawnStandardEnemies() {
    var newEnemy = null;
    var positionX = -2 * this.horizontalEnemyMargin;
    // TO-DO Levels
    var numberEnemies = 2;
    var numberLines = 2;
    var positionY = 0;
    this.EnemyMapPool = [];
    for (var j = 0; j < numberLines + 0; j++) {
      var url = "Sprites/Enemy/enemyBlue" + (j + 1);
      var tempEnemyPool = [];
      for (var i = 0; i < numberEnemies; i++) {
        tempEnemyPool.push(1);
        newEnemy = cc.instantiate(this.enemyPrefab);
        this.node.addChild(newEnemy);
        newEnemy.setPosition({ x: positionX + i * this.horizontalEnemyMargin, y: positionY + j * this.verticalEnemyMargin });
        newEnemy.getComponent('Enemy').init(this, this.EnemyMapPool, i, j, url, numberEnemies, this.sideMargin, this.horizontalEnemyMargin, this.verticalEnemyMargin, numberLines);
      }
      this.EnemyMapPool.push(tempEnemyPool);
    }
    this.numberAliveEnemies = numberLines * numberLines;
    this.checkSpawnNextLevel = true;
  },

  initiateRunners: function initiateRunners() {
    this.isSpawningRunners = true;
    this.spawnedRunners = 0;
    this.numberRunners = 2;
    this.runnerMarginPosY = 70;
    this.lastRunnerSpawned = null;
    this.mssBetweenRunners = 2250;
  },

  spawnRunners: function spawnRunners() {
    this.lastRunnerSpawned = Date.now();
    // TO-DO levels on runners
    this.createRunner(1);
    this.createRunner(-1);
    this.spawnedRunners += 2;
    this.numberAliveEnemies += 2;
    if (this.spawnedRunners >= this.numberRunners) {
      this.checkSpawnNextLevel = true;
    }
  },

  createRunner: function createRunner(direction) {
    var newRunner = cc.instantiate(this.runnerPrefab);
    this.node.addChild(newRunner);
    newRunner.getComponent("EnemyRunner").init(direction, this.runnerMarginPosY * this.spawnedRunners / 2, 500 * this.spawnedRunners / 2);
    newRunner.setPosition({ x: 569 * direction, y: 292 });
  },

  checkToSpawnRunners: function checkToSpawnRunners() {
    if (this.isSpawningRunners && Date.now() - this.lastRunnerSpawned > this.mssBetweenRunners && this.spawnedRunners < this.numberRunners) {
      this.spawnRunners();
    }
  },

  checkForNextLevel: function checkForNextLevel() {
    if (this.checkSpawnNextLevel && this.numberAliveEnemies == 0) {
      this.checkSpawnNextLevel = false;
      this.nextLevel();
    }
  },

  onGameOver: function onGameOver() {
    // TO-DO
    console.log("game over");
    cc.director.loadScene('Menu');
  },

  // called every frame, uncomment this function to activate update callback
  update: function update(dt) {
    this.checkForNextLevel();
    this.checkToSpawnRunners();
  }

});

cc._RF.pop();