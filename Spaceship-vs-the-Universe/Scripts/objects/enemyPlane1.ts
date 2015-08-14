
module objects {
    // enemy plane class
    export class EnemyPlane1 extends objects.GameObject {

        // CONSTRUCTOR
        constructor() {
            super("enemyPlane1");
            this.sound = "blast";
            this.reset();
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
            this.y += this._dy;
            this.x -= this._dx;

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

        // PRIVATE METHODS ++++++++
        private _checkBounds() {
            // check if island has left the bottom of the screen
            if (this.x <= (0 - this.width)) {
                this.reset();
            }
            
        }

    }

}   