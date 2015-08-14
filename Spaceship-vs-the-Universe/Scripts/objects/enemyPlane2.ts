
module objects {
    // enemy plane 2 class
    export class EnemyPlane2 extends objects.GameObject {

        public yFlag: boolean;

        // constructor
        constructor() {
            super("enemyPlane2");
            this.sound = "blast";
            this.reset();
            this.yFlag = false;
        }

        // PUBLIC METHODS +++++++
        public update() {
            if (this.yFlag) {
                this.y += 3;
            } else {
                this.y -= 3;
            }

            if (this.y < 50)
                this.yFlag = true;
            if (this.y > 380)
                this.yFlag = false;
            this.x -= 5;

            this._checkBounds();
        }

        // Reset the position of island to the top
        public reset() {
            
            this.visible = true;
            this.x = 1050;
            this.y = Math.floor(Math.random() * 400);
            this._dx = Math.floor(Math.random() * 5) + 5;

            this._dy = Math.floor(Math.random() * 5) - 2;
        }

        // PRIVATE METHODS +++++++
        private _checkBounds() {
            // check if island has left the bottom of the screen
            if (this.x <= (0 - this.width)) {
                this.reset();
            }

        }

    }

}    