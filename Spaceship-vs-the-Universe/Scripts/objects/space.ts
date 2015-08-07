module objects {
    // Space Class ++++++++++++++++++++++++++++++++++++++
    export class space extends createjs.Bitmap {
        // PUBLIC PROPERTIES ++++++++++++++++++++++++++++
        width: number;
        height: number;
        dy: number = 5;

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++
        constructor(imageString: string) {
            super(imageString);
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.reset();
        }

        // PRIVATE METHODS ++++++++++++++++++++++++++++++
        private checkBounds(): void {

            // check if space has left screen
            if (this.y == 0) {
                this.reset();
            }
        }


        private reset(): void {
            this.x = 0;
            this.y = -960; // reset space off screen
        }


        // PUBLIC METHODS +++++++++++++++++++++++++++++++
        public update(): void {

            this.y += this.dy; // moves space down the stage
            this.checkBounds();
        }
    }
}  