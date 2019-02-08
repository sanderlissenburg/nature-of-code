import {Vector2D} from "huygens";
import * as PIXI from 'pixi.js';
import Application = PIXI.Application;
import Graphics = PIXI.Graphics;

export function line(app: Application) {
    let center: Vector2D = new Vector2D(app.view.width/2, app.view.height/2);
    let mouse: Vector2D = new Vector2D(0, 0);
    let line: Graphics = new Graphics();

    app.stage.addChild(line);

    document.getElementById('main')!.onmousemove = (e: any) => {
        mouse = new Vector2D(e.clientX, e.clientY);
        mouse.subtract(center);
        mouse.normalize();
        mouse.multiply(20);
    };

    app.ticker.add(() => {
        line
            .clear()
            .lineStyle(2, 0xff9900)
            .moveTo(0, 0)
            .lineTo(mouse.x, mouse.y)
            .setTransform(center.x, center.y);
    });
}
