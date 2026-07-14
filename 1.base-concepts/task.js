"use strict"
function solveEquation(a, b, c) {
  let arr = [];
    
    // Вычисление дискриминанта: D = b² - 4ac
    const d = b ** 2 - 4 * a * c;

    if (d < 0) {
        // Корней нет, возвращаем пустой массив
        return arr;
    }

    if (d === 0) {
        // Один корень: -b / (2a)
        arr.push(-b / (2 * a));
        return arr;
    }

    // Два корня: (-b ± √D) / (2a)
    const sqrtD = Math.sqrt(d);
    const denominator = 2 * a;
    
    arr.push((-b + sqrtD) / denominator);
    arr.push((-b - sqrtD) / denominator);
    
    return arr;
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  
  // Тело кредита — то, что мы берем у банка
    const loanBody = amount - contribution;

    // Защита от некорректных данных
    if (countMonths <= 0 || loanBody <= 0) {
        return 0;
    }

    // Месячная процентная ставка (от 0 до 1)
    const monthlyRate = percent / 100 / 12;

    let totalBankPayment;

    // Если ставка 0%, просто возвращаем тело кредита без процентов
    if (monthlyRate === 0) {
        totalBankPayment = loanBody;
    } else {
        // Расчет ежемесячного аннуитетного платежа
        const denominator = ((1 + monthlyRate) ** countMonths) - 1;
        const monthlyPayment = loanBody * (monthlyRate + (monthlyRate / denominator));
        
        // Общая сумма, которую получит БАНК за весь срок
        totalBankPayment = monthlyPayment * countMonths;
    }

    // Округляем результат до двух знаков после запятой 
    // и возвращаем число (не строку)
    return Math.round(totalBankPayment * 100) / 100;
}