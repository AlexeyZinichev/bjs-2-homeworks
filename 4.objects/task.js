function Student(name, gender, age) {
  this.name = name;
  this.gender = gender;
  this.age = age;
  this.marks = []; // Инициализируем пустой массив оценок сразу при создании объекта
}

Student.prototype.setSubject = function (subjectName) {
  this.subject = subjectName;
};

Student.prototype.addMarks = function (...marksToAdd) {
  // Проверка: если студент отчислен, свойства marks не существует. Добавление невозможно.
  if (!Array.isArray(this.marks)) return; 
  
  // Фильтрация: добавляем только корректные оценки от 1 до 5
  const validMarks = marksToAdd.filter(mark => typeof mark === 'number' && Number.isInteger(mark) && mark >= 1 && mark <= 5);
  this.marks.push(...validMarks);
};

Student.prototype.getAverage = function () {
  // Если свойство marks отсутствует или в нем нет оценок — возвращаем 0
  if (!Array.isArray(this.marks) || this.marks.length === 0) {
    return 0;
  }
  
  const sum = this.marks.reduce((acc, val) => acc + val, 0);
  return sum / this.marks.length;
};

Student.prototype.exclude = function (reason) {
  // Удаляем учебные данные и фиксируем причину исключения
  delete this.subject;
  delete this.marks;
  this.excluded = reason;
};
