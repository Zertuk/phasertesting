var game = new Phaser.Game(400, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var dude;
var platform;
var cursors;
var star;
var starLoc;
var starCount = 0;
function preload() {
		game.load.spritesheet('backgrounds', 'assets/backgrounds.png', 231, 69);
		game.load.image('platform', 'assets/platform.png');
		game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
		game.load.image('star', 'assets/star.png');
		game.load.audio('noise', 'noise.wav');
}

function create() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.world.setBounds(0, 0, 400, 10000);
		starLoc = game.world.height - 150;



		platform = game.add.group();
		platform.enableBody = true;


		var grounds = platform.create(0, game.world.height - 50, 'platform');
		grounds.scale.setTo(1.0, 1.5);
		grounds.body.immovable = true;

		stars = game.add.group();
		stars.enableBody = true;


		for (var i = 0; i < 9; i++)
		{
		addStars();
		}

		this.timer = this.game.time.events.loop(500, addStars, this);




		dude = game.add.sprite(180, game.world.height - 100, 'dude');

		game.physics.arcade.enable(dude);

		dude.body.bounce.y = 0;
		dude.body.gravity.y = 300;
		dude.body.collideWorldBounds = true;

		dude.animations.add('left', [0, 1, 2 , 3], 10, true);
		dude.animations.add('right', [5, 6, 7, 8], 10, true);

		game.camera.follow(dude, 0);


		cursors = game.input.keyboard.createCursorKeys();
}

function update() {

	game.physics.arcade.collide(dude, platform);
	game.physics.arcade.overlap(dude, stars, starJump, null, this);
	game.physics.arcade.overlap(stars, platform, starDie, null, this);
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
		dude.body.velocity.y = -300;
	}
}

function starJump(dude, star) {
	star.kill();
	dude.body.velocity.y = -300;
	starCount = starCount - 1;
}

function starDie(star) {
	star.kill();
	starCount = starCount - 1;

}

function addStars() {
	if (starCount < 50) {
		var rand = Math.random()*300;
		var star = stars.create(rand, starLoc, 'star');
		starLoc = starLoc - 100;
		starCount = starCount + 1;
		game.physics.arcade.enable(star);
		star.body.velocity.y = 25;
	}
}