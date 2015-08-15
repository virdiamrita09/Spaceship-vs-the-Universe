
module objects {
    // enemy boss plane Class

    export class EnemyBoss extends objects.GameObject {
        public yFlag: boolean;

        // constructor
        constructor() {
            super("enemyBoss");
            this.sound = "blast";
            this.yFlag = false;
            this.reset();
        }

        // PUBLIC METHODS +++++++++
            public update() {
            this.visible = true;
            if (this.yFlag) {
                this.y += 3;
            } else {
                this.y -= 3;
            }

            if (this.y < 150)
                this.yFlag = true;
            if (this.y > 300)
                this.yFlag = false;
            if (this.x>800)
                this.x -= 5;


        }

        public reset() {

            this.x = 1250;
            this.y = Math.floor(Math.random() * 400);
            this._dx = Math.floor(Math.random() * 5) + 5;

            this._dy = Math.floor(Math.random() * 5) - 2;
            this.visible = false;
        }

        // PRIVATE METHODS +++++++++++
        private _checkBounds() {
            // check if island has left the bottom of the screen
            if (this.x <= (0 - this.width)) {
                this.reset();
            }
            
        }

    }

}    