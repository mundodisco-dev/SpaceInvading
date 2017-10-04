cc.Class({
    extends: cc.Component,

    properties: {
      isActive : false,
    },

    // use this for initialization
    onLoad: function () {
      this.originalHeight = this.node.height;
      this.originalPositionY = this.node.position.y;
    },

    restoreInitialValues: function (){
      this.node.height = this.originalHeight;
      this.node.setPositionY(this.originalPositionY);
      this.node.active = false;
    },

    activateLaser: function (activatedByHit){
      this.isActive = true;
      this.activatedByHit = activatedByHit;
    },

    shoot: function (){
      this.node.height += 20;
      this.node.setPositionY(this.node.position.y - 20);
    },


    onCollisionEnter: function (other, self) {
      if (!this.activatedByHit || this.activatedByHit && other.node.name == "Wall")
      {
        this.restoreInitialValues();
        var event = new cc.Event.EventCustom("laserDone", true);
        this.node.dispatchEvent(event);
        this.isActive = false;
      }
    },


    update: function (){
      if (this.isActive) {
        this.shoot();
      }
    },

});
