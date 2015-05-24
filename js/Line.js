/**
 * Created by Daniel Beckwith on 5/23/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="libs/d3/d3.d.ts"/>
///<reference path="Vector.ts"/>
///<reference path="Curve.ts"/>
var Line = (function (_super) {
    __extends(Line, _super);
    function Line(start, end) {
        this._start = start;
        this._end = end;
        _super.call(this, function (t) { return Vector.add(Vector.mult(start, 1 - t), Vector.mult(end, t)); }, start.dist(end));
    }
    Object.defineProperty(Line.prototype, "start", {
        get: function () {
            return this._start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "end", {
        get: function () {
            return this._end;
        },
        enumerable: true,
        configurable: true
    });
    Line.prototype.genPts = function (forDraw) {
        return [this.start, this.end];
    };
    Line.prototype.draw = function (svg) {
    };
    return Line;
})(Curve);
//# sourceMappingURL=Line.js.map