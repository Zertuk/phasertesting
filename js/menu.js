var menu_state = {
	create: function() {
		mainMusic = game.add.audio('music', 1, true);
		if (!musicOn) {
			mainMusic.play();
			musicOn = true;
		}

		var intro = game.add.image(0, 0, 'intro');
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			space_key.onDown.add(this.start, this);
			
		var style = {font: "20px Arial", fill: "#ffffff"};

		var x = game.world.width/2, y = game.world.height/2;

		var text = this.game.add.text(140, y -50, ' Click to jump.  Press space to play!', style);
		
		if (score > 0) {
		 	var text = this.game.add.text(250, 250, 'Score: ' + score, style);
		 	var playAgain = this.game.add.text(210, 275, 'Press space to play!', style);
		}


	},

	start: function() {
		score = 0;
		scoreToAdd = 10;
		starLoc = 0;
		this.game.time.events.remove(this.timer);

		this.game.state.start('play');

	}
}