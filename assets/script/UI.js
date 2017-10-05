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
      this.pressedShoot = false;
      this.pressedLeft = false;
      this.pressedRight = false;
      this.ShooterComponent = this.Shooter.getComponent("Shooter");
      this.HeroComponent = this.Hero.getComponent("Hero");
    },

    update: function (dt) {
      if (this.pressedShoot) this.ShooterComponent.startShooting();
      else this.ShooterComponent.stopShooting();

      if (this.pressedLeft) this.HeroComponent.moveLeft();
      else if (this.pressedRight) this.HeroComponent.moveRight();
      else this.HeroComponent.stopped();
    },


});
