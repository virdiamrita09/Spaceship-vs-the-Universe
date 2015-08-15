 
/// <reference path="../constants.ts" />
/// <reference path="../objects/gameobject.ts" />

/// <reference path="../objects/points.ts" />
/// <reference path="../objects/ocean.ts" />
/// <reference path="../objects/hero.ts" />
/// <reference path="../objects/rocks.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../objects/lable.ts" />





module states {

    export class GamePlay3 {
        // Game Objects 
        public game: createjs.Container;
        public scoreboard: objects.ScoreBoard;
        public hero: objects.Hero;
        public enemyPlane1: objects.EnemyPlane1;
        public enemyPlane2: objects.EnemyPlane2;
        public enemyBoss: objects.EnemyBoss;
        public points: objects.Points;
        public rocket: objects.Rocket[] = [];
        public enemyRocket: objects.EnemyRocket[] = [];
        public extraScore: objects.ExtraScore;
        public rockss: objects.Rocks[] = [];
        public stage3: objects.Stage3;
        public flagRocket: boolean = false; //used to set delay between 2 rockets
        public shield: boolean = false;
        public flagRepeat: number;
        public timer: number;
        public explosions: Explosion[] = [];

        public explosionImg: HTMLImageElement;
        public bossHitCount: number;

        constructor() {
            // Instantiate Game Container
            this.game = new createjs.Container();
            this.bossHitCount = 5;
            this.flagRepeat = 0;
            //flagNewPlane = true;
            
            //Stage3 background
            this.stage3 = new objects.Stage3();
            this.game.addChild(this.stage3);

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
            
            //Enemy plane 1 object
            this.enemyPlane1 = new objects.EnemyPlane1();
            this.game.addChild(this.enemyPlane1);

            //Enemy plane 2 object
            this.enemyPlane2 = new objects.EnemyPlane2();
            this.game.addChild(this.enemyPlane2);

            this.enemyBoss = new objects.EnemyBoss();
            this.game.addChild(this.enemyBoss);

            // Instantiate Scoreboard
            this.scoreboard = new objects.ScoreBoard(this.game, currentScore, lives);

            this.explosionImg = <HTMLImageElement> assetLoader.getResult('explosionOriginal');
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
                            createjs.Sound.play(collider.sound);
                            flagPower = true;
                            this.extraScore.visible = false;

                        }

                        if (collider.name == "enemyPlane1" && this.enemyPlane1.visible) {
                            if (flagPower)
                                flagPower = false;
                            else {
                                createjs.Sound.play(collider.sound);
                                //show explosion
                            
                                this.scoreboard.lives--;
                                var explosion = new Explosion(this.explosionImg);
                                explosion.x = this.hero.x;
                                explosion.y = this.hero.y;
                                this.enemyPlane1.visible = false;
                                this.hero.reset();

                                this.explosions.push(explosion);
                                this.game.addChild(explosion);
                            }
                        }

                        if (collider.name == "enemyPlane2" && this.enemyPlane2.visible) {
                            if (flagPower)
                                flagPower = false;
                            else {
                                //show explosion
                                createjs.Sound.play(collider.sound);
                                this.scoreboard.lives--;
                                var explosion = new Explosion(this.explosionImg);
                                explosion.x = this.hero.x;
                                explosion.y = this.hero.y;
                                this.enemyPlane2.visible = false;
                                this.hero.reset();

                                this.explosions.push(explosion);
                                this.game.addChild(explosion);
                            }
                        }
                    }
                    collider.isColliding = true;
                } else {
                    collider.isColliding = false;
                }
            }
        } // checkCollision Method




        // CHECK COLLISION OF ROCKET WITH ENEMY PLANE METHOD
        public checkRocketCollisionWithEnemyPlane(collider: objects.GameObject) {
            if (this.scoreboard.active) {
                for (var tmpRocket = 0; tmpRocket < this.rocket.length; tmpRocket++) {
                    if (collider.visible) {
                        var rocketFire: createjs.Point = new createjs.Point(this.rocket[tmpRocket].x, this.rocket[tmpRocket].y);

                        var objectPosition: createjs.Point = new createjs.Point(collider.x, collider.y);
                        var theDistance = this.distance(rocketFire, objectPosition);
                        if (theDistance < ((this.rocket[tmpRocket].height * 0.5) + (collider.height * 0.5))) {
                            if (collider.isColliding != true) {
                                createjs.Sound.play(collider.sound);
                                this.scoreboard.score += 200;
                                //Write code here for collossion of rocket with enemy.
                                collider.visible = false;
                                var explosion = new Explosion(this.explosionImg);
                                explosion.x = this.rocket[tmpRocket].x;
                                explosion.y = this.rocket[tmpRocket].y - 20;
                                this.game.removeChild(this.rocket[tmpRocket]);
                                //var index = this.rocket.indexOf(thtmpRocket);
                                this.rocket.splice(tmpRocket, 1);

                                
                                //alert(explosion.x);
                                this.explosions.push(explosion);
                                this.game.addChild(explosion);

                            }
                            collider.isColliding = true;
                        } else {
                            collider.isColliding = false;
                        }
                    }
                }
            }

        } // checkCollision of rocket With Enemy plane Method




        // CHECK COLLISION OF ROCKET WITH ENEMY BOSS METHOD
        public checkRocketCollisionWithEnemyBoss(collider: objects.GameObject) {
            if (this.scoreboard.active) {
                for (var tmpRocket = 0; tmpRocket < this.rocket.length; tmpRocket++) {
                    if (collider.visible) {
                        var rocketFire: createjs.Point = new createjs.Point(this.rocket[tmpRocket].x, this.rocket[tmpRocket].y);

                        var objectPosition: createjs.Point = new createjs.Point(collider.x, collider.y);
                        var theDistance = this.distance(rocketFire, objectPosition);
                        if (theDistance < ((this.rocket[tmpRocket].height * 0.5) + (collider.height * 0.5))) {
                            if (collider.isColliding != true) {
                                createjs.Sound.play(collider.sound);
                                this.scoreboard.score += 200;

                                this.bossHitCount--;

                                var explosion = new Explosion(this.explosionImg);
                                explosion.x = this.rocket[tmpRocket].x;
                                explosion.y = this.rocket[tmpRocket].y - 20;
                                this.game.removeChild(this.rocket[tmpRocket]);
                                //var index = this.rocket.indexOf(thtmpRocket);
                                this.rocket.splice(tmpRocket, 1);

                                
                                //alert(explosion.x);
                                this.explosions.push(explosion);
                                this.game.addChild(explosion);



                            }
                            collider.isColliding = true;
                        } else {
                            collider.isColliding = false;
                        }
                    }
                }
            }

        } // checkCollision of rocket With Enemy plane Method




        // CHECK PLANE COLLISION OF WITH ENEMY ROCKET METHOD
        public checkPlaneCollisionWithEnemyRocket() {
            if (this.scoreboard.active) {
                for (var tmpRocket = 0; tmpRocket < this.enemyRocket.length; tmpRocket++) {
                    //if (this.plane.visible) {
                    var rocketFire: createjs.Point = new createjs.Point(this.enemyRocket[tmpRocket].x, this.enemyRocket[tmpRocket].y);

                    var objectPosition: createjs.Point = new createjs.Point(this.hero.x, this.hero.y);
                    var theDistance = this.distance(rocketFire, objectPosition);
                    if (theDistance < ((this.enemyRocket[tmpRocket].height * 0.5) + (this.hero.height * 0.5))) {
                        if (this.enemyRocket[tmpRocket].isColliding != true) {
                            if (flagPower)
                                flagPower = false;
                            else {
                                //show explosion
                                createjs.Sound.play(this.enemyRocket[tmpRocket].sound);
                                this.scoreboard.lives--;
                                var explosion = new Explosion(this.explosionImg);
                                explosion.x = this.hero.x;
                                explosion.y = this.hero.y;
                                //this.enemyPlane2.visible = false;
                                    

                                this.game.removeChild(this.enemyRocket[tmpRocket]);

                                this.enemyRocket.splice(tmpRocket, 1);
                                this.hero.reset();
                                this.explosions.push(explosion);
                                this.game.addChild(explosion);
                            }
                        }
                        this.enemyRocket[tmpRocket].isColliding = true;
                    } else {
                        this.enemyRocket[tmpRocket].isColliding = false;
                    }
                    //}
                }
            }
        } // checkCollisionWithEnemy Method



        public update() {
            //stage 3 loop finish show boss and remove astroids and enemy planes
            
            if (flagStage3) {
                this.game.removeChild(this.enemyPlane1);
                this.game.removeChild(this.enemyPlane2);
                this.points.update();

                this.extraScore.update();

                if (flagNewHero)
                    this.hero.updateNewHero();
                else
                    this.hero.update(controls);

                if (controls.spacebar == true) {
                    if (this.flagRepeat == 0) {

                        this.rocket.push(new objects.Rocket(this.hero.x, this.hero.y));
                        this.game.addChild(this.rocket[this.rocket.length - 1]);
                        this.flagRocket = true;

                        this.flagRepeat = 1;
                    }
                    else if (this.flagRepeat > 30) {
                        this.flagRepeat = 0;
                    }
                    else
                        this.flagRepeat++;
                }

                if (controls.spacebar == false && this.flagRepeat < 30) {
                    this.flagRepeat++;
                }


                if (this.flagRocket) {
                    for (var i = 0; i < this.rocket.length; i++) {
                        this.rocket[i].update();
                        //this.checkCollisionWithEnemy(this.rocket[i]);
                    }
                }

                for (var rocks = 2; rocks >= 0; rocks--) {
                    this.rockss[rocks].update();
                    this.checkCollision(this.rockss[rocks]);
                }


                this.checkCollision(this.points);
                this.checkCollision(this.extraScore);
                //show enemy boss
                
                
                this.enemyBoss.update();

                if (this.enemyBoss.visible) {
                    var x = Math.floor((Math.random() * 20) + 1);
                    if (x == 1) {
                        this.enemyRocket.push(new objects.EnemyRocket(this.enemyBoss.x, this.enemyBoss.y));
                        this.game.addChild(this.enemyRocket[this.enemyRocket.length - 1]);

                    }
                }

                for (var i = 0; i < this.enemyRocket.length; i++) {
                    this.enemyRocket[i].update();
                    //this.checkCollision(this.enemyRocket[i]);
                }

                this.checkRocketCollisionWithEnemyBoss(this.enemyBoss);
                this.scoreboard.update();

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

                if (this.bossHitCount == 0) {
                    this.scoreboard.active = false;
                    createjs.Sound.stop();
                    currentScore = this.scoreboard.score;
                    if (currentScore > highScore) {
                        highScore = currentScore;
                    }
                    this.game.removeAllChildren();
                    stage.removeChild(this.game);
                    currentState = constants.GAME_PLAY_3_OVER;
                    stateChanged = true;
                }

                this.checkPlaneCollisionWithEnemyRocket();

                stage.update();

            }
            else {


                this.stage3.update();

                this.points.update();
                //alert("y" +this.plane.y);
                //this.bullet.update(this.plane.x,this.plane.y);

                this.extraScore.update();

                if (flagNewHero)
                    this.hero.updateNewHero();
                else
                    this.hero.update(controls);
            
                //spacebar firing start
                
                if (controls.spacebar == true) {
                    if (this.flagRepeat == 0) {

                        this.rocket.push(new objects.Rocket(this.hero.x, this.hero.y));
                        this.game.addChild(this.rocket[this.rocket.length - 1]);
                        this.flagRocket = true;

                        this.flagRepeat = 1;
                    }
                    else if (this.flagRepeat > 30) {
                        this.flagRepeat = 0;
                    }
                    else
                        this.flagRepeat++;
                }

                if (controls.spacebar == false && this.flagRepeat < 30) {
                    this.flagRepeat++;
                }


                if (this.flagRocket) {
                    for (var i = 0; i < this.rocket.length; i++) {
                        this.rocket[i].update();
                        //this.checkCollisionWithEnemy(this.rocket[i]);
                    }
                }


                //enemy rocket firing at random number
                var x = Math.floor((Math.random() * 100) + 1);
                if (this.enemyPlane2.visible) {

                    if (x == 1) {
                        this.enemyRocket.push(new objects.EnemyRocket(this.enemyPlane2.x, this.enemyPlane2.y));
                        this.game.addChild(this.enemyRocket[this.enemyRocket.length - 1]);
                    }
                }
                if (this.enemyPlane1.visible) {
                    if (x == 15) {
                        this.enemyRocket.push(new objects.EnemyRocket(this.enemyPlane1.x, this.enemyPlane1.y));
                        this.game.addChild(this.enemyRocket[this.enemyRocket.length - 1]);
                    }
                }

                for (var i = 0; i < this.enemyRocket.length; i++) {
                    this.enemyRocket[i].update();
                    //this.checkCollision(this.enemyRocket[i]);
                }


                
                
                //this.plane.update(this.bullet);

                for (var rocks = 2; rocks >= 0; rocks--) {
                    this.rockss[rocks].update();

                    this.checkCollision(this.rockss[rocks]);
                }

                this.enemyPlane1.update();
                this.enemyPlane2.update();

                this.checkRocketCollisionWithEnemyPlane(this.enemyPlane1);
                this.checkRocketCollisionWithEnemyPlane(this.enemyPlane2);

                this.checkPlaneCollisionWithEnemyRocket();


                this.checkCollision(this.points);
                this.checkCollision(this.extraScore);
                this.checkCollision(this.enemyPlane1);
                this.checkCollision(this.enemyPlane2);

                this.scoreboard.update();


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


                for (var i = 0; i < this.explosions.length; i++) {
                    var explosion = this.explosions[i];
                    if (explosion.currentAnimationFrame == explosion.LastFrame) {
                        this.removeElement(explosion, this.explosions);
                    }
                }
                stage.update(); // Refreshes our stage
            }
        } // Update Method

        private removeElement(el: any, arr: any[]) {
            this.game.removeChild(el);
            var index = arr.indexOf(el);
            arr.splice(index, 1);
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
            //alert(this.flagRepeat);
            if (this.flagRepeat == 1) {
                //  alert(this.flagRepeat);
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