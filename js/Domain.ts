/**
 * Created by Daniel Beckwith on 5/24/2015.
 */

///<reference path="Vector.ts"/>
///<reference path="Curve.ts"/>
///<reference path="Line.ts"/>
///<reference path="Particle.ts"/>
///<reference path="TurningParticle.ts"/>

interface ConnMap {
    (t:number): number;
}

class CurvePair {

    c1:Curve;
    c2:Curve;
    map:ConnMap;
    color:number;

    constructor(c1:Curve, c2:Curve, map:ConnMap, color:number) {
        if (c1 === c2) throw new Error('Cannot pair a curve with itself');
        this.c1 = c1;
        this.c2 = c2;
        this.map = map;
        this.color = color;
    }

    mapFrom(from:Curve, t:number) {
        var to:Curve;
        if (from === this.c1)
            to = this.c2;
        else if (from === this.c2)
            to = this.c1;
        else throw new Error('Cannot map from a curve not in this pair');
        return to.gen(1 - this.map(t));
    }

    mapVelFrom(from:Curve, t:number, vel:Vector) {
        var to:Curve;
        if (from === this.c1)
            to = this.c2;
        else if (from === this.c2)
            to = this.c1;
        else throw new Error('Cannot map from a curve not in this pair');
        var t2 = 1 - this.map(t);
        var tan1 = from.curveProps[Math.floor(t * (from.curveProps.length - 1))].tangent;
        var tan2 = to.curveProps[Math.floor(t2 * (to.curveProps.length - 1))].tangent;
        return Vector.rotate(vel, tan2.ang - tan1.ang + Math.PI).setMag(vel.mag);
    }

}

class Domain {

    static STRAIGHT:ConnMap = (t:number) => t;
    static REVERSED:ConnMap = (t:number) => 1 - t;
    static SQUARED:ConnMap = (t:number) => t * t;
    static SINE:ConnMap = (t:number) => t * (Math.sin(t * Math.PI * 2) + 1);
    static COSINE:ConnMap = (t:number) => t * (Math.sin(t * Math.PI * 2) + 1) / 2;
    static INVCOSINE:ConnMap = (t:number) => Math.asin(2 * t - 1) / Math.PI + 0.5;

    static lines(vertices:Vector[]) {
        if (vertices.length <= 3 && vertices.length % 2 !== 0) throw new Error('invalid number of vertices');
        return new Domain(_.map(vertices,
            (v:Vector, i:number) => new Line(v.copy(), vertices[(i + 1) % vertices.length].copy())));
    }

    static regPoly(center:Vector, radius:number, sides:number) {
        if (sides <= 3 && sides % 2 !== 0) throw new Error('invalid number of sides');
        function vertex(i:number):Vector {
            return Vector.add(Vector.fromPolar(radius, (Math.PI * 2 * (i % sides) + Math.PI) / sides), center);
        }

        return new Domain(_.map(_.range(sides), (i:number) => new Line(vertex(i - 1), vertex(i))));
    }

    private faces:Curve[];
    private pairs:CurvePair[];
    private numPairs:number;
    private checked:boolean;

    constructor(faces:Curve[]) {
        if (faces.length <= 3 && faces.length % 2 !== 0) throw new Error('invalid number of faces');
        for (var i = 0, j = faces.length - 1; i < faces.length; i++, j = (j + 1) % faces.length)
            if (!faces[i].gen(0).equals(faces[j].gen(1), Curve.CALC_DELTA))
                throw new Error('domain is not closed (' + j + ' != ' + i + ')');
        this.faces = faces;

        this.numPairs = 0;
        this.checked = false;
    }

    link(f1:number, f2:number, map:ConnMap = Domain.STRAIGHT) {
        if (this.pairs[f1]) throw new Error(f1 + ' already linked');
        if (this.pairs[f2]) throw new Error(f2 + ' already linked');
        this.pairs[f1] = this.pairs[f2] = new CurvePair(this.faces[f1], this.faces[f2], map, this.numPairs++);
        this.checked = false;
    }

}
