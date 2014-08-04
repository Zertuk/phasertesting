var load_state = {
	preload: function() {
		game.load.image('sky', 'assets/sky.png');
		game.load.image('cloud', 'assets/cloud.png');
		game.load.image('uppersky', 'assets/highsky.png');
		game.load.image('space', 'assets/space2.png');
		game.load.image('moon', 'assets/moon.png');
		game.load.image('platform', 'assets/platform.png');
		game.load.spritesheet('dude', 'assets/cat4.png', 32, 32);
		game.load.image('star', 'assets/yarn 3.png');
		game.load.audio('noise', 'assets/noise.wav');
		game.load.spritesheet('diamond', 'assets/bird2.png', 32, 32);
		game.load.audio('music', 'assets/copycat.mp3');
		game.load.audio('purr', 'assets/purr.wav');
		game.load.image('intro', 'assets/intro.png');
		game.load.image('win', 'assets/win.png');
		game.load.spritesheet('spacebird', 'assets/spacebird.png');
	},

	create: function() {
		mainMusic = game.add.audio('music', 1, true);
		this.game.state.start('menu');

	}
}