class Student {
  constructor(name, gender, age) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    // Хранилище оценок: объект { названиеПредмета: [массивОценок] }
    this.marks = {};
  }

  setSubject(subjectName) {
    this.subject = subjectName;
  }

  addMark(mark, subjectName) {
    // Проверка валидности оценки (от 2 до 5 включительно)
    if (typeof mark !== 'number' || mark < 2 || mark > 5) {
      return; // Просто выходим, если оценка некорректна
    }

    // Если такого предмета еще нет в журнале — создаем пустой массив
    if (!this.marks[subjectName]) {
      this.marks[subjectName] = [];
    }

    // Добавляем оценку в массив конкретного предмета
    this.marks[subjectName].push(mark);
  }

  getAverageBySubject(subjectName) {
    const marksForSubject = this.marks[subjectName];

    // Если предмета нет или по нему нет оценок — возвращаем 0
    if (!marksForSubject || marksForSubject.length === 0) {
      return 0;
    }

    const sum = marksForSubject.reduce((acc, val) => acc + val, 0);
    return sum / marksForSubject.length;
  }

  getAverage() {
    const subjects = Object.keys(this.marks);
    
    // Если студент вообще еще не получил ни одной оценки
    if (subjects.length === 0) {
      return 0;
    }

    // Считаем сумму средних баллов по каждому предмету
    const totalOfAverages = subjects.reduce((acc, subject) => {
      return acc + this.getAverageBySubject(subject);
    }, 0);

    // Делим на количество предметов
    return totalOfAverages / subjects.length;
  }

  exclude(reason) {
    delete this.subject;
    delete this.marks;
    this.excluded = reason;
  }
}