
class Solution {

    data class Component(var originalIndex: Int, var start: Int, var end: Int)

    private companion object {
        const val NOT_FOUND = -1
    }

    fun findRightInterval(intervals: Array<IntArray>): IntArray {
        val components = createComponents(intervals)
        components.sortWith() { x, y -> x.start - y.start }
        return createRightIntervals(components)
    }

    private fun createRightIntervals(components: Array<Component>): IntArray {
        val rightIntervals = IntArray(components.size)

        for (i in components.indices) {
            val indexRightInterval = findUpperBoundIndex(components, i, components[i].end)

            if (indexRightInterval < components.size) {
                rightIntervals[components[i].originalIndex] = components[indexRightInterval].originalIndex
            } else {
                rightIntervals[components[i].originalIndex] = NOT_FOUND
            }
        }
        return rightIntervals
    }

    private fun createComponents(intervals: Array<IntArray>): Array<Component> {
        val components = Array<Component>(intervals.size) { Component(0, 0, 0) }
        for (i in intervals.indices) {
            components[i].originalIndex = i
            components[i].start = intervals[i][0]
            components[i].end = intervals[i][1]

        }
        return components
    }

    private fun findUpperBoundIndex(components: Array<Component>, startIndex: Int, targetValue: Int): Int {
        var left = startIndex
        var right = components.size - 1

        while (left <= right) {
            val middle = left + (right - left) / 2

            if (components[middle].start < targetValue) {
                left = middle + 1
            } else {
                right = middle - 1
            }
        }
        return left
    }
}
