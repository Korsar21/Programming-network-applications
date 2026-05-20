function concatenate(arr, separator) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Первый аргумент должен быть массивом строк');
    }

    return arr.join(separator);
}

function erase(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Аргумент должен быть массивом');
    }

    return arr.filter(item => Boolean(item));
}

function diagonalSum(matrix) {
    if (!Array.isArray(matrix) || matrix.length === 0) {
        throw new TypeError('Нужна непустая квадратная матрица');
    }

    const n = matrix.length;

    for (const row of matrix) {
        if (!Array.isArray(row) || row.length !== n) {
            throw new Error('Матрица должна быть квадратной');
        }
    }

    let sum = 0;

    for (let i = 0; i < n; i += 1) {
        sum += matrix[i][i];
        sum += matrix[i][n - 1 - i];
    }

    if (n % 2 !== 0) {
        const middle = Math.floor(n / 2);
        sum -= matrix[middle][middle];
    }

    return sum;
}

function flatten(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Аргумент должен быть массивом');
    }

    const result = [];

    function flatDeep(current) {
        for (const item of current) {
            if (Array.isArray(item)) {
                flatDeep(item);
            } else {
                result.push(item);
            }
        }
    }

    flatDeep(arr);
    return result;
}



console.log('--- Задание 1.1: concatenate ---');
const words = ['Я', 'учусь', 'на', 'лучшей', 'кафедре'];
console.log('Исходный массив:', words);
console.log('Результат:', concatenate(words, ' '));

console.log('\n--- Задание 1.10: erase ---');
const dirtyArray = [0, 1, false, 2, undefined, '', 3, null];
console.log('Исходный массив:', dirtyArray);
console.log('Результат:', erase(dirtyArray));

console.log('\n--- Задание 2.7: diagonalSum ---');
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
console.log('Матрица:', matrix);
console.log('Сумма диагоналей:', diagonalSum(matrix));

console.log('\n--- Задание 3.3: flatten ---');
const nestedArray = [1, 2, 3, [4, 5, 6, [10, 20, 30]]];
console.log('Исходный массив:', JSON.stringify(nestedArray));
console.log('Результат:', flatten(nestedArray));