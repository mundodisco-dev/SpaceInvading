cc.Class({
  extends: cc.Component,

  properties: {
    speed : 1
  },

  // use this for initialization
  onLoad: function () {
    cc.director.getCollisionManager().enabled = true;
    var nodeCN = this.node.parent;
    nodeCN.on('reEvaluateMargins', this.reCalculateMargin, this);
  },

	init: function (game,enemyPool,positionX,positionY,url,numberEnemies,sideMargin,horizontalEnemyMargin, verticalEnemyMargin) {
    var self = this;
    this.enemyPool = enemyPool;
    this.positionX = positionX;
    this.positionY = positionY;
    this.numberEnemies = numberEnemies;
    this.sideMargin = sideMargin;
    this.horizontalEnemyMargin = horizontalEnemyMargin;
    this.maxPosX = this.node.parent.width/2 - this.sideMargin - ((numberEnemies - positionX -1) * horizontalEnemyMargin);
    this.minPosX = -this.node.parent.width/2 + this.sideMargin + (positionX * horizontalEnemyMargin);

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

  reCalculateMargin: function(e)
  {
    var type = e.getUserData();
    switch (type){
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

  reEvaluateLeftMargin: function(e)
  {
    var leftMost = 0;
    for (var i=1; i<this.enemyPool[0].length; i++)
    {
      for (var j=0; j<this.enemyPool.length; j++)
      {
        if (this.enemyPool[j][i] == 1)
        {
          leftMost = i;
          break;
        }
      }
      if (leftMost != 0)
      {
        break;
      }
    }
    this.minPosX = -this.node.parent.width/2 + this.sideMargin + ((this.positionX - leftMost) * this.horizontalEnemyMargin);

  },
  reEvaluateRightMargin: function(e)
  {
    var rightMost = this.enemyPool[0].length;
    for (var i=this.enemyPool[0].length-2; i>-1; i--)
    {
      for (var j=0; j<this.enemyPool.length; j++)
      {
        if (this.enemyPool[j][i] == 1)
        {
          rightMost = i;
          break;
        }
      }
      if (rightMost != this.enemyPool[0].length)
      {
        break;
      }
    }
    this.maxPosX = this.node.parent.width/2 - this.sideMargin - (rightMost - this.positionX ) * this.horizontalEnemyMargin;

  },
  reEvaluateBottomMargin: function(e)
  {
    console.log("-");
    // TO-DO
    // console.log(this.enemyPool);
    // console.log(" reCalculateMargin " + this.positionX + ","+this.positionY);
  },

  isLeftMost: function(x,y){
    var leftMost = true;
    for (var j=0; j<this.enemyPool.length; j++)
    {
      for (var i=0; i<x+1; i++)
      {
        leftMost = leftMost && !this.enemyPool[j][i];
      }
    }
    return leftMost;
  },

  isRightMost: function(x,y){
    var rightMost = true;
    for (var j=this.enemyPool.length -1; j>-1; j--)
    {
      for (var i=this.enemyPool[y].length-1; i>x-1; i--)
      {
        rightMost = rightMost && !this.enemyPool[j][i];
      }
    }
    return rightMost;
  },
  isLastBottom: function(x,y){
    var bottom = true;
    for (var j=0; j<y+1; j++)
    {
      for (var i=0; i<this.enemyPool[j].length; i++)
      {
        bottom = bottom && !this.enemyPool[j][i];
      }
    }
      return bottom;
  },

  onCollisionEnter: function (other, self) {
    // TO-DO Explosion
    console.log(" HIT ! " + this.positionX + ","+this.positionY);

    this.enemyPool[this.positionY][this.positionX] = 0;
    if (this.isLeftMost(this.positionX,this.positionY))
    {
      var event = new cc.Event.EventCustom("reEvaluateMargins", true);
      event.setUserData("left");
      this.node.dispatchEvent(event);
    }
    if (this.isRightMost(this.positionX,this.positionY))
    {
      var event = new cc.Event.EventCustom("reEvaluateMargins", true);
      event.setUserData("right");
      this.node.dispatchEvent(event);
    }
    // if (this.isLastBottom(this.positionX,this.positionY))
    // {
    //   var event = new cc.Event.EventCustom("reEvaluateMargins", true);
    //   event.setUserData("bottom");
    //   this.node.dispatchEvent(event);
    // }
    // TO-DO
    //   this.enemyPool es todo 0 , reSpawn , con y más bajo y más velocidad
    this.node.destroy();
  },


  // called every frame, uncomment this function to activate update callback
  update: function (dt) {

    var newPos = this.node.position.x + this.speed;
    if (newPos > this.maxPosX || newPos < this.minPosX)
    {
      // console.log(this.sideMargin);
      // TO-DO go down
      this.speed *=-1;
      newPos = this.node.position.x + this.speed;
    }
    this.node.setPositionX(newPos);
  },

});
