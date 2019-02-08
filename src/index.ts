import * as PIXI from 'pixi.js';
import Application = PIXI.Application;
import {Mover} from "./objects/mover";
import {Vector2D} from "huygens";

const app = new Application({width: 1024, height: 768, backgroundColor: 0xffffff});
document.getElementById('main')!.appendChild(app.view);

let mover = new Mover(
    new Vector2D(300, 300),
    20,
    {color: 0xff0099, window: {width: 1024, height: 768}}
);

let mover2 = new Mover(
    new Vector2D(500, 300),
    60,
    {color: 0x0099ff, window: {width: 1024, height: 768}}
);

app.stage.addChild(mover.graphics);
app.stage.addChild(mover2.graphics);

let center: Vector2D = new Vector2D(app.view.width/2, app.view.height/2);

let wind: Vector2D = new Vector2D(0, 0);

document.getElementById('main')!.onmousedown = (e) => {
    wind = new Vector2D(e.clientX, e.clientY);
    wind.subtract(center);
    wind.normalize();
    wind.multiply(0.2);
    wind.multiply(-1)
};

document.getElementById('main')!.onmouseup = () => {
   wind = new Vector2D(0, 0);
};

app.ticker.add(() => {
    mover.applyForce(wind);
    mover2.applyForce(wind);

    mover.applyForce(createGravity(mover));
    mover2.applyForce(createGravity(mover2));

    mover.applyForce(createFriction(mover));
    mover.applyForce(createFriction(mover2));

    mover.applyForce(createDrag(mover));
    mover2.applyForce(createDrag(mover2));

    mover.update();
    mover2.update();
});


function createGravity(mover: Mover): Vector2D
{
    let gravity = new Vector2D(0.0, 0.1);
    gravity.multiply(mover.size/100)
    return gravity;
}

function createFriction(mover: Mover): Vector2D
{
    let friction = new Vector2D(mover.velocity.x, 0.0000000001);
    friction.multiply(-1);
    friction.normalize();
    friction.multiply(0.0001);

    return friction;
}

function createDrag(mover: Mover): Vector2D
{
    let drag = new Vector2D(mover.velocity.x, mover.velocity.y);
    drag.normalize();
    drag.multiply(-1);
    drag.multiply(0.0005);
    drag.multiply(mover.velocity.magnitude * mover.velocity.magnitude);

    return drag;
}
