var game = new Phaser.Game(400, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var dude;
var platform;
var cursors;
var star;

function preload() {
		game.load.spritesheet('backgrounds', 'assets/backgrounds.png', 231, 69);
		game.load.image('platform', 'assets/platform.png');
		game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
		game.load.image('star', 'assets/star.png');
}

function create() {
		game.physics.startSystem(Phaser.Physics.ARCADE);


		var background = game.add.sprite(0, 0, 'backgrounds');
		background.scale.setTo(9.0, 9.0);

		platform = game.add.group();
		platform.enableBody = true;


		var grounds = platform.create(0, 560, 'platform');
		grounds.scale.setTo(1.0, 1.5);
		grounds.body.immovable = true;

		star = game.add.sprite(10, 0 , 'star');
		game.physics.arcade.enable(star);
		star.body.gravity.y = 1;



		dude = game.add.sprite(10, 510, 'dude');

		game.physics.arcade.enable(dude);

		dude.body.bounce.y = 0;
		dude.body.gravity.y = 300;
		dude.body.collideWorldBounds = true;

		dude.animations.add('left', [0, 1, 2 , 3], 10, true);
		dude.animations.add('right', [5, 6, 7, 8], 10, true);

		cursors = game.input.keyboard.createCursorKeys();
}

function update() {
	game.physics.arcade.collide(dude, platform);
	game.physics.arcade.overlap(dude, star, starJump, null, this);
	if (cursors.left.isDown) {
		dude.body.velocity.x = -150;
		dude.animations.play('left');
	}
	else if (cursors.right.isDown) {
		dude.body.velocity.x = 150;
		dude.animations.play('right');
	}
	else {
		dude.body.velocity.x = 0;
		dude.animations.stop();
		dude.frame = 4;
	}

	if (cursors.up.isDown && dude.body.touching.down) {
		dude.body.velocity.y = -350;
	}
}

function starJump(dude, star) {
	star.kill();
	dude.body.velocity.y = -300;
}