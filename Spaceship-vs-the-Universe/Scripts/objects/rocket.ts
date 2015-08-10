module objects {
    // ROCKET CLASS
    export class Rocket extends objects.GameObject {
        public planeX: number;
        public planeY: number;
        // CONSTRUCTOR
        constructor(planeX, planeY) {
            super("rocket");
            this.sound = "blast";
            this._dx = 5;
            this.x = planeX + this.width;
            this.y = planeY;
            //this.reset();

        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
                if (flagStage3)
                this._dx = 10;
            this.x += this._dx;

        }

        // Reset position of island to the top
        public reset() {

            this.visible = false;
            this.x = this.planeX + this.width;
            this.y = this.planeY + 35;//Math.floor(Math.random() * 430);

                  }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        private _checkBounds() {
            // check if island has left the bottom of the screen
            if (this.x >= (1000 + this.width)) {

                this.reset();
            }

        }

    }

} 