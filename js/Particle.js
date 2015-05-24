/**
 * Created by Daniel Beckwith on 5/23/2015.
 */
///<reference path="libs/d3/d3.d.ts"/>
///<reference path="Vector.ts"/>
var Particle = (function () {
    function Particle(pos, vel) {
        this._pos = pos.copy();
        this._vel = vel.copy();
    }
    Object.defineProperty(Particle.prototype, "pos", {
        get: function () {
            return this._pos;
        },
        set: function (pos) {
            this._pos = pos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Particle.prototype, "vel", {
        get: function () {
            return this._vel;
        },
        set: function (vel) {
            this._vel = vel;
        },
        enumerable: true,
        configurable: true
    });
    Particle.prototype.draw = function (svg) {
    };
    Particle.prototype.update = function (dt) {
        this.pos.add(Vector.mult(this.vel, dt));
    };
    return Particle;
})();
//# sourceMappingURL=Particle.js.map