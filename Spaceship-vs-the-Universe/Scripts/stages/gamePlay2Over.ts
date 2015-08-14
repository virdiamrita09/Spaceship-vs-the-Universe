﻿
/// <reference path="../constants.ts" />

/// <reference path="../objects/gameobjects.ts" />

/// <reference path="../objects/island.ts" />
/// <reference path="../objects/ocean.ts" />
/// <reference path="../objects/plane.ts" />
/// <reference path="../objects/cloud.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/lable.ts" />

/// <reference path="../objects/scoreboard.ts" />

module states {
    // GAME PLAY 2 OVER STATE CLASS
    export class GamePlay2Over {
        // Game Objects 
        public game: createjs.Container;
        public ocean: objects.Ocean;
        public gameOverLabel: objects.Label;
        public finalScoreLabel: objects.Label;
        public highScoreLabel: objects.Label;
        public tryAgainButton: objects.Button;
        public tryAgain: boolean = false;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
            
            // Instantiate Game Container
            this.game = new createjs.Container();

            //Ocean object
            this.ocean = new objects.Ocean();
            this.game.addChild(this.ocean);

            //Game Over Label
            var gameOverLogo = new createjs.Bitmap("assets/images/labelStage2Finished.png");
            gameOverLogo.x = 282;
            gameOverLogo.y = 30;
            this.game.addChild(gameOverLogo);

            //Final Score Label
            this.finalScoreLabel = new objects.Label(475, 150, ("FINAL SCORE: " + currentScore));
            this.finalScoreLabel.color = "red";
            this.game.addChild(this.finalScoreLabel);

            //High Score Label
            this.highScoreLabel = new objects.Label(475, 230, ("HIGH SCORE: " + highScore));
            this.highScoreLabel.color = "red";
            this.game.addChild(this.highScoreLabel);

            
            //Try Again Button
            this.tryAgainButton = new objects.Button(500, 360, "labelStage3Start");
            this.tryAgainButton.on("click", this.tryAgainClicked, this);

            this.game.addChild(this.tryAgainButton);

            // Add Game Container to Stage
            stage.addChild(this.game);
        } // Constructor

        public tryAgainClicked() {
            this.tryAgain = true;
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        public update() {

            this.ocean.update();

            if (this.tryAgain) {
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.GAME_PLAY_3;
                stateChanged = true;
            }

            stage.update(); // Refreshes our stage

        } // Update Method

    } // Game Over Class


} // States Module  