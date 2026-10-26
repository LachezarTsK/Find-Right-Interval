
package main
import "slices"

type Component struct {
    originalIndex int
    start         int
    end           int
}

const NOT_FOUND = -1

func findRightInterval(intervals [][]int) []int {
    components := createComponents(intervals)
    slices.SortFunc(components, func(x Component, y Component) int { return x.start - y.start })
    return createRightIntervals(components)
}

func createRightIntervals(components []Component) []int {
    rightIntervals := make([]int, len(components))

    for i := range components {
        indexRightInterval := findUpperBoundIndex(components, i, components[i].end)

        if indexRightInterval < len(components) {
            rightIntervals[components[i].originalIndex] = components[indexRightInterval].originalIndex
        } else {
            rightIntervals[components[i].originalIndex] = NOT_FOUND
        }
    }
    return rightIntervals
}

func createComponents(intervals [][]int) []Component {
    components := make([]Component, len(intervals))
    for i := range intervals {
        components[i].originalIndex = i
        components[i].start = intervals[i][0]
        components[i].end = intervals[i][1]
    }
    return components
}

func findUpperBoundIndex(components []Component, startIndex int, targetValue int) int {
    left := startIndex
    right := len(components) - 1

    for left <= right {
        middle := left + (right - left) / 2

        if components[middle].start < targetValue {
            left = middle + 1
        } else {
            right = middle - 1
        }
    }
    return left
}
