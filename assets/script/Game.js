const Enemy = require("Enemy");

cc.Class({
  extends: cc.Component,

  properties: {
      sideMargin : 60,
      enemyPrefab: {
          default: null,
          type: cc.Prefab
      },
      player: {
          default: null,
          type: cc.Node
      },
  },

  // use this for initialization
  onLoad: function () {
    this.isRunning = false;
    this.node.on('allDead', this.reSpawn, this);
    this.node.on('GameOver', this.onGameOver, this);
    //console.log(Enemy);
    this.onStartGame();
  },


  onStartGame: function () {
    cc.director.getCollisionManager().enabled = true;

      // 初始化计分
      // this.resetScore();
      // set game state to running
      this.isRunning = true;
      this.spawnEnemies();
  },

  onGameOver: function ()
  {
    // TO-DO
    console.log("game over");
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
    var positionY = 80;
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
