/**
 * Created by Daniel Beckwith on 5/23/2015.
 */
///<reference path="libs/underscore/underscore.d.ts"/>
///<reference path="Vector.ts"/>
var Curve = (function () {
    function Curve(generator, length) {
        if (length < Curve.DRAW_DELTA || length < Curve.CALC_DELTA)
            throw new Error('curve length is too short');
        this._generator = generator;
        this._length = length;
        this._calcPts = this.genPts(false);
        this._drawPts = this.genPts(true);
        this._curveProps = [];
        for (var i = 0, p1 = this._calcPts[0]; i < this._calcPts.length - 1; i++) {
            var p2 = this._calcPts[i + 1];
            var tangent = Vector.sub(p2, p1).normalize();
            this._curveProps.push({
                length: tangent.mag,
                normal: Vector.perp(tangent),
                tangent: tangent
            });
            p1 = p2;
        }
    }
    Object.defineProperty(Curve.prototype, "gen", {
        get: function () {
            return this._generator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Curve.prototype, "length", {
        get: function () {
            return this._length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Curve.prototype, "calcPts", {
        get: function () {
            return this._calcPts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Curve.prototype, "drawPts", {
        get: function () {
            return this._drawPts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Curve.prototype, "curveProps", {
        get: function () {
            return this._curveProps;
        },
        enumerable: true,
        configurable: true
    });
    Curve.prototype.genPts = function (forDraw) {
        return _.map(_.range(0, 1, (forDraw ? Curve.DRAW_DELTA : Curve.CALC_DELTA) / this.length).concat([1]), this.gen);
    };
    Curve.DRAW_DELTA = 2;
    Curve.CALC_DELTA = 0.5;
    return Curve;
})();
//# sourceMappingURL=Curve.js.map