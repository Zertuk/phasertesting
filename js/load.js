var load_state = {
	preload: function() {
		game.load.image('sky', 'assets/sky.png');
		game.load.image('cloud', 'assets/cloud.png');
		game.load.image('uppersky', 'assets/highsky.png');
		game.load.image('space', 'assets/space.png');
		game.load.image('moon', 'assets/moon.png');
		game.load.image('platform', 'assets/platform.png');
		game.load.spritesheet('dude', 'assets/space cat 2.0.png', 32, 32);
		game.load.spritesheet('cat', 'assets.cat2,png', 32, 32);
		game.load.image('star', 'assets/yarn.png');
		game.load.audio('noise', 'assets/noise.wav');
		game.load.spritesheet('diamond', 'assets/bird.png', 32, 32);
		game.load.audio('music', 'assets/copycat.mp3');
		game.load.audio('purr', 'assets/purr.wav');
	},

	create: function() {
		this.game.state.start('menu');
	}
}