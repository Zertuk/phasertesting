var end_state = {
	create: function() {

		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
				space_key.onDown.add(this.start, this);

		var style = {font: "20px Arial", fill: "#ffffff"};

		var text = this.game.add.text(200, 250, 'Score: ' + score, style);
		var winText = this.game.add.text(200, 275, 'You Win! Space to play again!', style);

	},

	start: function() {
		score = 0;
		scoreToAdd = 10;
		starLoc = 0;
		this.game.time.events.remove(this.timer);

		this.game.state.start('play');
	}
}