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
        this.canvas = cc.director.getScene().getChildByName('Canvas');
        // this.touchPadShooting();
    },


    startShooting: function (self) {
      this.shooting = true;
    },

    stopShooting: function () {
      this.shooting = false;
    },

    touchPadShooting: function ()
    {
      cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          onTouchBegan: (touch, event) => {
            var touchLoc = touch.getLocation();
            if (this.node.parent.convertToNodeSpaceAR(touchLoc).y > this.shootingPosYThreshold) return true;
            this.shooting = true;
            return true;
          },
          onTouchMoved: (touch, event) => {
            var touchLoc = touch.getLocation();
            if (this.node.parent.convertToNodeSpaceAR(touchLoc).y > this.shootingPosYThreshold)
            {
              this.shooting = false;
              return false;
            }
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
      var laser = cc.instantiate(this.laser);
      var tempPos = this.node.parent.position;
      tempPos.y += 50;
      laser.position = tempPos;
      laser.active = true;
      laser.zIndex = -1;
      this.canvas.addChild(laser);
      return true;
    },

    onDisable: function ()
    {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },

    inTimeRange: function ()
    {
      return ((Date.now() - this.lastShot) > this.waitMssTimePerShot);
    },

    update: function (dt)
    {
      // TO-DO , power up, multidisparo
      // TO-DO , permitir disparar solo tras la muerte del laser previo
      if (this.shooting && this.inTimeRange()) {
        this.lastShot = Date.now();
        this.createLaser();
        this.shooting = false;
      }
    },
});
