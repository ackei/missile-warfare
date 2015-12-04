var posNum = -1;
var player;
var enemy;

var PLAYER_SPEED = 100;

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

        boundary = game.add.sprite(512,384,'line');
        boundary.anchor.setTo(0.5,0.5);
        boundary.width = 1024;
        boundary.angle = 90;
        game.physics.arcade.enable(boundary);
        boundary.body.immovable = true;

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
                player.body.velocity.x = -PLAYER_SPEED;
            }
            else if (this.cursors.right.isDown){
                player.body.velocity.x = PLAYER_SPEED;
            }
            else if (this.cursors.up.isDown){
                player.body.velocity.y = -PLAYER_SPEED;
            }
            else if (this.cursors.down.isDown){
                player.body.velocity.y = PLAYER_SPEED;
            }
            else {
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
            }

            socket.emit('sendPosition',{x: player.x, y: player.y});
            game.physics.arcade.overlap(player,enemy,function(){
                console.log("Collision detected!");
            },null,this);

            game.physics.arcade.collide(enemy, player);
            game.physics.arcade.collide(enemy, boundary);
            game.physics.arcade.collide(player, boundary);
        }
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }

};
