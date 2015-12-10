var posNum = -1;
var player;
var enemy;
var player_projectile_list;
var enemy_projectile_list;


var PLAYER_SPEED = 1000;
var PROJ_DELAY = 300;
var PROJ_SPEED = 600;


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
                player.checkWorldBounds = true;
                player.body.collideWorldBounds = true;

                player_projectile_list = game.add.group();
                player_projectile_list.createMultiple(50, 'red');
                game.physics.enable(player_projectile_list);
                player_projectile_list.setAll("checkWorldBounds", true);
                player_projectile_list.setAll("outOfBoundsKill", true);
                player_projectile_list.setAll("anchor.x", 0.5);
                player_projectile_list.setAll("anchor.y", 0.5);
                player_projectile_list.setAll("scale.x", 0.1);
                player_projectile_list.setAll("scale.y", 0.1);

                enemy = game.add.sprite(800,300,'blue');
                enemy.anchor.setTo(0.5,0.5);
                enemy.scale.setTo(0.2,0.2);
                game.physics.arcade.enable(enemy);
                enemy.visible = false;

                enemy_projectile_list = game.add.group();
                enemy_projectile_list.createMultiple(50, 'blue');
                game.physics.enable(enemy_projectile_list);
                enemy_projectile_list.setAll("checkWorldBounds", true);
                enemy_projectile_list.setAll("outOfBoundsKill", true);
                enemy_projectile_list.setAll("anchor.x", 0.5);
                enemy_projectile_list.setAll("anchor.y", 0.5);
                enemy_projectile_list.setAll("scale.x", 0.1);
                enemy_projectile_list.setAll("scale.y", 0.1);

                posNum = 0;
            }
            else if (pos.num == 1){
                player = game.add.sprite(pos.x, pos.y, 'blue');
                player.anchor.setTo(0.5,0.5);
                player.scale.setTo(0.2,0.2);
                game.physics.arcade.enable(player);
                player.checkWorldBounds = true;
                player.body.collideWorldBounds = true;

                player_projectile_list = game.add.group();
                player_projectile_list.createMultiple(50, 'blue');
                game.physics.enable(player_projectile_list);
                player_projectile_list.setAll("checkWorldBounds", true);
                player_projectile_list.setAll("outOfBoundsKill", true);
                player_projectile_list.setAll("anchor.x", 0.5);
                player_projectile_list.setAll("anchor.y", 0.5);
                player_projectile_list.setAll("scale.x", 0.1);
                player_projectile_list.setAll("scale.y", 0.1);
                PROJ_SPEED = -PROJ_SPEED;

                enemy = game.add.sprite(200,400,'red');
                enemy.anchor.setTo(0.5,0.5);
                enemy.scale.setTo(0.2,0.2);
                game.physics.arcade.enable(enemy);
                enemy.visible = false;

                enemy_projectile_list = game.add.group();
                enemy_projectile_list.createMultiple(50, 'red');
                game.physics.enable(enemy_projectile_list);
                enemy_projectile_list.setAll("checkWorldBounds", true);
                enemy_projectile_list.setAll("outOfBoundsKill", true);
                enemy_projectile_list.setAll("anchor.x", 0.5);
                enemy_projectile_list.setAll("anchor.y", 0.5);
                enemy_projectile_list.setAll("scale.x", 0.1);
                enemy_projectile_list.setAll("scale.y", 0.1);

                posNum = 1;
            }
        });

        boundary = game.add.sprite(512,384,'line');
        boundary.anchor.setTo(0.5,0.5);
        boundary.width = 1024;
        boundary.angle = 90;
        game.physics.arcade.enable(boundary);
        boundary.body.syncBounds = true;
        boundary.body.immovable = true;

        this.cursors = game.input.keyboard.createCursorKeys();

        this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);        
        
        this.gameTime = game.time.now;

        socket.on('updateEnemy',function(pos){
            enemy.visible = true;
            enemy.x = pos.x;
            enemy.y = pos.y;
        });

        socket.on('updateProjectile',function(posNum){
            var proj = enemy_projectile_list.getFirstDead();
            proj.reset(enemy.x, enemy.y);
            proj.body.velocity.x = -PROJ_SPEED;
        });

        socket.on('updateDeadPlayers',function(){
            console.log("Got update dead players");
            enemy.visible = false;
            enemy.body = null;
            enemy.destroy();
        });
    },

    update: function () {

        if (posNum > -1){
            // TODO: For now, we just need to implement player movement. No projectiles yet.
            if (this.cursors.left.isDown && this.cursors.up.isDown){
                player.body.velocity.x = -PLAYER_SPEED/Math.sqrt(2);
                player.body.velocity.y = -PLAYER_SPEED/Math.sqrt(2);
            }
            else if (this.cursors.right.isDown && this.cursors.up.isDown){
                player.body.velocity.x = PLAYER_SPEED/Math.sqrt(2);
                player.body.velocity.y = -PLAYER_SPEED/Math.sqrt(2);
            }
            else if (this.cursors.left.isDown && this.cursors.down.isDown){
                player.body.velocity.x = -PLAYER_SPEED/Math.sqrt(2);
                player.body.velocity.y = PLAYER_SPEED/Math.sqrt(2);
            }
            else if (this.cursors.right.isDown && this.cursors.down.isDown){
                player.body.velocity.x = PLAYER_SPEED/Math.sqrt(2);
                player.body.velocity.y = PLAYER_SPEED/Math.sqrt(2);
            }
            else if (this.cursors.left.isDown){
                player.body.velocity.x = -PLAYER_SPEED;
            }
            else if (this.cursors.right.isDown){
                player.body.velocity.x = PLAYER_SPEED;
            }
            else if (this.cursors.down.isDown){
                player.body.velocity.y = PLAYER_SPEED;
            }
            else if (this.cursors.up.isDown){
                player.body.velocity.y = -PLAYER_SPEED;
            }
            else{
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
            }
            if (this.spaceBar.isDown && (game.time.now > this.gameTime + PROJ_DELAY)) {
                socket.emit('createProjectile',posNum);
                var proj = player_projectile_list.getFirstDead();
                proj.reset(player.x, player.y);
                proj.body.velocity.x = PROJ_SPEED;
                proj.body.syncBounds = true;
                this.gameTime = game.time.now;
            }

            socket.emit('sendPosition',{x: player.x, y: player.y});

            game.physics.arcade.overlap(player,enemy,function(){
                console.log("Collision detected!");
            },null,this);

            game.physics.arcade.collide(enemy, boundary);
            game.physics.arcade.collide(player, boundary);
        }
    },

    missileHit: function(player,projectile){
        posNum = -1;
        player.body = null;
        player.destroy();
        projectile.kill();
        socket.emit('playerKilled');
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }

};
