//https://phaser.io/tutorials/making-your-first-phaser-game/part2

var platforms;
var player;

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
    },
    update: function(){
        //Collide the player and the stars with the platforms
        var hitPlatform = game.physics.arcade.collide(player, platforms);
    }
}

var game = new Phaser.Game(
    800,
    600,
    Phaser.AUTO,
    'game',
    state
)