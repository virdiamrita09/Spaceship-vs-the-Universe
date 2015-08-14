
module objects {
    // stage3 class
    export class Stage3 extends createjs.Bitmap {
        // public instance variable
        private _dx: number = 5;

        // constructor
        constructor() {
            super(assetLoader.getResult("stage3"));
            flagStage2 = false;
            this.reset();
        }

        // public methods+++++++++++++
        public update() {

            if (!flagStage3) //stage 3 not complete
            {

                this.x -= this._dx;
                this._checkBounds();
            }


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
                flagStage3 = true;
                flagBoss = true;
            }
        }

    }

}     