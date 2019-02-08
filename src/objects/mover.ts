import {Vector2D} from "huygens";
import * as PIXI from 'pixi.js';
import Graphics = PIXI.Graphics;
import { Point } from "pixi.js";

interface Options {
    color: number
    window: {width: number, height: number}
};

export class Mover {

    public size: number;
    public graphics: Graphics;
    public velocity: Vector2D;
    public acceleration: Vector2D;

    constructor(
        private _location: Vector2D,
        size: number,
        private options: Options = {
            color: 0xff9900,
            window: {width: 1024, height: 768}
        }
    ) {
        this.size = size;
        this.graphics = new Graphics();
        this.velocity = new Vector2D(0, 1);
        this.acceleration = new Vector2D(0, 0);
        this.update();
    }

    public applyForce(force: Vector2D): void
    {
        force = new Vector2D(force.x, force.y);
        force.divide(this.size/100)

        this.acceleration.add(force);
    }

    public update(): void
    {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);

        this.draw();
        this.checkEdges();
        this.acceleration = new Vector2D(0, 0);
    }

    get location(): Vector2D
    {
        return this._location;
    }

    private draw(): void
    {
        this.graphics
            .clear()
            .beginFill(this.options.color)
            .drawCircle(0, 0, this.size)
            .endFill()
            .position = new Point(this.location.x, this.location.y)
        ;
    }

    private checkEdges(): void
    {
        if (this.location.x > this.options.window.width) {
            this.velocity = new Vector2D(this.velocity.x * -1, this.velocity.y);
            this._location = new Vector2D(this.options.window.width, this.location.y);
        } else if (this.location.x < 0) {
            this.velocity = new Vector2D(this.velocity.x * -1, this.velocity.y);
            this._location = new Vector2D(0, this.location.y);
        }

        if (this.location.y > this.options.window.height) {
            this.velocity = new Vector2D(this.velocity.x, this.velocity.y  * -1);
            this._location = new Vector2D(this.location.x, this.options.window.height);
        }
    }
}
