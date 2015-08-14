module objects {
    // score board class +++++++++++++++++++++
    export class ScoreBoard {
        public score: number;
        public lives: number;
        public active: boolean;
        private _scoreLabel: createjs.Text;
        private _livesLabel: createjs.Text;

        // constructor +++++++++++++++
        constructor(game: createjs.Container, score: number, lives: number) {
            this.score = score;
            this.lives = lives;
            this.active = true;

            this._livesLabel = new createjs.Text("Lives: ", "40px Consolas", "#ffff00");
            game.addChild(this._livesLabel);

            this._scoreLabel = new createjs.Text("Score: ", "40px Consolas", "#ffff00");
            this._scoreLabel.x = 400;
            game.addChild(this._scoreLabel);

        }

        // public methods ++++++++++++++++++++++++++++
        public update(): void {
            this._livesLabel.text = "Lives: " + this.lives;
            this._scoreLabel.text = "Score: " + this.score;
        }
    }
} 