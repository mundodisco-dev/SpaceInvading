(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Menu.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8aa76S1AIhADL3kWayHXvJb', 'Menu', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Menu.js.map
        