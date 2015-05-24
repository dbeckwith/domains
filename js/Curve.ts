/**
 * Created by Daniel Beckwith on 5/23/2015.
 */

///<reference path="libs/underscore/underscore.d.ts"/>
///<reference path="libs/d3/d3.d.ts"/>
///<reference path="Vector.ts"/>

interface Generator {
    (t:number):Vector;
}

interface CurveProp {
    length: number;
    tangent: Vector;
    normal: Vector;
}

class Curve {

    static DRAW_DELTA:number = 2;
    static CALC_DELTA:number = 0.5;

    private _generator:Generator;
    private _length:number;
    private _calcPts:Vector[];
    private _drawPts:Vector[];
    private _curveProps:CurveProp[];

    constructor(generator:Generator, length:number) {
        if (length < Curve.DRAW_DELTA || length < Curve.CALC_DELTA) throw new Error('curve length is too short');
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

    get gen():Generator {
        return this._generator;
    }

    get length():number {
        return this._length;
    }

    get calcPts():Vector[] {
        return this._calcPts;
    }

    get drawPts():Vector[] {
        return this._drawPts;
    }

    get curveProps():CurveProp[] {
        return this._curveProps;
    }

    genPts(forDraw:boolean):Vector[] {
        return _.map(_.range(0, 1, (forDraw ? Curve.DRAW_DELTA : Curve.CALC_DELTA) / this.length).concat([1]), this.gen);
    }

    draw(svg:D3.Selection) {

    }

}
