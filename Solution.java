
import java.util.Arrays;

public class Solution {

    private record Component(int originalIndex, int start, int end) {}

    private static final int NOT_FOUND = -1;

    public int[] findRightInterval(int[][] intervals) {
        Component[] components = createComponents(intervals);
        Arrays.sort(components, (x, y) -> x.start - y.start);
        return createRightIntervals(components);
    }

    private static int[] createRightIntervals(Component[] components) {
        int[] rightIntervals = new int[components.length];

        for (int i = 0; i < components.length; ++i) {
            int indexRightInterval = findUpperBoundIndex(components, i, components[i].end);

            if (indexRightInterval < components.length) {
                rightIntervals[components[i].originalIndex] = components[indexRightInterval].originalIndex;
            } else {
                rightIntervals[components[i].originalIndex] = NOT_FOUND;
            }
        }
        return rightIntervals;
    }

    private static Component[] createComponents(int[][] intervals) {
        Component[] components = new Component[intervals.length];
        for (int i = 0; i < intervals.length; ++i) {
            components[i] = new Component(i, intervals[i][0], intervals[i][1]);
        }
        return components;
    }

    private static int findUpperBoundIndex(Component[] components, int startIndex, int targetValue) {
        int left = startIndex;
        int right = components.length - 1;

        while (left <= right) {
            int middle = left + (right - left) / 2;

            if (components[middle].start < targetValue) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return left;
    }
}
