var posNum = -1;
var player;
var enemy;

var PLAYER_SPEED = 5;

var GameState = {

    create: function () {
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0,0,1024,768);
        
        socket.emit('createPlayerReq');

        socket.on('createPlayerResp', function(pos){
            if (pos.num == 0){
                player = game.add.sprite(pos.x, pos.y, 'red');
                player.anchor.setTo(0.5,0.5);
                player.scale.setTo(0.2,0.2);
                game.physics.arcade.enable(player);
                posNum = 0;

                enemy = game.add.sprite(800,300,'blue');
                enemy.anchor.setTo(0.5,0.5);
                enemy.scale.setTo(0.2,0.2);
                game.physics.arcade.enable(enemy);
                enemy.visible = false;
            }
            else if (pos.num == 1){
                player = game.add.sprite(pos.x, pos.y, 'blue');
                player.anchor.setTo(0.5,0.5);
                player.scale.setTo(0.2,0.2);
                game.physics.arcade.enable(player);
                posNum = 1;

                enemy = game.add.sprite(200,400,'red');
                enemy.anchor.setTo(0.5,0.5);
                enemy.scale.setTo(0.2,0.2);
                game.physics.arcade.enable(enemy);
                enemy.visible = false;
            }
        });

        this.cursors = game.input.keyboard.createCursorKeys();

        socket.on('updateEnemy',function(pos){
            enemy.visible = true;
            enemy.x = pos.x;
            enemy.y = pos.y;
        });

    },

    update: function () {

        if (posNum > -1){
            // TODO: For now, we just need to implement player movement. No projectiles yet.
            if (this.cursors.left.isDown){
                player.x -= PLAYER_SPEED;
            }
            if (this.cursors.right.isDown){
                player.x += PLAYER_SPEED;
            }
            if (this.cursors.up.isDown){
                player.y -= PLAYER_SPEED;
            }
            if (this.cursors.down.isDown){
                player.y += PLAYER_SPEED;
            }
            socket.emit('sendPosition',{x: player.x, y: player.y});
            game.physics.arcade.overlap(player,enemy,function(){
                console.log("Collision detected!");
            },null,this);
            game.physics.arcade.collide(enemy, player);
        }
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }

};
