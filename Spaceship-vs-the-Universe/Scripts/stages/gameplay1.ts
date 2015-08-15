﻿ /// <reference path="../constants.ts" />

/// <reference path="../objects/gameobject.ts" />

/// <reference path="../objects/points.ts" />
/// <reference path="../objects/ocean.ts" />
/// <reference path="../objects/hero.ts" />
/// <reference path="../objects/rocks.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../objects/label.ts" />





module states {

    export class GamePlay1 {
        // Game Objects 
        public game: createjs.Container;
        public scoreboard: objects.ScoreBoard;
        public hero: objects.Hero;
        public points: objects.Points;
        //public bullet: objects.Bullet[] = [];
        public extraScore: objects.ExtraScore;
        public rockss: objects.Rocks[] = [];
        public stage1: objects.Stage1;
        public flagBullet: boolean = false;
        public flagShield: boolean = false;
        public flagRepeat: number;
        public timer: number;
        public explosions: Explosion[] = [];
        public explosionImg: HTMLImageElement;

      
        constructor() {
            // Instantiate Game Container
            this.game = new createjs.Container();

            this.flagRepeat = 0;
            

            //Stage1 background object
            this.stage1 = new objects.Stage1();
            this.game.addChild(this.stage1);

            //Island object
            this.points = new objects.Points();
            this.game.addChild(this.points);


            //extraScore object
            this.extraScore = new objects.ExtraScore();
            this.game.addChild(this.extraScore);

            //Hero object
            this.hero = new objects.Hero();
            this.game.addChild(this.hero);

          
            //Cloud object
            for (var rocks = 2; rocks >= 0; rocks--) {
                this.rockss[rocks] = new objects.Rocks();
                this.game.addChild(this.rockss[rocks]);
            }
            
            // Instantiate Scoreboard
            this.scoreboard = new objects.ScoreBoard(this.game, 0, 3);

            this.explosionImg = <HTMLImageElement> assetLoader.getResult('explosionOriginal');
            //this.shieldImg = <HTMLImageElement> assetLoader.getResult('shieldSpriteSheet');

            // Add Game Container to Stage
            stage.addChild(this.game);

            this.assignControls();
        } // Constructor


        // DISTANCE CHECKING METHOD
        public distance(p1: createjs.Point, p2: createjs.Point): number {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        } //Distance Method

        // CHECK COLLISION METHOD
        public checkCollision(collider: objects.GameObject) {
            if (this.scoreboard.active) {
                var heroPosition: createjs.Point = new createjs.Point(this.hero.x, this.hero.y);

                var objectPosition: createjs.Point = new createjs.Point(collider.x, collider.y);
                var theDistance = this.distance(heroPosition, objectPosition);
                if (theDistance < ((this.hero.height * 0.5) + (collider.height * 0.5))) {
                    if (collider.isColliding != true) {

                        if (collider.name == "rocks") {
                            if (flagPower)
                                flagPower = false;
                            else {
                                createjs.Sound.play(collider.sound);
                                this.scoreboard.lives--;
                                
                                //show explosion
                                //alert("");
                                
                                var explosion = new Explosion(this.explosionImg);
                                explosion.x = this.hero.x;
                                explosion.y = this.hero.y;
                                this.hero.reset();
     
                                //alert(explosion.x);
                                this.explosions.push(explosion);
                                this.game.addChild(explosion);
                            }
                        }

                        if (collider.name == "points") {
                            createjs.Sound.play(collider.sound);
                            this.scoreboard.score += 100;
                            this.points.visible = false;

                        }

                        if (collider.name == "extraScore") {
                            //this.scoreboard.lives++;
                            createjs.Sound.play(collider.sound);
                            flagPower = true;
                            this.extraScore.visible = false;

                        }
                    }
                    collider.isColliding = true;
                } else {
                    collider.isColliding = false;
                }
            }
        } // checkCollision Method




        // CHECK COLLISION WITH ENEMY METHOD
        public checkCollisionWithEnemy(collider: objects.GameObject) {
            if (this.scoreboard.active) {
                for (var rocks = 2; rocks >= 0; rocks--) {
                    var rocksPosition: createjs.Point = new createjs.Point(this.rockss[rocks].x, this.rockss[rocks].y);

                    var objectPosition: createjs.Point = new createjs.Point(collider.x, collider.y);
                    var theDistance = this.distance(rocksPosition, objectPosition);
                    if (theDistance < ((this.rockss[rocks].height * 0.5) + (collider.height * 0.5))) {
                        if (collider.isColliding != true) {
                            createjs.Sound.play(collider.sound);
                            //Write code here for collossion of rocket with enemy.
                        }
                        collider.isColliding = true;
                    } else {
                        collider.isColliding = false;
                    }
                }
            }
        } // checkCollisionWithEnemy Method



        public update() {

            this.stage1.update();

            this.points.update();
            //alert("y" +this.plane.y);
            //this.bullet.update(this.plane.x,this.plane.y);

            this.extraScore.update();

            if (flagNewHero)
                this.hero.updateNewHero();
            else
                this.hero.update(controls);
            
            //this.shield.x = this.plane.x;
            //this.shield.y = this.plane.y;

            for (var rocks = 2; rocks >= 0; rocks--) {
                this.rockss[rocks].update();

                this.checkCollision(this.rockss[rocks]);
            }

            for (var i = 0; i < this.explosions.length; i++) {
                var explosion = this.explosions[i];
                if (explosion.currentAnimationFrame == explosion.LastFrame) {
                    this.removeElement(explosion, this.explosions);
                }
            }

            //if (this.shield.currentAnimationFrame == this.shield.LastFrame) {
            //    this.removeShield(this.shield);
            //}

            this.checkCollision(this.points);
            this.checkCollision(this.extraScore);


            this.scoreboard.update();
            

            //stage 1 complete
            if (flagStage1) {
                createjs.Sound.stop();
                currentScore = this.scoreboard.score;
                lives = this.scoreboard.lives;
                if (currentScore > highScore) {
                    highScore = currentScore;
                }
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.GAME_PLAY_1_OVER;
                stateChanged = true;
            }

            if (this.scoreboard.lives < 1) {
                this.scoreboard.active = false;
                createjs.Sound.stop();
                currentScore = this.scoreboard.score;
                if (currentScore > highScore) {
                    highScore = currentScore;
                }
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.GAME_OVER_STATE;
                stateChanged = true;
            }

            stage.update(); // Refreshes our stage
        
        } // Update Method

        private removeElement(el: any, arr: any[]) {
            this.game.removeChild(el);
            var index = arr.indexOf(el);
            arr.splice(index, 1);
        }

        private removeShield(el: any) {
            this.game.removeChild(el);
        }

        assignControls() {
            // Binds key actions
            window.onkeydown = this.onControlDown;
            window.onkeyup = this.onControlUp;
        }

        public onControlDown(e) {
            // Basic switch statement to set
            // our controls to true onKeyDown
            switch (e.which) {
                case keys.LEFT:
                case keys.A:
                    controls.left = true;
                    controls.lTally++;
                    controls.rTally = 0;
                    break;
                case keys.RIGHT:
                case keys.D:
                    controls.right = true;
                    controls.rTally++;
                    controls.lTally = 0;
                    break;

                case keys.UP:
                case keys.W:
                    controls.up = true;
                    controls.rTally++;
                    controls.lTally = 0;
                    break;

                case keys.DOWN:
                case keys.S:
                    controls.down = true;
                    controls.rTally++;
                    controls.lTally = 0;
                    break;
                case keys.SPACEBAR:

                    controls.spacebar = true;
                    controls.rTally++;
                    controls.lTally = 0;

                    break;

            }
        }

        public timeLoop() {
            
            //alert(this.flagRepeat);
            this.flagRepeat++;
            alert(this.flagRepeat);
            if (this.flagRepeat == 1) {
                alert(this.flagRepeat);
                clearInterval(this.timer);
                this.flagRepeat = 0;
            }


        }

        onControlUp(e) {
            // Basic switch statement to set
            // our controls to true onKeyUp
            switch (e.which) {
                case keys.LEFT:
                case keys.A:
                    controls.left = false;
                    break;
                case keys.RIGHT:
                case keys.D:
                    controls.right = false;
                    break;
                case keys.W:
                case keys.UP:
                    controls.up = false;
                    break;
                case keys.S:
                case keys.DOWN:
                    controls.down = false;
                    break;
                case keys.SPACEBAR:
                    controls.spacebar = false;
                    this.flagRepeat = 0;
                    break;
            }
        }

    } // GamePlay Class


} // States Module