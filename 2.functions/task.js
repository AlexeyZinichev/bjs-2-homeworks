
function getArrayParams(...arr) {
    if (arr.length === 0) {
        return { min: NaN, max: NaN, avg: NaN };
    }

    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const sum = arr.reduce((acc, val) => acc + val, 0);
    const avg = Number((sum / arr.length).toFixed(2));

    return { min, max, avg };
}

function summElementsWorker(...arr) {
    // Если массив пуст, возвращаем 0 (мяса нет — нечего суммировать)
    if (arr.length === 0) return 0;
    
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

function differenceMaxMinWorker(...arr) {
    // Если элементов нет или всего один, разница между максимумом и минимумом равна 0
    if (arr.length === 0) return 0;

    let min = arr[0];
    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
        const currentNum = arr[i];
        if (currentNum > max) max = currentNum;
        if (currentNum < min) min = currentNum;
    }
    
    return max - min;
}

function differenceEvenOddWorker(...arr) {
    // Если массив пуст, разницы нет
    if (arr.length === 0) return 0;

    let sumEvenElement = 0;
    let sumOddElement = 0;

    for (let i = 0; i < arr.length; i++) {
        const currentNum = arr[i];
        
        // Проверка на четность через остаток от деления на 2
        if (currentNum % 2 === 0) {
            sumEvenElement += currentNum;
        } else {
            sumOddElement += currentNum;
        }
    }
    
    return sumEvenElement - sumOddElement;
}

function averageEvenElementsWorker(...arr) {
    // Если массива нет, среднее вычислить невозможно
    if (arr.length === 0) return 0;

    let sumEvenElement = 0;
    let countEvenElement = 0;

    for (let i = 0; i < arr.length; i++) {
        const currentNum = arr[i];
        
        if (currentNum % 2 === 0) {
            sumEvenElement += currentNum;
            countEvenElement++;
        }
    }

    // Если в массиве не оказалось ни одного чётного числа,
    // деление на ноль даст NaN, поэтому возвращаем 0
    if (countEvenElement === 0) return 0;

    return sumEvenElement / countEvenElement;
}

function makeWork(arrOfArr, func) {
    // Если данных для обработки нет, возвращаем 0
    if (arrOfArr.length === 0) return 0;

    // Инициализируем переменную максимума. 
    // Используем первый элемент массива как стартовую точку,
    // чтобы корректно работать с отрицательными числами.
    let maxWorkerResult = func(...arrOfArr[0]);

    // Начинаем цикл с единицы, так как нулевой элемент уже обработан выше
    for (let i = 1; i < arrOfArr.length; i++) {
        const currentData = arrOfArr[i];
        
        // Передаем данные в насадку. Spread-оператор превращает [1, 2, 3] в три аргумента: 1, 2, 3
        const currentResult = func(...currentData);

        // Проверяем, является ли текущий результат новым максимумом
        if (currentResult > maxWorkerResult) {
            maxWorkerResult = currentResult;
        }
    }

    return maxWorkerResult;
}
