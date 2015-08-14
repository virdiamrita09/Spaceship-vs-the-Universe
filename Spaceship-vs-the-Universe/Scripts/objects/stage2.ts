
module objects {
    // stage 2
    export class Stage2 extends createjs.Bitmap {
        // public instance variable
        private _dx: number = 5;

        // constructor
        constructor() {
            super(assetLoader.getResult("stage2"));
            flagStage2 = false;
            this.reset();
        }

        // public method +++++++++++++
        public update() {
            this.x -= this._dx;
            this._checkBounds();
        }

        // Reset position of island to the top
        public reset() {
            this.x = -50;
            this.y = 0;
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        private _checkBounds() {
            // check if island has left the bottom of the screen
            
            if (this.x == -8000) {
                //this.reset();
                flagStage2 = true;
            }
        }

    }

}    