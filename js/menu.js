var menu_state = {
	create: function() {
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			space_key.onDown.add(this.start, this);
			
		var style = {font: "20px Arial", fill: "#ffffff"};

		var x = game.world.width/2, y = game.world.height/2;

		var text = this.game.add.text(75, y -50, ' Click to jump & hit yarn.  Press space to play!', style);
		
		if (score > 0) {
		 	var text = this.game.add.text(200, 250, 'Score: ' + score, style);
		 	var playAgain = this.game.add.text(200, 275, 'Press space to play!', style);
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