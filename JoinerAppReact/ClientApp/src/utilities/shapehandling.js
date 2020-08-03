const MakerJs = require('makerjs');
const geometrics = require('./geometrics');

const ModelOrigin = [0, 0];

exports.pathTypes =  ['line', 'arc'];

exports.getShapeData = function (paths) {
    let shape = [];
    if (paths.length > 0) {
        let newMinMaxXY = [0, 0, 0, 0]
        let currentVertex;
        let pathAndVertex = getPathObject(paths, 0, ModelOrigin);
        let nextVertex = pathAndVertex.vertex;

        shape.push(pathAndVertex.path);
        currentVertex = nextVertex;
        newMinMaxXY = geometrics.updateTotalDimensions(pathAndVertex.path, newMinMaxXY);

        for (let i = 1; i < paths.length; i++) {
            pathAndVertex = getPathObject(paths, i, currentVertex);
            nextVertex = pathAndVertex.vertex;
            shape.push(pathAndVertex.path);
            currentVertex = nextVertex;
            newMinMaxXY = geometrics.updateTotalDimensions(pathAndVertex.path, newMinMaxXY);
        }
        shape.push(new MakerJs.paths.Line(currentVertex, ModelOrigin));

        let hasIntersectingPaths = checkForIntersectingPaths(shape);
        return { shape, newMinMaxXY, hasIntersectingPaths };
    }
    return shape
}

module.exports.getSvgValues = function (shape) {
    var svg = MakerJs.exporter.toSVG(shape);
    let temp = document.createElement('div');
    temp.innerHTML = svg;

    let viewBoxVals = temp.getElementsByTagName("svg")[0].getAttribute("viewBox").split(" ");
    if (viewBoxVals[2] == 0) {
        viewBoxVals[2] = 1;
    }
    if (viewBoxVals[3] == 0) {
        viewBoxVals[3] = 1;
    }

    return {
        viewBoxValue: viewBoxVals.join(" "),//temp.getElementsByTagName("svg")[0].getAttribute("viewBox"),
        pathValue: temp.getElementsByTagName("path")[0].getAttribute("d")
    }
}

module.exports.getDxf = function (shape) {
    return MakerJs.exporter.toDXF({
        "paths": shape,
        "options": { "units": "Millimeter" }
    });
}

function getPathObject (pathsObj, index, startVertex) {
    let nextVertex;
    let newPathObj;
    let cumulativeAngle;
    switch (pathsObj[index].type) {
        case 'line':
            cumulativeAngle = geometrics.calculateCumulativeAngleUntilIndex(pathsObj, index) + pathsObj[index].angle;
            nextVertex = geometrics.calculateLineVertexFromPointAngleLength(startVertex, cumulativeAngle, pathsObj[index].length);
            newPathObj = new MakerJs.paths.Line(startVertex, nextVertex)
            return { path: newPathObj, vertex: nextVertex };
        case 'arc':
            cumulativeAngle = geometrics.calculateCumulativeAngleUntilIndex(pathsObj, index);

            let arcStartAngle;// = cumulativeAngle + pathsObj[index].angle - 90;
            let arcEndAngle;// = arcStartAngle + pathsObj[index].arcSize;
            let angleForCenterCalc;// = cumulativeAngle + pathsObj[index].angle + 90;
            let arcCenter;// = geometrics.calculateLineVertexFromPointAngleLength(startVertex, angleForCenterCalc, pathsObj[index].length);
            //nextVertex = geometrics.calculateLineVertexFromPointAngleLength(arcCenter, arcEndAngle, pathsObj[index].length);
            if (pathsObj[index].clockwise) {
                let invertedAngle = 360 - pathsObj[index].angle;
                arcStartAngle = cumulativeAngle + invertedAngle + 90;
                arcEndAngle = arcStartAngle - pathsObj[index].arcSize;
                angleForCenterCalc = cumulativeAngle + invertedAngle - 90;
                arcCenter = geometrics.calculateLineVertexFromPointAngleLength(startVertex, angleForCenterCalc, pathsObj[index].length);
                nextVertex = geometrics.calculateLineVertexFromPointAngleLength(arcCenter, arcEndAngle, pathsObj[index].length);
                newPathObj = new MakerJs.paths.Arc(arcCenter, pathsObj[index].length, arcEndAngle, arcStartAngle);
            }
            else {
                arcStartAngle = cumulativeAngle + pathsObj[index].angle - 90;
                arcEndAngle = arcStartAngle + pathsObj[index].arcSize;
                angleForCenterCalc = cumulativeAngle + pathsObj[index].angle + 90;
                arcCenter = geometrics.calculateLineVertexFromPointAngleLength(startVertex, angleForCenterCalc, pathsObj[index].length);
                nextVertex = geometrics.calculateLineVertexFromPointAngleLength(arcCenter, arcEndAngle, pathsObj[index].length);
                newPathObj = new MakerJs.paths.Arc(arcCenter, pathsObj[index].length, arcStartAngle, arcEndAngle);
            }
            return { path: newPathObj, vertex: nextVertex };
        default:
            return undefined;
    }
}
module.exports.getPathObjectExp = getPathObject;

function checkForIntersectingPaths (model) {
    let hasIntersections = false;
    if (model.length > 1) {
        let intersection;
        for (let j = 0; j < model.length - 1; j++) {
            for (let k = j + 1; k < model.length; k++) {
                intersection = new MakerJs.path.intersection(model[j], model[k], { excludeTangents: true });
                if (intersection.intersectionPoints && intersection.intersectionPoints.length > 0) {
                    console.log(intersection.intersectionPoints);
                    hasIntersections = true;
                }
                if (hasIntersections) { break; }
            }
            if (hasIntersections) { break; }
        }
    }
    return hasIntersections;
}