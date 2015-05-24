/**
 * Created by Daniel Beckwith on 05/23/2015.
 */

///<reference path="libs/jquery/jquery.d.ts"/>
///<reference path="libs/bootstrap/bootstrap.d.ts"/>
///<reference path="libs/d3/d3.d.ts"/>
///<reference path="libs/underscore/underscore.d.ts"/>
///<reference path="Vector.ts"/>
///<reference path="Curve.ts"/>
///<reference path="Line.ts"/>
///<reference path="Particle.ts"/>
///<reference path="TurningParticle.ts"/>


$(function() {
    var $canvas = $('#domains-canvas');
    var canvas = d3.select('#domains-canvas');
    var w = $canvas.width();
    var h = $canvas.height();

    var particle = canvas.append('circle')
        .datum(new TurningParticle(new Vector(w / 2, h / 2), new Vector(100, 0), Direction.LEFT))
        .attr('r', 5);

    var animator = () => {
        var dt = (-timer + (timer = Date.now())) / 1000;
        particle.datum().update(dt);
        particle
            .attr('cx', function(p:Particle) {
                return p.pos.x;
            })
            .attr('cy', function(p:Particle) {
                return p.pos.y;
            });
    };


    var timer = Date.now();
    var aniID = setInterval(animator, 20);
    //setTimeout(() => clearInterval(aniID), 1000);
});
