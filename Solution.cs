
using System;

public class Solution
{
    private record Component(int OriginalIndex, int Start, int End);

    private static readonly int NOT_FOUND = -1;
    public int[] FindRightInterval(int[][] intervals)
    {
        Component[] components = CreateComponents(intervals);
        Array.Sort(components, (x, y) => x.Start - y.Start);
        return CreateRightIntervals(components);
    }

    private static int[] CreateRightIntervals(Component[] components)
    {
        int[] rightIntervals = new int[components.Length];

        for (int i = 0; i < components.Length; ++i)
        {
            int indexRightInterval = FindUpperBoundIndex(components, i, components[i].End);

            if (indexRightInterval < components.Length)
            {
                rightIntervals[components[i].OriginalIndex] = components[indexRightInterval].OriginalIndex;
            }
            else
            {
                rightIntervals[components[i].OriginalIndex] = NOT_FOUND;
            }
        }
        return rightIntervals;
    }

    private static Component[] CreateComponents(int[][] intervals)
    {
        Component[] components = new Component[intervals.Length];
        for (int i = 0; i < intervals.Length; ++i)
        {
            components[i] = new Component(i, intervals[i][0], intervals[i][1]);
        }
        return components;
    }

    private static int FindUpperBoundIndex(Component[] components, int startIndex, int targetValue)
    {
        int left = startIndex;
        int right = components.Length - 1;

        while (left <= right)
        {
            int middle = left + (right - left) / 2;

            if (components[middle].Start < targetValue)
            {
                left = middle + 1;
            }
            else
            {
                right = middle - 1;
            }
        }
        return left;
    }
}
