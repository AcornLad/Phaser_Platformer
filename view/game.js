//https://phaser.io/tutorials/making-your-first-phaser-game/part2


var platforms;
var player;
var score = 0;
var scoreText;



var state = {
    preload: function(){
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //Background
        game.add.sprite(0, 0, 'sky');
        
        //Platforms group contains ground and several ledges
        platforms = game.add.group();
        
        //Enable physics for any object in the "platforms" group
        platforms.enableBody = true;
        
        //Make the ground
        var ground = platforms.create(0, game.world.height - 64, 'ground');
        
        //Scale ground to fit width of the game (original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);
        
        //Stop ground from falling away when I jump (that's pretty Physics'y! Like why holding a chair and jumping off it after a several story drop wouldn't save you)
        ground.body.immovable = true;
        
        //Make two ledges
        var ledge = platforms.create(400, 400, 'ground');
        
        ledge.body.immovable = true;
        
        ledge = platforms.create(-150, 250, 'ground');
        
        ledge.body.immovable = true;
        
        //Populate the stars
        stars = game.add.group();
        stars.enableBody = true;
        
        //Here we'll create 12 of them  evenly spaced apart
        for(var i = 0; i < 12; i++){
            var star = stars.create(i * 70, 0, 'star');
            //Let gravity do things
            star.body.gravity.y = 6;
            //Give each star slightly random bounce values
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
        
        //Add the score text
        scoreText = game.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#000'});
        
        //The player and its properties
        player = game.add.sprite(32, game.world.height - 150, 'dude');
        
        //Enable physics on player
        game.physics.arcade.enable(player);
        
        //Player physics properties. Give him a li'l bounce
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        
        //Our two animations, walking left and right. The 'true' is an answer to some loop? boolean
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        
        //Cursor
        cursors = game.input.keyboard.createCursorKeys();
    },
    update: function(){
        //Collide the player and the stars with the platforms
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        //Collide the stars w/ platform
        var hitStar = game.physics.arcade.collide(stars, platforms);
        //Check if player overlaps with stars
        var starOverlap = game.physics.arcade.overlap(player, stars, collectStar, null, this);
        function collectStar(player, star){
            star.kill();
            //Add and update the score
            score += 10;
            scoreText.text = 'Score: ' + score;
        }
        //Reset player's velocity (movement)
        player.body.velocity.x = 0;
        
        if(cursors.left.isDown){
            //Move left
            player.body.velocity.x = -150;
            player.animations.play('left');
        }
        else if(cursors.right.isDown){
            //Move right
            player.body.velocity.x = 150;
            player.animations.play('right');
        }
        else{
            //Stand still
            player.animations.stop();
            player.frame = 4;
        }
        
        //Allow player to jump if on the ground
        if(cursors.up.isDown && player.body.touching.down && hitPlatform){
            player.body.velocity.y = -200;
        }
    }
}

var game = new Phaser.Game(
    800,
    600,
    Phaser.AUTO,
    'game',
    state
)

