import * as PIXI from 'pixi.js';
import Point = PIXI.Point;
import Application = PIXI.Application;

export function bunny(app: Application) {
    PIXI.loader.add('bunny', 'bunny.png').load((loader: any, resources: any) => {
        const bunny = new PIXI.Sprite(resources.bunny.texture);

        bunny.x = 100;
        bunny.y = 100;
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;
        bunny.scale = new Point(0.3, 0.3);

        app.stage.addChild(bunny);

        app.ticker.add(() => {
            bunny.rotation += 0.01;
        });
    });
}
