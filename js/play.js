var play_state = {
	create: function() {
		game.world.setBounds(0, 0, 400, 10000);
		starLoc = game.world.height - 400;


		var sky = game.add.sprite(0, 7500, 'sky');
		sky.scale.setTo(2.0, 125);

		var uppersky = game.add.sprite(0, 4000, 'uppersky');
		uppersky.scale.setTo(2.0, 125);

		var cloud = game.add.sprite(0, 7530, 'cloud');
		cloud.scale.setTo(1.5, 1.0)

		var space = game.add.sprite(0, 100, 'space');
		space.scale.setTo(1.0, 1.0);
		var space2 = game.add.sprite(0, 600, 'space');
		var space3 = game.add.sprite(0, 1100, 'space');
		var space4 = game.add.sprite(0, 1600, 'space');
		var space5 = game.add.sprite(0, 2100, 'space');
		var space6 = game.add.sprite(0, 2600, 'space');
		var space7 = game.add.sprite(0, 3100, 'space');


		var moon = game.add.sprite(0, 0, 'moon');




		platform = game.add.group();
		platform.enableBody = true;


		var grounds = platform.create(0, game.world.height - 50, 'platform');
		grounds.scale.setTo(2.0, 1.6);
		grounds.body.immovable = true;

		stars = game.add.group();
		stars.enableBody = true;
		
		this.timer = this.game.time.events.loop(500, this.addStars, this);
		this.scoreTimer = this.game.time.events.loop(1000, this.scoreWipe, this);

		dude = game.add.sprite(180, game.world.height - 130, 'dude');

		game.physics.arcade.enable(dude);

		dude.body.bounce.y = 0;
		dude.body.gravity.y = 375;
		dude.body.collideWorldBounds = true;
		dude.anchor.setTo(0.5, 1);
		Phaser.Canvas.setSmoothingEnabled(dude, false);
		dude.scale.setTo(1.5, 1.5);

		dude.animations.add('right', [0, 1, 2], 10, true);
		dude.animations.add('left', [0, 1, 2] ,10, true);



		game.camera.follow(dude, 0);


		cursors = game.input.keyboard.createCursorKeys();

		jumpNoise = game.add.audio('noise');

		purrNoise = game.add.audio('purr');

		style = {font : "30px Arial", fill: "#ff0044"}
		scoreText = game.add.text(5, 5, "0", style);
		scoreText.fixedToCamera = true;

		starScore = game.add.text(dude.world.x - 5, dude.world.y - 5, "", style);

	},

	update: function() {
		game.physics.arcade.collide(dude, platform);
		game.physics.arcade.overlap(dude, stars, this.starJump, null, this);
		game.physics.arcade.overlap(stars, platform, this.starDie, null, this);
		this.movePlayer();
		if (game.input.activePointer.isDown) {
			dude.body.velocity.y = -400;
		}
		this.gameOver();
		if (dude.world.y < 150) {
			this.victory();
		}
	},
	addStars: function() {
		var rand = Math.random()*500 + 20;
		var star = stars.create(rand, starLoc, 'star');
		star.scale.setTo(1, 1);
		starLoc = starLoc - 130;
		starCount = starCount + 1;
		star.body.velocity.y = 25;
	},

	starJump: function(dude, star) {
		dude.body.velocity.y = -375;
		starCount = starCount - 1;
		star.kill();
		this.addScore(star);
		this.diamondCheck();
	},

	addScore: function(star) {
		this.scoreWipe();
		this.scoreToAddText(star);
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
	},

	starDie: function(star) {
		star.kill();
		starCount = starCount - 1;
	},

	diamondCheck: function() {
		var rand = Math.floor(Math.random()*30);
		console.log(rand);
		if (rand == 1) {
			var diamond = stars.create(0, dude.world.y - 500, 'diamond');
			diamond.body.velocity.x = 35;
			diamond.scale.x = 1;
			diamond.animations.add('right', [0, 1, 2, 3, 4, 5], 10, true);
			diamond.animations.play('right');
		}
		if (rand === 2) {
			var diamond = stars.create(0, dude.world.y - 500, 'diamond');
			diamond.body.velocity.x = -35;
			diamond.scale.x = -1;
			diamond.animations.add('left', [0, 1, 2, 3], 10, true);
			diamond.animations.play('left');
		}
	},

	starKill: function(star) {
				star.kill();
	},

	scoreToAddText: function(star) {
		if (star.key == 'diamond') {
			starScore = game.add.text(dude.world.x - 5, dude.world.y - 5, "2x!", style);
		}
		else {
			starScore = game.add.text(dude.world.x - 5, dude.world.y - 5, scoreToAdd, style);
		}
	},

	scoreWipe: function() {
		starScore.destroy();
	},

	movePlayer: function() {
		if (game.input.mousePointer.x > dude.x + 25) {
			dude.body.velocity.x = 500;
			dude.scale.x = 1.5;
			dude.animations.play('left')

		}
		else if (game.input.mousePointer.x < dude.x - 25) {
			dude.body.velocity.x = -500;
			dude.scale.x = -1.5;
			dude.animations.play('right')
		}
		else {
			dude.body.velocity.x = 0;
			dude.animations.stop();
		}
	},

	gameOver: function() {
		if (score > 0 && dude.body.touching.down) {
			this.game.state.start('menu');
		}
	},

	victory: function() {
		this.game.state.start('end');
	}
}

