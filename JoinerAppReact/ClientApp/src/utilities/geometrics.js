exports.calculateLineVertexFromPointAngleLength = function (startVertex, angle, length) {
    let vertexX = startVertex[0] + (length * Math.cos(angle * Math.PI / 180));
    let vertexY = startVertex[1] + (length * Math.sin(angle * Math.PI / 180));
    return [vertexX, vertexY];
}

exports.calculateCumulativeAngleUntilIndex = function (pathsObj, index) {
    let cumulativeAngle = 0;
    for (let i = 0; i < index; i++) {
        if (pathsObj[i].type == 'arc') {
            if (pathsObj[i].clockwise) {
                cumulativeAngle = cumulativeAngle - pathsObj[i].angle;
                cumulativeAngle = cumulativeAngle - pathsObj[i].arcSize;
            }
            else {
                cumulativeAngle = cumulativeAngle + pathsObj[i].arcSize;
                cumulativeAngle = cumulativeAngle + pathsObj[i].angle;
            }
        }
        else {
            cumulativeAngle = cumulativeAngle + pathsObj[i].angle;
        }
    }
    return cumulativeAngle;
}

exports.updateTotalDimensions = function(path, minMaxXY) {
    if (path.type === 'line') {
        return this.calculateMinMaxXY(minMaxXY, path.end);
    }
    else if (path.type === 'arc') {
        let vertex;
        for (let angle = path.startAngle; angle <= path.endAngle; angle++) {
            vertex = this.calculateLineVertexFromPointAngleLength(path.origin, angle, path.radius);
            minMaxXY = this.calculateMinMaxXY(minMaxXY, vertex);

        }
    }
    return minMaxXY
}

exports.calculateMinMaxXY = function (minMaxXY, vertex) {
    //min x, min y, max x, max y
    if (vertex[0] < minMaxXY[0]) {
        minMaxXY[0] = vertex[0];//min x
    }
    else if (vertex[0] > minMaxXY[2]) {
        minMaxXY[2] = vertex[0];//max x
    }

    if (vertex[1] < minMaxXY[1]) {
        minMaxXY[1] = vertex[1];//min y
    }
    else if (vertex[1] > minMaxXY[3]) {
        minMaxXY[3] = vertex[1];//max y
    }

    return minMaxXY;
}