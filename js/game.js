var game = new Phaser.Game(600, 600, Phaser.AUTO, 'game_container');
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
var musicOn = false;
var scoreToAdd = 10;
var starCount = 0;


game.state.add('load', load_state);
game.state.add('menu', menu_state);
game.state.add('play', play_state);
game.state.add('end', end_state);

game.state.start('load');
