/**
 * Created by Daniel Beckwith on 5/23/2015.
 */

///<reference path="libs/d3/d3.d.ts"/>
///<reference path="Vector.ts"/>


class Particle {

    private _pos:Vector;
    private _vel:Vector;

    constructor(pos:Vector, vel:Vector) {
        this._pos = pos.copy();
        this._vel = vel.copy();
    }

    get pos():Vector {
        return this._pos;
    }

    set pos(pos:Vector) {
        this._pos = pos;
    }

    get vel():Vector {
        return this._vel;
    }

    set vel(vel:Vector) {
        this._vel = vel;
    }

    draw(svg:D3.Selection) {

    }

    update(dt:number) {
        this.pos.add(Vector.mult(this.vel, dt));
    }

}
