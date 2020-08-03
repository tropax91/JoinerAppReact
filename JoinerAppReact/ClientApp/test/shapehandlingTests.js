const assert = require('assert');
const shapehandling = require('../src/utilities/shapehandling');

describe('generate path object', function () {
    it('correctly generates a line object', function () {
        let paths = [
            {
                "type": 'line',
                "angle": 0,
                "length": 200,
                "arcSize": 45,
                "clockwise": false
            },
            {
                "type": 'line',
                "angle": 70,
                "length": 200,
                "arcSize": 45,
                "clockwise": false
            },
            {
                "type": 'arc',
                "angle": 0,
                "length": 200,
                "arcSize": 45,
                "clockwise": false
            }
        ]
        let expected = {
            type: "line",
            end: [68.40402866513377, 187.93852415718166],
            origin: [0,0]
        }

        let actual = shapehandling.getPathObjectExp(paths, 1, [0, 0]);

        assert(actual.end[0] === expected.end[0]);
        assert(actual.end[1] === expected.end[1]);
    });
});