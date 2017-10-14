const Enemy = require("Enemy");

cc.Class({
  extends: cc.Component,

  properties: {
      sideMargin : 60,
      enemyPrefab: {
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
    this.node.on('allDead', this.reSpawn, this);
    this.node.on('GameOver', this.onGameOver, this);
    this.node.on('numLifesChanged', this.onNumLifesChanged, this);
    this.HeroComponent = this.hero.getComponent("Hero");
    this.livesA = this.ui.getChildByName('LivesA');
    this.livesB = this.ui.getChildByName('LivesB');
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
    else if (this.HeroComponent.lives < 99)
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

    this.isRunning = true;
    this.spawnEnemies();
  },

  onGameOver: function ()
  {
    // TO-DO
    console.log("game over");
    cc.director.loadScene('Menu');
  },

  reSpawn: function() {
    console.log("reSpawn");
    // TO-DO
    //  aumentar velocidad
    // acercar Y a hero
    this.spawnEnemies();
  },

	spawnEnemies: function() {
    var newEnemy = null;
    var numberEnemies = 5;
    var numberLines = 5;
    var horizontalEnemyMargin = 70;
    var verticalEnemyMargin = 70;
    var positionX = -2 * horizontalEnemyMargin;
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
        newEnemy.setPosition({x:positionX + (i * horizontalEnemyMargin),y:positionY + j * verticalEnemyMargin});
        newEnemy.getComponent('Enemy').init(this,this.EnemyMapPool,i,j,url,numberEnemies,this.sideMargin, horizontalEnemyMargin, verticalEnemyMargin,numberLines);
      }
      this.EnemyMapPool.push(tempEnemyPool);
    }

  },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    },



});
