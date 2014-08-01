var game = new Phaser.Game(600, 600, Phaser.AUTO, 'game_container', { preload: preload, create: create, update: update });
var dude;
var platform;
var cursors;
var star;
var jumpNoise;
var starLoc;
var style;
var starScore;
var score = 0;
var purrNoise;
var scoreText;
var scoreToAdd = 10;
var starCount = 0;

function preload() {
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
}

function create() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.world.setBounds(0, 0, 400, 10000);
		starLoc = game.world.height - 400;


		var sky = game.add.sprite(0, 7500, 'sky');
		sky.scale.setTo(2.0, 125);

		var uppersky = game.add.sprite(0, 4000, 'uppersky');
		uppersky.scale.setTo(2.0, 125);

		var cloud = game.add.sprite(0, 7530, 'cloud');
		cloud.scale.setTo(1.5, 1.0)

		var space = game.add.sprite(0, 100, 'space');
		space.scale.setTo(2.0, 1.0);

		var moon = game.add.sprite(0, 0, 'moon');




		platform = game.add.group();
		platform.enableBody = true;


		var grounds = platform.create(0, game.world.height - 50, 'platform');
		grounds.scale.setTo(2.0, 1.5);
		grounds.body.immovable = true;

		stars = game.add.group();
		stars.enableBody = true;

		for (var i = 0; i < 200; i++) {
			addStars();
		}
		
		// this.timer = this.game.time.events.loop(750, addStars, this);
		// this.scoreTimer = this.game.time.events.loop(1000, scoreWipe, this);

		dude = game.add.sprite(180, game.world.height - 130, 'dude');

		game.physics.arcade.enable(dude);

		dude.body.bounce.y = 0;
		dude.body.gravity.y = 375;
		dude.body.collideWorldBounds = true;
		dude.anchor.setTo(0.5, 0.5);
		dude.scale.setTo(1.75, 1.75);

		dude.animations.add('right', [0, 1, 2], 10, true);
		dude.animations.add('left', [0, 1, 2] ,10, true);
		// dude.animations.add('right', [5, 6, 7, 8], 10, true);



		game.camera.follow(dude, 0);


		cursors = game.input.keyboard.createCursorKeys();

		jumpNoise = game.add.audio('noise');

		mainMusic = game.add.audio('music');
		mainMusic.play();

		purrNoise = game.add.audio('purr');

		style = {font : "30px Arial", fill: "#ff0044"}
		scoreText = game.add.text(5, 5, "0", style);
		scoreText.fixedToCamera = true;
		
		starScore = game.add.text(dude.world.x - 5, dude.world.y - 5, "", style);

}

function update() {
	game.world.setBounds(0, 0, 400, 10000);
	console.log(dude.world.x)


	game.physics.arcade.collide(dude, platform);
	game.physics.arcade.overlap(dude, stars, starJump, null, this);
	game.physics.arcade.overlap(stars, platform, starDie, null, this);
	movePlayer();
	// if (Phaser.Pointer.clientX > dude.world.x) {
	// 	game.physics.arcade.moveToPointer(dude, 1000);
	// 	dude.animations.play('left');
	// }
	// else if (cursors.right.isDown) {
	// 	dude.body.velocity.x = 150;
	// 	dude.animations.play('right');
	// }
	// else {
	// 	dude.body.velocity.x = 0;
	// 	dude.animations.stop();
	// 	dude.frame = 4;
	// }



	if (cursors.up.isDown) {
		dude.body.velocity.y = -400;
	}
}

function starJump(dude, star) {
	star.kill();

	dude.body.velocity.y = -375;
	starCount = starCount - 1;
	
	addScore(star);
	diamondCheck();
}

function addScore(star) {
	scoreWipe();
	scoreToAddText(star);
	if (star.key == "diamond") {
		score = score*2;
		purrNoise.play();
	}
	else {
		score = score + scoreToAdd;
		scoreToAdd = scoreToAdd + 10;
		jumpNoise.play();
	}
	scoreText.setText(score);

}

function starDie(star) {
	star.kill();
	starCount = starCount - 1;

}

function addStars() {
		var rand = Math.random()*500 + 20;
		var star = stars.create(rand, starLoc, 'star');
		star.scale.setTo(1, 1);
		starLoc = starLoc - 130;
		starCount = starCount + 1;
		star.body.velocity.y = 25;
}


function diamondCheck() {
	var rand = Math.floor(Math.random()*30);
	console.log(rand);
	if (rand == 1) {
		var diamond = stars.create(0, dude.world.y - 500, 'diamond');
		diamond.body.velocity.x = 35;
		diamond.animations.add('right', [0, 1, 2, 3], 10, true);
	}
	if (rand === 2) {
		var diamond = stars.create(400, dude.world.y - 500, 'diamond');
		diamond.body.velocity.x = -35;
		diamond.animations.add('left', [0, 1, 2, 3], 10, true);
	}
	

}

function scoreToAddText(star) {
	if (star.key == 'diamond') {
		starScore = game.add.text(dude.world.x - 5, dude.world.y - 5, "2x!", style);
	}
	else {
		starScore = game.add.text(dude.world.x - 5, dude.world.y - 5, scoreToAdd, style);
	}
}

function scoreWipe() {
	starScore.destroy();

}

function movePlayer() {
	if (game.input.mousePointer.x > dude.x + 25) {
		dude.body.velocity.x = 500;
	}
	else if (game.input.mousePointer.x < dude.x - 25) {
		dude.body.velocity.x = -500;
	}
	else {
		dude.body.velocity.x = 0;
	}

}