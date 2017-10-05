cc.Class({
    extends: cc.Component,

    properties: {
      Shooter: {
          default: null,
          type: cc.Node
      },
      Hero: {
          default: null,
          type: cc.Node
      }
    },

    // use this for initialization
    onLoad: function () {
      this.pressedLeft = false;
      this.pressedRight = false;
      this.pressedShoot = false;
      this.Shooter = this.Shooter.getComponent("Shooter");
      this.Hero = this.Hero.getComponent("player");
    },

    update: function (dt) {
      if (this.pressedShoot) this.Shooter.startShooting()
      else this.Shooter.stopShooting();
    },


});
