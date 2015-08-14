
module objects {
    // ocean class
    export class Stage1 extends createjs.Bitmap {
        // public instance variables
        private _dx: number = 5;

        // constructor
        constructor() {
            super(assetLoader.getResult("stage1"));
            flagStage1 = false;
            this.reset();
        }

        // public methods +++++++++++++++++++++++
        public update() {
            this.x -= this._dx;

            this._checkBounds();
        }

        // Reset the position of island to the top
        public reset() {
            this.x = -50;
            this.y = 0;
        }

        //  private methods ++++++++++++++++
        private _checkBounds() {
            // check if island has left the bottom of the screen
            
            if (this.x == -8000) {
                flagStage1 = true;
            }
        }

    }

}   