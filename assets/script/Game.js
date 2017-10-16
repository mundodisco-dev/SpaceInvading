const Enemy = require("Enemy");

cc.Class({
  extends: cc.Component,

  properties: {
      sideMargin : 60,
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
  },

  // use this for initialization
  onLoad: function () {
    this.isRunning = false;
    this.isSpawningRunners = false;
    this.node.on('allStandardDead', this.nextLevel, this);
    this.node.on('GameOver', this.onGameOver, this);
    this.node.on('numLifesChanged', this.onNumLifesChanged, this);
    this.HeroComponent = this.hero.getComponent("Hero");
    this.livesA = this.ui.getChildByName('LivesA');
    this.livesB = this.ui.getChildByName('LivesB');

    this.horizontalEnemyMargin = 70;
    this.verticalEnemyMargin = 70;

    this.onStartGame();
  },

  loadSprite: function(sprite,url)
  {
    cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
      sprite.spriteFrame = spriteFrame;
    });
  },

  onNumLifesChanged: function (event)  {
    var data = event.getUserData();
    if (data.type && data.type == -1)
    {
      // TO-DO pausar juego , respawn hero
    }
    if (this.HeroComponent.lives < 10)
    {
      this.loadSprite(this.livesA.getComponent(cc.Sprite),"Sprites/UI/numeral"+this.HeroComponent.lives);
      if (this.livesB.activeInHierarchy) this.livesB.active = false;
    }
    else if (this.HeroComponent.lives < 100)
    {
      this.loadSprite(this.livesA.getComponent(cc.Sprite),"Sprites/UI/numeral"+ Math.trunc(this.HeroComponent.lives / 10));
      this.loadSprite(this.livesB.getComponent(cc.Sprite),"Sprites/UI/numeral"+(this.HeroComponent.lives % 10));
      if (!this.livesB.activeInHierarchy) this.livesB.active = true;
    }

  },

  onStartGame: function () {
    cc.director.getCollisionManager().enabled = true;
    // cc.director.getCollisionManager().enabledDebugDraw  = true;
    // this.resetScore();
    this.currentLevel = 1;
    this.isRunning = true;

    // this.initiateRunners();
    this.spawnStandardEnemies();
  },

  nextLevel: function() {
    console.log("nextLevel");
    this.currentLevel++;
    // TO-DO
    //  aumentar velocidad
    // acercar Y a hero
    // this.spawnStandardEnemies();
    this.initiateRunners();
  },

	spawnStandardEnemies: function() {
    var newEnemy = null;
    var numberEnemies = 5;
    var numberLines = 5;
    var positionX = -2 * this.horizontalEnemyMargin;
    // TO-DO Levels
    var positionY = 0;
    this.EnemyMapPool = [];
    for (var j=0; j<numberLines+0; j++)
    {
      var url = "Sprites/Enemy/enemyBlue"+(j+1);
      var tempEnemyPool = [];
      for (var i=0; i<numberEnemies; i++)
      {
        tempEnemyPool.push(1);
        newEnemy = cc.instantiate(this.enemyPrefab);
        this.node.addChild(newEnemy);
        newEnemy.setPosition({x:positionX + (i * this.horizontalEnemyMargin),y:positionY + j * this.verticalEnemyMargin});
        newEnemy.getComponent('Enemy').init(this,this.EnemyMapPool,i,j,url,numberEnemies,this.sideMargin, this.horizontalEnemyMargin, this.verticalEnemyMargin,numberLines);
      }
      this.EnemyMapPool.push(tempEnemyPool);
    }

  },


  initiateRunners: function()
  {
    this.isSpawningRunners = true;
    this.runnersSpawned = 0;
    this.runnersNumberLimit = 10;
    this.runnerMarginPosY = 70;
    this.lastRunnerSpawned = null;
    this.mssBetweenRunners = 2250;
  },

  spawnRunners: function()
  {
    this.lastRunnerSpawned = Date.now();
    this.createRunner(1);
    this.createRunner(-1);
    this.runnersSpawned += 2;
  },

  createRunner: function(direction)
  {
    var newRunner = cc.instantiate(this.runnerPrefab);
    this.node.addChild(newRunner);
    newRunner.getComponent("EnemyRunner").init(direction, this.runnerMarginPosY * this.runnersSpawned/2 , 500 * this.runnersSpawned/2);
    newRunner.setPosition({x:569*direction,y:292});
  },

  onGameOver: function ()
  {
    // TO-DO
    console.log("game over");
    cc.director.loadScene('Menu');
  },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
      if (this.isSpawningRunners && ((Date.now() - this.lastRunnerSpawned) > this.mssBetweenRunners) && this.runnersSpawned < this.runnersNumberLimit)
      {
          this.spawnRunners();
      }
    },



});
