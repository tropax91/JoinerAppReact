const assert = require('assert');
const geometrics = require('../src/utilities/geometrics');

describe('calculateMinMaxXY', function () {
    it('correctly updates the max x and y values', function () {
        let expected = [0, 0, 20, 35];
        let vertex = [20, 35];

        let actual = geometrics.calculateMinMaxXY([0, 0, 0, 0], vertex);

        assert.equal(actual[2], expected[2]);
        assert.equal(actual[3], expected[3]);
    });


    it('correctly does NOT update the max x and y values', function () {
        let expected = [0, 0, 80, 77];
        let vertex = [20, 35];

        let actual = geometrics.calculateMinMaxXY([0, 0, 80, 77], vertex);

        assert.equal(actual[2], expected[2]);
        assert.equal(actual[3], expected[3]);
    });
});

describe('calculateLineVertexFromPointAngleLength', function () {
    it('calculates the vertex precisely enough', function () {
        let startVertex = [0, 0];
        let angle = 90;
        let length = 75;
        let expected = [0, 75];
        let actual = geometrics.calculateLineVertexFromPointAngleLength(startVertex, angle, length);

        assert(expected[0] < actual[0]);
        assert(actual[0] < expected[0] + .5);
    });
});

describe('calculateCumulativeAngleUntilIndex', function () {

    let paths = [
        { type: "line", angle: 0, length: 200, arcSize: 45 },
        { type: "line", angle: 45, length: 200, arcSize: 45 },
        { type: "line", angle: 45, length: 200, arcSize: 45 },
        { type: "line", angle: 90, length: 475, arcSize: 45 },
        { type: "line", angle: 90, length: 200, arcSize: 45 }
    ]

    it('correctly calculates the cumulative angle ', function () {
        let expected = 180;
        let actual = geometrics.calculateCumulativeAngleUntilIndex(paths, 4);
        assert.equal(actual, expected);
    });
});

describe('updateTotalDimensions', function () {
    let path = {
        endAngle: 150,
        origin: [100, 0],
        radius: 100,
        startAngle: 0,
        type: "arc"
    }
    
    it('correctly calculates and updates the max x and y values from an arc', function () {
        let expected = [0, 0, 200, 100]
        let actual = geometrics.updateTotalDimensions(path, [0, 0, 0, 0]);

        assert.equal(actual[2], expected[2]);
        assert.equal(actual[3], expected[3]);
    });
});