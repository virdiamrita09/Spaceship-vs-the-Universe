module Objects{
    //Enemy class+++++++++++
    export class enemy extends Objects.GameObject{
        
        //Constructor+++++++++++++++++++++
        constructor(imageString: string) {
            super(imageString);

            this.name = "enemy";
            this.sound = "thunder";

            this.reset();
        }

        //PRIVATE METHODS ++++++++++++++++++++++++

        private checkBounds(): void {

            //check if enemy has left screen
            if (this.y > 480 + this.height) {
                this.reset();
            }
        }

        private rest(): void{
            this.x = Math.floor(Math.random() * 640); // start enemy at random location
            this.y = -this.height;
            this.dy = Math.floor(Math.random() * 5) + 5;
            this.dx = Math.floor(Math.random() * 4) - 2;
        }


        // PUBLIC METHODS +++++++++++++++++++++++++++++++
        public update(): void {

            this.y += this.dy; // moves enemy down the stage
            this.x += this.dx; // drifts enemy right and left
            this.checkBounds();
        }
    }
}



