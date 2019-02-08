import {Mover} from "../objects/mover";
import {Vector2D} from "huygens";
import Application = PIXI.Application;

export function mouseFollower(app: Application) {
    let mover = new Mover(
        new Vector2D(300, 300),
        20,
        {color: 0xff0099, window: {width: 1024, height: 768}}
    );

    app.stage.addChild(mover.graphics);

    let mouseX: number = 0;
    let mouseY: number = 0;

    document.getElementById('main')!.onmousemove = (e: any) => {
        mouseX = e.clientX
        mouseY = e.clientY;
    };

    app.ticker.add(() => {
        let force = new Vector2D(mouseX, mouseY);
        force.subtract(mover.location);
        force.setMagnitude(0.5);

        mover.applyForce(force);
        mover.update();
    });
}
