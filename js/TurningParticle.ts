/**
 * Created by Daniel Beckwith on 5/23/2015.
 */

///<reference path="Vector.ts"/>
///<reference path="Particle.ts"/>

class TurningParticle extends Particle {

    private speed:number;
    private _dir:Direction;

    constructor(pos:Vector, vel:Vector, dir:Direction) {
        super(pos, vel);
        this.speed = vel.mag;
        this._dir = dir;
    }

    get dir():Direction {
        return this._dir;
    }

    update(dt:number) {
        var acc = Vector.perp(this.vel, this.dir);
        acc.setMag(this.vel.magSq / 25);
        this.vel.add(Vector.mult(acc, dt));
        this.vel.setMag(this.speed);
        super.update(dt);
    }

}
