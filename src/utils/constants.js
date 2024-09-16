export const bestStep = { // в каждом элементе массива только 2 элемента!
    0: [[1, 2], [3, 6], [4, 8]],
    1: [[0, 2], [4, 7]],
    2: [[0, 1], [5, 8], [6, 4]],
    3: [[0, 6], [4, 5]],
    4: [[1, 7], [3, 5], [0, 8], [2, 6]],
    5: [[2, 8], [3, 4]],
    6: [[0, 3], [7, 8], [2, 4]],
    7: [[1, 4], [6, 8]],
    8: [[2, 5], [6, 7], [0, 4]]
};

export const possibleMoves = {
    0: [8, 2, 6],
    1: [7, 0, 2],
    2: [6, 0, 8],
    3: [5, 0, 6],
    4: [0, 2, 6, 8],
    5: [3, 2, 8],
    6: [2, 0, 8],
    7: [1, 6, 8],
    8: [0, 2, 6]
};

export const arrayWinner = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];