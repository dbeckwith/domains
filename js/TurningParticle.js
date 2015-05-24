/**
 * Created by Daniel Beckwith on 5/23/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="Vector.ts"/>
///<reference path="Particle.ts"/>
var TurningParticle = (function (_super) {
    __extends(TurningParticle, _super);
    function TurningParticle(pos, vel, dir) {
        _super.call(this, pos, vel);
        this.speed = vel.mag;
        this._dir = dir;
    }
    Object.defineProperty(TurningParticle.prototype, "dir", {
        get: function () {
            return this._dir;
        },
        enumerable: true,
        configurable: true
    });
    TurningParticle.prototype.update = function (dt) {
        var acc = Vector.perp(this.vel, this.dir);
        acc.setMag(this.vel.magSq / 25);
        this.vel.add(Vector.mult(acc, dt));
        this.vel.setMag(this.speed);
        _super.prototype.update.call(this, dt);
    };
    return TurningParticle;
})(Particle);
//# sourceMappingURL=TurningParticle.js.map