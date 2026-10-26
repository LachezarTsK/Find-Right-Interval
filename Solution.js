
/**
 * @param {number[][]} intervals
 * @return {number[]}
 */
var findRightInterval = function (intervals) {
    const components = createComponents(intervals);
    components.sort((x, y) => x.start - y.start);
    return createRightIntervals(components);
};

/**
 * @param {number[][]} intervals
 * @return {Component[]}
 */
function createComponents(intervals) {
    const components = new Array(intervals.length);
    for (let i = 0; i < intervals.length; ++i) {
        components[i] = new Component(i, intervals[i][0], intervals[i][1]);
    }
    return components;
}

/**
 * @param {Component[]} components
 * @return {number[]}
 */
function createRightIntervals(components) {
    const rightIntervals = new Array(components.length);

    for (let i = 0; i < components.length; ++i) {
        const indexRightInterval = findUpperBoundIndex(components, i, components[i].end);

        if (indexRightInterval < components.length) {
            rightIntervals[components[i].originalIndex] = components[indexRightInterval].originalIndex;
        } else {
            rightIntervals[components[i].originalIndex] = Util.NOT_FOUND;
        }
    }
    return rightIntervals;
}

/**
 * @param {Component[]} components
 * @param {number} startIndex
 * @param {number} targetValue
 * @return {number}
 */
function findUpperBoundIndex(components, startIndex, targetValue) {
    let left = startIndex;
    let right = components.length - 1;

    while (left <= right) {
        const middle = left + Math.floor((right - left) / 2);

        if (components[middle].start < targetValue) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }
    return left;
}

class Component {

    /**
     * @param {number} originalIndex
     * @param {number} start
     * @param {number} end
     */
    constructor(originalIndex, start, end) {
        this.originalIndex = originalIndex;
        this.start = start;
        this.end = end;
    }
}

class Util {
    static  NOT_FOUND = -1
}
