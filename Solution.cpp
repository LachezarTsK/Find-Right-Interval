
#include <span>
#include <ranges>
#include <vector>
using namespace std;

class Solution {

    struct Component {
        int originalIndex{};
        int start{};
        int end{};

        Component() = default;

        Component(int originalIndex, int start, int end)
                :originalIndex{ originalIndex }, start{ start }, end{ end } {};
    };

    static const int NOT_FOUND = -1;

public:
    vector<int> findRightInterval(vector<vector<int>>& intervals) {
        vector<Component> components = createComponents(intervals);
        ranges::sort(components, [](const auto& x, const auto& y) {return x.start < y.start; });
        return createRightIntervals(components);
    }

private:
    static vector<int> createRightIntervals(span<const Component> components) {
        vector<int> rightIntervals(components.size());

        for (int i = 0; i < components.size(); ++i) {
            int indexRightInterval = findUpperBoundIndex(components, i, components[i].end);

            if (indexRightInterval < components.size()) {
                rightIntervals[components[i].originalIndex] = components[indexRightInterval].originalIndex;
            }
            else {
                rightIntervals[components[i].originalIndex] = NOT_FOUND;
            }
        }
        return rightIntervals;
    }

    static vector<Component> createComponents(span<const vector<int>> intervals) {
        vector<Component> components;
        components.reserve(intervals.size());
        for (int i = 0; i < intervals.size(); ++i) {
            components.emplace_back(i, intervals[i][0], intervals[i][1]);
        }
        return components;
    }

    static int findUpperBoundIndex(span<const Component> components, int startIndex, int targetValue) {
        int left = startIndex;
        int right = components.size() - 1;

        while (left <= right) {
            int middle = left + (right - left) / 2;

            if (components[middle].start < targetValue) {
                left = middle + 1;
            }
            else {
                right = middle - 1;
            }
        }
        return left;
    }
};
