module objects {
    // points Class ++++++++++++++++++++++++++++++++++++++
    export class points extends objects.GameObject {
        // constructooooor ++++++++++++++++++++++++++++++++++
        constructor(imageString: string) {
            super(imageString);

            this.name = "points";
            this.sound = "yay";
            this.dy = 5;

            this.reset();
        }

        // MY PRIVATE METHODS ++++++++++++++++++++++++++++++
        private checkBounds(): void {

            // check if points are coming from left screen
            if (this.y > 480 + this.height) {
                this.reset();
            }
        }


        private reset(): void {
            this.x = Math.floor(Math.random() * 640); // start points at random location
            this.y = -this.height; // start points off stage
        }


        // PUBLIC METHODS +++++++++++++++++++++++++++++++
        public update(): void {

            this.y += this.dy; // moves points down the stage
            this.checkBounds();
        }
    }
} 