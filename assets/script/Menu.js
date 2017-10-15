cc.Class({
    extends: cc.Component,

    properties: {
      audio: {
          default: null,
          type: cc.Node
      },

    },

    // use this for initialization
    onLoad: function () {
        // TO-DO 
        this.audioOn = true;
    },


	 launchGame: function () {
     //   this.showReadme(null, false);
   //      this.currentSceneUrl = 'TestList.fire';
    //    this.isMenu = true;
        cc.director.loadScene('Game', this.onLoadSceneFinish.bind(this));
    },

    launchCredits: function () {
      console.log("TO-DO credits");
        //  cc.director.loadScene('Game', this.onLoadSceneFinish.bind(this));
     },

     onAudioToggle: function(){
       this.audioOn = !this.audioOn;
       var sprite = this.audio.getComponent(cc.Sprite);
       var url = "Sprites/UI/audio" + (this.audioOn ? "On":"Off");
       cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
         sprite.spriteFrame = spriteFrame;
       });

     },

    onLoadSceneFinish: function () {

    },

    // called every frame
    update: function (dt) {

    },
});
