"use strict";
cc._RF.push(module, '8aa76S1AIhADL3kWayHXvJb', 'Menu');
// script/Menu.js

"use strict";

cc.Class({
  extends: cc.Component,

  properties: {
    audio: {
      default: null,
      type: cc.Node
    }

  },

  // use this for initialization
  onLoad: function onLoad() {
    // TO-DO
    this.audioOn = true;
  },

  launchGame: function launchGame() {
    //   this.showReadme(null, false);
    //      this.currentSceneUrl = 'TestList.fire';
    //    this.isMenu = true;
    cc.director.loadScene('Game', this.onLoadSceneFinish.bind(this));
  },

  launchCredits: function launchCredits() {
    console.log("TO-DO credits");
    //  cc.director.loadScene('Game', this.onLoadSceneFinish.bind(this));
  },

  onAudioToggle: function onAudioToggle() {
    this.audioOn = !this.audioOn;
    var sprite = this.audio.getComponent(cc.Sprite);
    var url = "Sprites/UI/audio" + (this.audioOn ? "On" : "Off");
    cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
      sprite.spriteFrame = spriteFrame;
    });
  },

  onLoadSceneFinish: function onLoadSceneFinish() {},

  // called every frame
  update: function update(dt) {}
});

cc._RF.pop();