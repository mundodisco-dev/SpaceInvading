cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
      cc.director.getCollisionManager().enabled = true;
    },

	init: function (game,position,url) {
    var self = this;
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
      console.log(" HIT ! " + this.position);
      this.node.destroy();
    },


    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    },
});
