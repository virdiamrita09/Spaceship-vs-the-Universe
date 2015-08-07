module objects {
    // Hero Class ++++++++++++++++++++++++++++++++++++++
    export class Hero extends objects.GameObject {
        // constructor ++++++++++++++++++++++++++++++++++
        constructor(imageString: string) {
            super(imageString);

            this.sound = "engine";

            this.y = 430;

            createjs.Sound.play(this.sound, { "loop": -1 });
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++
        public update(): void {
            this.x = stage.mouseX; // position spaceship under mouse
        }
    }
}  