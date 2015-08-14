
module objects {
    // island class// extra score
    export class extraScore extends objects.GameObject {

        // constructor
        constructor() {
            super("extraScore");
            this.sound = "star";
            this._dx = 5;

            this.reset();
        }

        // PUBLIC METHODS +++++++++++++++++
        public update() {
            this.x -= this._dx;

            this._checkBounds();
        }

        // Reset position of island to the top
        public reset() {
            this.visible = true;
            this.x = 1000 + this.width;
            this.y = Math.floor(Math.random() * 430);

        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        private _checkBounds() {
            // check if island has left the bottom of the screen
            if (this.x <= (0 - this.width - 5000)) {
                this.reset();
            }

        }

    }

}  