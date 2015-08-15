﻿module objects {
    // gameObject Class
    export class GameObject extends createjs.Bitmap {
         // public instance variables
        public width: number;
        public height: number;
        public isColliding: boolean = false;
        public sound: string;
        public name: string;
        protected _dy: number;
        protected _dx: number;

        //Constructor
        constructor(assetString: string) {
            super(assetLoader.getResult(assetString));
            this.name = assetString;

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
        }

    }

}  