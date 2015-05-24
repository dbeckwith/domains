/**
 * Created by Daniel Beckwith on 5/23/2015.
 */

enum Direction {RIGHT = -1, LEFT = 1}

class Vector {

    static fromPolar(r:number, t:number):Vector {
        return new Vector(r * Math.cos(t), r * Math.sin(t));
    }

    private _x:number;
    private _y:number;
    private _magSq:number;
    private _mag:number;
    private _ang:number;

    constructor(x:number, y:number) {
        this._x = x;
        this._y = y;
        this.clearProps();
    }

    private clearProps() {
        this._magSq = null;
        this._mag = null;
        this._ang = null;
    }

    copy():Vector {
        return new Vector(this.x, this.y);
    }

    get x():number {
        return this._x;
    }

    set x(x:number) {
        this._x = x;
        this.clearProps();
    }

    get y():number {
        return this._y;
    }

    set y(y:number) {
        this._y = y;
        this.clearProps();
    }

    static add(a:Vector, b:Vector):Vector {
        return new Vector(a.x + b.x, a.y + b.y);
    }

    add(other:Vector):Vector {
        this.x += other.x;
        this.y += other.y;
        return this;
    }

    static sub(a:Vector, b:Vector):Vector {
        return new Vector(a.x - b.x, a.y - b.y);
    }

    sub(other:Vector):Vector {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }

    static mult(a:Vector, m:number):Vector {
        return new Vector(a.x * m, a.y * m);
    }

    mult(scale:number):Vector {
        this.x *= scale;
        this.y *= scale;
        return this;
    }

    static div(a:Vector, m:number):Vector {
        return new Vector(a.x / m, a.y / m);
    }

    div(scale:number):Vector {
        this.x /= scale;
        this.y /= scale;
        return this;
    }

    static dot(a:Vector, b:Vector):number {
        return a.x * b.x + a.y * b.y;
    }

    dot(other:Vector):number {
        return this.x * other.x + this.y * other.y;
    }

    static perp(a:Vector, direction:Direction = Direction.LEFT):Vector {
        return new Vector(direction * a.y, -direction * a.x);
    }

    perp(direction:Direction = Direction.LEFT):Vector {
        var x = this.x;
        this.x = direction * this.y;
        this.y = -direction * x;
        return this;
    }

    get magSq():number {
        if (this._magSq === null)
            this._magSq = this.x * this.x + this.y * this.y;
        return this._magSq;
    }

    get mag():number {
        if (this._mag === null)
            this._mag = Math.sqrt(this.magSq);
        return this._mag;
    }

    get ang():number {
        if (this._ang === null)
            this._ang = Math.atan2(this.y, this.x);
        return this._ang;
    }

    static rotate(a:Vector, t:number):Vector {
        return new Vector(a.x * Math.cos(t) - a.y * Math.sin(t), a.x * Math.sin(t) + a.y * Math.cos(t))
    }

    rotate(t:number):Vector {
        var x = this.x;
        this.x = this.x * Math.cos(t) - this.y * Math.sin(t);
        this.y = x * Math.sin(t) + this.y * Math.cos(t);
        return this;
    }

    static normalize(a:Vector):Vector {
        return new Vector(a.x / a.mag, a.y / a.mag);
    }

    normalize():Vector {
        return this.div(this.mag);
    }

    setMag(scale:number):Vector {
        return this.mult(scale / this.mag);
    }

    static distSq(a:Vector, b:Vector):number {
        return a.sub(b).magSq;
    }

    distSq(other:Vector):number {
        return this.sub(other).magSq;
    }

    static dist(a:Vector, b:Vector):number {
        return a.sub(b).mag;
    }

    dist(other:Vector):number {
        return this.sub(other).mag;
    }

    equals(other:Vector, tolerance:number = 0):boolean {
        if (tolerance)
            return this.distSq(other) <= tolerance * tolerance;
        return this.x === other.x && this.y === other.y;
    }

    toString():string {
        return '(' + this.x + ', ' + this.y + ')';
    }

}
