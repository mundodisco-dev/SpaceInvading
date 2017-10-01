cc.Class({
    extends: cc.Component,

    properties: {
        // label: {
        //     default: null,
        //     type: cc.Label
        // },
        // // defaults, set visually when attaching this script to the Canvas
        // text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        // this.label.string = this.text;
    },

	
	 lauchGame: function () {
     //   this.showReadme(null, false);
   //      this.currentSceneUrl = 'TestList.fire';
    //    this.isMenu = true;
        cc.director.loadScene('Game', this.onLoadSceneFinish.bind(this));
    },
	
	
    onLoadSceneFinish: function () {
	
    },	
	
    // called every frame
    update: function (dt) {

    },
});
