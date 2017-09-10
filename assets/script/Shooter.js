cc.Class({
    extends: cc.Component,

    properties: {
        shootingPosYThreshold: 100,
        waitMssTimePerShot: 900,
        laser: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.shooting = false;
        this.lastShot = Date.now();
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            // swallowTouches: true,
            onTouchBegan: (touch, event) => {
              var touchLoc = touch.getLocation();
              if (this.node.parent.convertToNodeSpaceAR(touchLoc).y > this.shootingPosYThreshold) return true;
              // this.createLaser(touch);
              this.shooting = true;
              return true;
            },
            onTouchMoved: (touch, event) => {
              console.log("move");
              var touchLoc = touch.getLocation();
              if (this.node.parent.convertToNodeSpaceAR(touchLoc).y > this.shootingPosYThreshold)
              {
                this.shooting = false;
                return false;
              }
              // this.createLaser(touch);
              this.shooting = true;
              return true;
            },
            onTouchEnded: (touch, event) => {
              this.shooting = false;
            }
        }, this.node);

    },

    createLaser: function ()
    {
      // var touchLoc = touch.getLocation();
      // if (this.node.parent.convertToNodeSpaceAR(touchLoc).y > this.shootingPosYThreshold) return true;
      var laser = cc.instantiate(this.laser);
      laser.position = {x:0,y:70};
      laser.active = true;
      laser.zIndex = -1;
      this.node.parent.addChild(laser);
      return true;
    },

    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },

    inTimeRange: function () {
      return (Date.now() -  this.lastShot > this.waitMssTimePerShot)
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
      if (this.shooting && this.inTimeRange()) {
        this.lastShot = Date.now();
        this.createLaser();
      }
    },
});
