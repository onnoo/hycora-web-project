// Create our 'main' state that will contain the game

var gameStarted = false;
var gameRestarted = false;
var mainState = {
  preload: function () {
    // This function will be executed at the beginning
    // That's where we load the images and sounds

    game.load.image("bird", "assets/bird.png");
    game.load.image("pipe", "assets/pipe.png");
  },

  game_start: function () {
    if (!gameStarted) {
      this.bird.body.gravity.y = 1000;
      this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
      this.label_start.text = "";
    }
    gameStarted = true;
  },

  create: function () {
    // This function is called after the preload function
    // Here we set up the game, display sprites, etc.

    game.forceSingleUpdate = true;

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    // Change the background color of the game to blue
    game.stage.backgroundColor = "#71c5cf";

    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Display the bird at the position x=100 and y=245
    this.bird = game.add.sprite(100, 245, "bird");

    // Add physics to the bird
    // Needed for: movements, gravity, collisions, etc.
    game.physics.arcade.enable(this.bird);

    // Add gravity to the bird to make it fall
    // this.bird.body.gravity.y = 1000;

    // Call the 'jump' function when the spacekey is hit
    game.input.onDown.removeAll();
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);
    this.game.input.onDown.add(this.jump, this);

    // Create an empty group
    this.pipes = game.add.group();

    // this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

    this.score = 0;
    this.labelScore = game.add.text(20, 20, "0", {
      font: "30px Arial",
      fill: "#ffffff",
    });

    this.label_start = game.add.text(200, 200, "Click to start", {
      font: "20px Arial",
      fill: "#fff",
    });
    this.label_start.anchor.setTo(0.5, 0.5);

    if (gameRestarted) {
      this.game_start();
    } else {
      this.game.input.onDown.add(this.game_start, this);
      spaceKey.onDown.add(this.game_start, this);
    }
  },

  update: function () {
    // This function is called 60 times per second
    // It contains the game's logic

    // If the bird is out of the screen (too high or too low)
    // Call the 'restartGame' function
    if (this.bird.y < 0 || this.bird.y > 490) this.restart_game();

    game.physics.arcade.overlap(
      this.bird,
      this.pipes,
      this.restart_game,
      null,
      this
    );
  },

  // Restart the game
  restart_game: function () {
    // Start the 'main' state, which restarts the game
    this.game.time.events.remove(this.timer);
    // this.game.state.start('main');
    this.game.input.onDown.removeAll();
    this.game.input.onDown.add(this.start_game, this);
    this.label_start.text = "Click to restart";
    game.paused = true;
    gameStarted = false;
    spaceKey.onDown.removeAll();
  },

  start_game: function () {
    game.paused = false;
    gameRestarted = true;
    this.game.state.start('main');
  },

  // Make the bird jump
  jump: function () {
    // Add a vertical velocity to the bird
    this.bird.body.velocity.y = -350;
  },

  // Restart the game
  restartGame: function () {
    // Start the 'main' state, which restarts the game
    game.state.start("main");
  },

  addOnePipe: function (x, y) {
    // Create a pipe at the position x and y
    var pipe = game.add.sprite(x, y, "pipe");

    // Add the pipe to our previously created group
    this.pipes.add(pipe);

    // Enable physics on the pipe
    game.physics.arcade.enable(pipe);

    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = -200;

    // Automatically kill the pipe when it's no longer visible
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  },

  addRowOfPipes: function () {
    // Randomly pick a number between 1 and 5
    // This will be the hole position
    var hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes
    // With one big hole at position 'hole' and 'hole + 1'
    for (var i = 0; i < 8; i++)
      if (i != hole && i != hole + 1) this.addOnePipe(400, i * 60 + 10);

    this.score += 1;
    this.labelScore.text = this.score;
  },
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490, Phaser.CANVAS);

// Add the 'mainState' and call it 'main'
game.state.add("main", mainState);

// Start the state to actually start the game
game.state.start("main");
