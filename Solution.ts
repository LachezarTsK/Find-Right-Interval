
function findRightInterval(intervals: number[][]): number[] {
    const components: Component[] = createComponents(intervals);
    components.sort((x, y) => x.start - y.start);
    return createRightIntervals(components);
};

function createComponents(intervals: number[][]): Component[] {
    const components = new Array(intervals.length);
    for (let i = 0; i < intervals.length; ++i) {
        components[i] = new Component(i, intervals[i][0], intervals[i][1]);
    }
    return components;
}

function createRightIntervals(components: Component[]): number[] {
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

function findUpperBoundIndex(components: Component[], startIndex: number, targetValue: number): number {
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

    constructor(public originalIndex: number, public start: number, public end: number) {
    }
}

class Util {
    static NOT_FOUND = -1
}
