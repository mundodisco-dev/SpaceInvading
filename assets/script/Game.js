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

      this.enemyPool = new cc.NodePool("Enemy");
      //console.log(Enemy);
      this.onStartGame();
    },


    onStartGame: function () {
        // 初始化计分
        // this.resetScore();
        // set game state to running
        this.isRunning = true;
        // set button and gameover text out of screen
//        this.btnNode.setPositionX(3000);
//        this.gameOverNode.active = false;
        // reset player position and move speed
//        this.player.startMoveAt(cc.p(0, this.groundY));
        // spawn star
        this.spawnEnemies();
  },

	spawnEnemies: function(){
    var newEnemy = null;
    var numberEnemies = 5;
    var numberLines = 5;
    var horizontalEnemyMargin = 70;
    var verticalEnemyMargin = 80;
    // console.log(this.enemyPool.size());
    var positionX = -2 * horizontalEnemyMargin;
    var positionY = -100;
    for (var j=1; j<numberLines+1; j++)
    {
      var url = "Sprites/Enemy/enemyBlue"+j;
      for (var i=0; i<numberEnemies; i++)
      {
        newEnemy = cc.instantiate(this.enemyPrefab);
        this.node.addChild(newEnemy);
        newEnemy.setPosition({x:positionX + (i * horizontalEnemyMargin),y:positionY + j * verticalEnemyMargin});
        newEnemy.getComponent('Enemy').init(this,i,url,numberEnemies,this.sideMargin, horizontalEnemyMargin, verticalEnemyMargin);
      }
    }

  },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    },



});
