"use strict";
function objEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
function union(set1, set2) {
    return set1.concat(set2.filter(function (el) {
        return set1.indexOf(el) === -1;
    }));
}
exports.Manhattan = function (node, information) {
    var cell = node.state.val['cell'];
    var x = cell.position.col;
    var y = cell.position.row;
    var endPoint = information.endPoint;
    var dx = Math.abs(x - endPoint.col);
    var dy = Math.abs(y - endPoint.row);
    node.estimateCost = dx + dy;
    if (information.type == 'AS')
        node.estimateCost += node.pathCost;
};
exports.FD = function (node, information) {
    var pokePositions = node.state.val['pokePositions'];
    var positionsArr = [];
    positionsArr.push(information.endPoint);
    for (var i = 0; i < pokePositions.length; i++) {
        positionsArr.push(pokePositions[i]);
    }
    var maxCost = 0;
    for (var i = 0; i < positionsArr.length; ++i) {
        var x = positionsArr[i].col;
        var y = positionsArr[i].row;
        for (var j = i + 1; j < positionsArr.length; ++j) {
            var dx = Math.abs(x - positionsArr[j].col);
            var dy = Math.abs(y - positionsArr[j].row);
            var manh = dx + dy;
            if (manh > maxCost) {
                maxCost = manh;
            }
        }
    }
    node.estimateCost = maxCost;
    if (information.type == 'AS')
        node.estimateCost += node.pathCost;
};
exports.MST = function (node, information) {
    var currentPosition = node.state.val['cell'].position;
    var pokePositions = node.state.val['pokePositions'];
    var endPosition = information.endPoint;
    var positionsArr = [];
    var edges = [];
    var vertexSets = [];
    var totalCost = 0;
    var A = [];
    positionsArr.push(currentPosition);
    positionsArr.push(endPosition);
    for (var i = 0; i < pokePositions.length; i++) {
        positionsArr.push(pokePositions[i]);
    }
    for (var i = 0; i < positionsArr.length; i++) {
        vertexSets.push([i]);
        for (var j = i + 1; j < positionsArr.length; j++) {
            var x1 = positionsArr[i].col;
            var x2 = positionsArr[j].col;
            var y1 = positionsArr[i].row;
            var y2 = positionsArr[j].row;
            var cost = Math.abs(x1 - x2) + Math.abs(y1 - y2);
            // let cost = Math.sqrt( (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
            var edge = {
                u: i,
                v: j,
                cost: cost
            };
            edges.push(edge);
        }
    }
    edges.sort(function (a, b) {
        return a.cost - b.cost;
    });
    for (var i = 0; i < edges.length; i++) {
        var u = edges[i].u;
        var v = edges[i].v;
        var cost = edges[i].cost;
        vertexSets[u].sort();
        vertexSets[v].sort();
        if (!objEqual(vertexSets[u], vertexSets[v])) {
            A.push(edges[i]);
            totalCost += cost;
            vertexSets[u] = union(vertexSets[u], vertexSets[v]);
            for (var j = 0; j < vertexSets[u].length; j++) {
                if (j != u) {
                    var vertex = vertexSets[u][j];
                    vertexSets[vertex] = vertexSets[u];
                }
            }
        }
    }
    node.estimateCost = totalCost;
    if (information.type == 'AS')
        node.estimateCost += node.pathCost;
};
//# sourceMappingURL=heuristic-funcs.js.map