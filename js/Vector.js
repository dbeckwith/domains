/**
 * Created by Daniel Beckwith on 5/23/2015.
 */
var Direction;
(function (Direction) {
    Direction[Direction["RIGHT"] = -1] = "RIGHT";
    Direction[Direction["LEFT"] = 1] = "LEFT";
})(Direction || (Direction = {}));
var Vector = (function () {
    function Vector(x, y) {
        this._x = x;
        this._y = y;
        this.clearProps();
    }
    Vector.fromPolar = function (r, t) {
        return new Vector(r * Math.cos(t), r * Math.sin(t));
    };
    Vector.prototype.clearProps = function () {
        this._magSq = null;
        this._mag = null;
        this._ang = null;
    };
    Vector.prototype.copy = function () {
        return new Vector(this.x, this.y);
    };
    Object.defineProperty(Vector.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (x) {
            this._x = x;
            this.clearProps();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (y) {
            this._y = y;
            this.clearProps();
        },
        enumerable: true,
        configurable: true
    });
    Vector.add = function (a, b) {
        return new Vector(a.x + b.x, a.y + b.y);
    };
    Vector.prototype.add = function (other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    };
    Vector.sub = function (a, b) {
        return new Vector(a.x - b.x, a.y - b.y);
    };
    Vector.prototype.sub = function (other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    };
    Vector.mult = function (a, m) {
        return new Vector(a.x * m, a.y * m);
    };
    Vector.prototype.mult = function (scale) {
        this.x *= scale;
        this.y *= scale;
        return this;
    };
    Vector.div = function (a, m) {
        return new Vector(a.x / m, a.y / m);
    };
    Vector.prototype.div = function (scale) {
        this.x /= scale;
        this.y /= scale;
        return this;
    };
    Vector.dot = function (a, b) {
        return a.x * b.x + a.y * b.y;
    };
    Vector.prototype.dot = function (other) {
        return this.x * other.x + this.y * other.y;
    };
    Vector.perp = function (a, direction) {
        if (direction === void 0) { direction = 1 /* LEFT */; }
        return new Vector(direction * a.y, -direction * a.x);
    };
    Vector.prototype.perp = function (direction) {
        if (direction === void 0) { direction = 1 /* LEFT */; }
        var x = this.x;
        this.x = direction * this.y;
        this.y = -direction * x;
        return this;
    };
    Object.defineProperty(Vector.prototype, "magSq", {
        get: function () {
            if (this._magSq === null)
                this._magSq = this.x * this.x + this.y * this.y;
            return this._magSq;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "mag", {
        get: function () {
            if (this._mag === null)
                this._mag = Math.sqrt(this.magSq);
            return this._mag;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "ang", {
        get: function () {
            if (this._ang === null)
                this._ang = Math.atan2(this.y, this.x);
            return this._ang;
        },
        enumerable: true,
        configurable: true
    });
    Vector.rotate = function (a, t) {
        return new Vector(a.x * Math.cos(t) - a.y * Math.sin(t), a.x * Math.sin(t) + a.y * Math.cos(t));
    };
    Vector.prototype.rotate = function (t) {
        var x = this.x;
        this.x = this.x * Math.cos(t) - this.y * Math.sin(t);
        this.y = x * Math.sin(t) + this.y * Math.cos(t);
        return this;
    };
    Vector.normalize = function (a) {
        return new Vector(a.x / a.mag, a.y / a.mag);
    };
    Vector.prototype.normalize = function () {
        return this.div(this.mag);
    };
    Vector.prototype.setMag = function (scale) {
        return this.mult(scale / this.mag);
    };
    Vector.distSq = function (a, b) {
        return a.sub(b).magSq;
    };
    Vector.prototype.distSq = function (other) {
        return this.sub(other).magSq;
    };
    Vector.dist = function (a, b) {
        return a.sub(b).mag;
    };
    Vector.prototype.dist = function (other) {
        return this.sub(other).mag;
    };
    Vector.prototype.equals = function (other, tolerance) {
        if (tolerance === void 0) { tolerance = 0; }
        if (tolerance)
            return this.distSq(other) <= tolerance * tolerance;
        return this.x === other.x && this.y === other.y;
    };
    Vector.prototype.toString = function () {
        return '(' + this.x + ', ' + this.y + ')';
    };
    return Vector;
})();
//# sourceMappingURL=Vector.js.map