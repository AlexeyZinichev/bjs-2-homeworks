/**
 * Преобразует строку в число с плавающей точкой.
 * @param {any} value - Значение для парсинга.
 * @returns {number} Результат преобразования.
 * @throws {Error} Если значение не является числом в десятичной системе счисления.
 */
function parseCount(value) {
  const parsedValue = Number.parseFloat(value);
  
  if (Number.isNaN(parsedValue)) {
    throw new Error('Невалидное значение');
  }

  return parsedValue;
}

function validateCount(value) {
  try {
    return parseCount(value);
  } catch (error) {
    return error;
  }
}

class Triangle {
  /**
   * Создает экземпляр треугольника.
   * @param {number} a - Длина первой стороны.
   *param {number} b - Длина второй стороны.
   * @param {number} c - Длина третьей стороны.
   * @throws {Error} Если треугольник не существует.
   */
  constructor(a, b, c) {
    // Проверка неравенства треугольника: сумма любых двух сторон 
    // должна быть строго больше третьей стороны
    if (a + b <= c || a + c <= b || b + c <= a) {
      throw new Error('Треугольник с такими сторонами не существует');
    }
    
    this._a = a;
    this._b = b;
    this._c = c;
  }

  /**
   * Возвращает периметр треугольника.
   * @returns {number}
   */
  get perimeter() {
    return this._a + this._b + this._c;
  }

  /**
   * Возвращает площадь треугольника по формуле Герона.
   * Результат округляется до трех знаков после запятой.
   * @returns {number}
   */
  get area() {
    const p = this.perimeter / 2; // Полупериметр
    const rawArea = Math.sqrt(p * (p - this._a) * (p - this._b) * (p - this._c));
    // toFixed возвращает строку, поэтому преобразуем обратно в число через Number
    return Number(rawArea.toFixed(3));
  }
}

/**
 * Фабричная функция для создания треугольника. 
 * Реализует механизм "ленивых вычислений" через замыкание.
 * @param {number} a
 * @param {number} b 
 * @param {number} c 
 * @returns {Triangle|{get perimeter(): string, get area(): string}}
 */
function getTriangle(a, b, c) {
  try {
    return new Triangle(a, b, c);
  } catch (_) {
    // Возвращаем объект-заглушку. Геттеры здесь — это стрелочные функции,
    // которые лексически захватывают сообщение об ошибке из замыкания.
    return {
      get perimeter() {
        return 'Ошибка! Треугольник не существует';
      },
      get area() {
        return 'Ошибка! Треугольник не существует';
      }
    };
  }
}