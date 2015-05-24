/**
 * Created by Daniel Beckwith on 5/24/2015.
 */
///<reference path="libs/d3/d3.d.ts"/>
///<reference path="libs/underscore/underscore.d.ts"/>
///<reference path="Vector.ts"/>
///<reference path="Curve.ts"/>
///<reference path="Line.ts"/>
///<reference path="Particle.ts"/>
///<reference path="TurningParticle.ts"/>
var CurvePair = (function () {
    function CurvePair(c1, c2, map, color) {
        if (c1 === c2)
            throw new Error('Cannot pair a curve with itself');
        this.c1 = c1;
        this.c2 = c2;
        this.map = map;
        this.color = color;
    }
    CurvePair.prototype.mapFrom = function (from, t) {
        var to;
        if (from === this.c1)
            to = this.c2;
        else if (from === this.c2)
            to = this.c1;
        else
            throw new Error('Cannot map from a curve not in this pair');
        return to.gen(1 - this.map(t));
    };
    CurvePair.prototype.mapVelFrom = function (from, t, vel) {
        var to;
        if (from === this.c1)
            to = this.c2;
        else if (from === this.c2)
            to = this.c1;
        else
            throw new Error('Cannot map from a curve not in this pair');
        var t2 = 1 - this.map(t);
        var tan1 = from.curveProps[Math.floor(t * (from.curveProps.length - 1))].tangent;
        var tan2 = to.curveProps[Math.floor(t2 * (to.curveProps.length - 1))].tangent;
        return Vector.rotate(vel, tan2.ang - tan1.ang + Math.PI).setMag(vel.mag);
    };
    return CurvePair;
})();
var Domain = (function () {
    function Domain(faces) {
        if (faces.length <= 3 && faces.length % 2 !== 0)
            throw new Error('invalid number of faces');
        for (var i = 0, j = faces.length - 1; i < faces.length; i++, j = (j + 1) % faces.length)
            if (!faces[i].gen(0).equals(faces[j].gen(1), Curve.CALC_DELTA))
                throw new Error('domain is not closed (' + j + ' != ' + i + ')');
        this.faces = faces;
        this.numPairs = 0;
        this.checked = false;
    }
    Domain.lines = function (vertices) {
        if (vertices.length <= 3 && vertices.length % 2 !== 0)
            throw new Error('invalid number of vertices');
        return new Domain(_.map(vertices, function (v, i) { return new Line(v.copy(), vertices[(i + 1) % vertices.length].copy()); }));
    };
    Domain.regPoly = function (center, radius, sides) {
        if (sides <= 3 && sides % 2 !== 0)
            throw new Error('invalid number of sides');
        function vertex(i) {
            return Vector.add(Vector.fromPolar(radius, (Math.PI * 2 * (i % sides) + Math.PI) / sides), center);
        }
        return new Domain(_.map(_.range(sides), function (i) { return new Line(vertex(i - 1), vertex(i)); }));
    };
    Domain.prototype.link = function (f1, f2, map) {
        if (map === void 0) { map = Domain.STRAIGHT; }
        if (this.pairs[f1])
            throw new Error(f1 + ' already linked');
        if (this.pairs[f2])
            throw new Error(f2 + ' already linked');
        this.pairs[f1] = this.pairs[f2] = new CurvePair(this.faces[f1], this.faces[f2], map, this.numPairs++);
        this.checked = false;
    };
    Domain.prototype.draw = function (svg) {
    };
    Domain.STRAIGHT = function (t) { return t; };
    Domain.REVERSED = function (t) { return 1 - t; };
    Domain.SQUARED = function (t) { return t * t; };
    Domain.SINE = function (t) { return t * (Math.sin(t * Math.PI * 2) + 1); };
    Domain.COSINE = function (t) { return t * (Math.sin(t * Math.PI * 2) + 1) / 2; };
    Domain.INVCOSINE = function (t) { return Math.asin(2 * t - 1) / Math.PI + 0.5; };
    return Domain;
})();
//# sourceMappingURL=Domain.js.map