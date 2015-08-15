﻿
module objects {
    // alien
    export class Hero extends createjs.Bitmap {
        public width: number;
        public height: number;
        public tmpY: number;
        public timer: number;

        // CONSTRUCTOR
        constructor() {
            super(assetLoader.getResult("hero"));

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            createjs.Sound.play("engine", { loop: -1 });

            this.reset();
         
        }

        // PUBLIC METHODS
        public update(control) {
                if (constants.MENU_STATE) {
                this.y = stage.mouseY;
                this.x = stage.mouseX;
            } else {

                if (control.down == true && this.y < 400) {
                    //console.log("down");
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
            flagNewHero = true;
            this.updateNewHero();
        }

        public updateNewHero() {
            this.x += 5;
            if (this.x > 100) {
                flagNewHero = false;
            }
        }


    }

}