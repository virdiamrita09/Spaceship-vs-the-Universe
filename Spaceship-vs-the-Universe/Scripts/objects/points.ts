

module objects {
    // Player Class
    export class hero extends createjs.Bitmap {
        public width: number;
        public height: number;
        public tmpY: number;
        public timer: number;


        // constructor
        constructor() {
            super(assetLoader.getResult("hero"));

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            createjs.Sound.play("engine", { loop: -1 });

            this.reset();
        }

        // public method
        public update(control) {
            
            if (constants.MENU_STATE) {
                this.y = stage.mouseY;
                this.x = stage.mouseX;
            } else {

                if (control.down == true && this.y < 400) {
                    this.y += 7;
                } else if (control.up == true && this.y > 30) {
                    this.y -= 7;
                } else if (control.left == true && this.x > 50) {
                    this.x -= 7;
                } else if (control.right == true && this.x < 600) {
                    this.x += 7;
                }

             }
        }

        public reset() {
            // reset plane after colliding with enemy
            this.visible = true;
            this.x = -100;
            this.y = Math.floor(Math.random() * 400);
            flagPower = true;
            flagNewPlane = true;
            this.updateNewPlane();
        }

        public updateNewPlane() {
            this.x += 5;
            if (this.x > 100) {
                flagNewPlane = false;
            }
        }

    }

}