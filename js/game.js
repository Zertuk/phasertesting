var game = new Phaser.Game(400, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var dude;
var platform;
var cursors;
var star;
var jumpNoise;
var starLoc;
var style;
var starScore;
var score = 0;
var scoreText;
var scoreToAdd = 10;
var starCount = 0;

function preload() {
		game.load.spritesheet('backgrounds', 'assets/backgrounds.png', 231, 69);
		game.load.image('platform', 'assets/platform.png');
		game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
		game.load.image('star', 'assets/star.png');
		game.load.audio('noise', 'assets/noise.wav');
		game.load.image('diamond', 'assets/diamond.png');
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
		this.scoreTimer = this.game.time.events.loop(1000, scoreWipe, this);

		dude = game.add.sprite(180, game.world.height - 100, 'dude');

		game.physics.arcade.enable(dude);

		dude.body.bounce.y = 0;
		dude.body.gravity.y = 400;
		dude.body.collideWorldBounds = true;

		dude.animations.add('left', [0, 1, 2 , 3], 10, true);
		dude.animations.add('right', [5, 6, 7, 8], 10, true);

		game.camera.follow(dude, 0);


		cursors = game.input.keyboard.createCursorKeys();

		jumpNoise = game.add.audio('noise');

		style = {font : "30px Arial", fill: "#ff0044"}
		scoreText = game.add.text(5, 5, "0", style);
		scoreText.fixedToCamera = true;
		
		starScore = game.add.text(dude.world.x - 5, dude.world.y - 5, "", style);





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

	dude.body.velocity.y = -350;
	starCount = starCount - 1;
	jumpNoise.play();
	
	addScore(star);
	diamondCheck();
}

function addScore(star) {
	scoreWipe();
	scoreToAddText(star);
	if (star.key == "diamond") {
		score = score*2;
	}
	else {
		score = score + scoreToAdd;
		scoreToAdd = scoreToAdd + 10;
	}
	scoreText.setText(score);

}

function starDie(star) {
	star.kill();
	starCount = starCount - 1;

}

function addStars() {
	if (starCount < 50) {
		var rand = Math.random()*300;
		var star = stars.create(rand, starLoc, 'star');
		starLoc = starLoc - 75;
		starCount = starCount + 1;
		game.physics.arcade.enable(star);
		star.body.velocity.y = 40;
	}
}

function diamondCheck() {
	var rand = Math.floor(Math.random()*20);
	console.log(rand);
	if (rand == 1) {
		var diamond = stars.create(0, dude.world.y - 500, 'diamond');
		diamond.body.velocity.x = 30;
	}
	if (rand === 2) {
		var diamond = stars.create(400, dude.world.y - 500, 'diamond');
		diamond.body.velocity.x = -30;
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