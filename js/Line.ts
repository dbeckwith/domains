/**
 * Created by Daniel Beckwith on 5/23/2015.
 */

///<reference path="libs/d3/d3.d.ts"/>
///<reference path="Vector.ts"/>
///<reference path="Curve.ts"/>

class Line extends Curve {

    private _start:Vector;
    private _end:Vector;

    constructor(start:Vector, end:Vector) {
        this._start = start;
        this._end = end;

        super((t:number) => Vector.add(Vector.mult(start,1 - t),Vector.mult(end,t)), start.dist(end));
    }

    get start():Vector {
        return this._start;
    }

    get end():Vector {
        return this._end;
    }

    genPts(forDraw:boolean):Vector[] {
        return [this.start, this.end];
    }

    draw(svg:D3.Selection) {

    }

}
