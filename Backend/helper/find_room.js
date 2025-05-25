const getCombinations = (arr) => {
    const result = [];
    const backtrack = (start, path) => {
        if (path.length) result.push([...path]);
        for (let i = start; i < arr.length; i++) {
            path.push(arr[i]);
            backtrack(i + 1, path);
            path.pop();
        }
    };
    backtrack(0, []);
    return result;
};
const find_room = (data, target) =>
    getCombinations(data).filter(combo => {
        const total = combo.reduce((sum, room) => sum + room.adult_count, 0);

        return total == target || total == Number(target) + 1;
    });


module.exports = { find_room };