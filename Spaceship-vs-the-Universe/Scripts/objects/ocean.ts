
module objects {
    // ocean class
    export class Ocean extends createjs.Bitmap {
        // public variable instance
        private _dx: number = 5;

        // constructor
        constructor() {
            super(assetLoader.getResult("ocean"));

            this.reset();
        }

        // PUBLIC METHODS +++++++++++++++
        public update() {
            this.x -= this._dx;

            this._checkBounds();
        }

        // Reset position of island to the top
        public reset() {
            this.x = -50;
            this.y = 0;
        }

        // PRIVATE METHODS ++++++++++++
        private _checkBounds() {
            // check if the island has left the bottom of the screen
            if (this.x == -900) {
                this.reset();
            }
        }

    }

}  