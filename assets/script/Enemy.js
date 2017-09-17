cc.Class({
  extends: cc.Component,

  properties: {
    speed : 1
  },

  // use this for initialization
  onLoad: function () {
    cc.director.getCollisionManager().enabled = true;
  },

	init: function (game,position,url,numberEnemies,sideMargin,horizontalEnemyMargin, verticalEnemyMargin) {
    var self = this;
    this.position = position;
    this.numberEnemies = numberEnemies;
    this.sideMargin = sideMargin;
    this.maxPosX = this.node.parent.width/2 - this.sideMargin - ((numberEnemies - position -1) * horizontalEnemyMargin);
    this.minPosX = -this.node.parent.width/2 + this.sideMargin + (position * horizontalEnemyMargin);

    var sprite = this.node.getComponent(cc.Sprite);
    cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
      sprite.spriteFrame = spriteFrame;
      self.position = position;
  		self.game = game;
  		self.enabled = true;
  		self.node.opacity = 255;
    });
	},

  onCollisionEnter: function (other, self) {
    // TO-DO Explosion
    console.log(" HIT ! " + this.position);
    this.node.destroy();
  },


  // called every frame, uncomment this function to activate update callback
  update: function (dt) {
    var newPos = this.node.position.x + this.speed;
    if (newPos > this.maxPosX || newPos < this.minPosX)
    {
      // TO-DO go down
      this.speed *=-1;
      newPos = this.node.position.x + this.speed;
    }
    this.node.setPositionX(newPos);
  },

});
