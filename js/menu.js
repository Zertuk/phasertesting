var menu_state = {
	create: function() {
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			space_key.onDown.add(this.start, this);
			
		var style = {font: "20px Arial", fill: "#ffffff"};

		var x = game.world.width/2, y = game.world.height/2;


		var text = this.game.add.text(75, y -50, ' Click to jump & hit yarn.  Press space to play!', style);
		
		// if (score > 0) {
		// 	var text = this.game.add.text(75, y -50, 'gg scrub', style);

		// }


	},

	start: function() {
		this.game.state.start('play');
		score = 0;
	}
}