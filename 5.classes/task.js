/* --- КЛАССЫ ПЕЧАТНЫХ ИЗДАНИЙ (из первой части задания) --- */
class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this._state = 100;
        this.type = null;
    }

    fix() {
        if (this.state === 0 || this.state >= 100) return;
        const newState = this.state * 1.5;
        this.state = newState;
    }

    get state() {
        return this._state;
    }

    set state(newValue) {
        if (newValue < 0) {
            this._state = 0;
        } else if (newValue > 100) {
            this._state = 100;
        } else {
            this._state = newValue;
        }
    }
}

class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = "magazine";
    }
}

class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.author = author;
        this.type = "book";
    }
}

class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "novel";
    }
}

class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "fantastic";
    }
}

class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "detective";
    }
}

/* --- КЛАСС БИБЛИОТЕКИ (новая реализация под ваши требования) --- */
class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
    }

    // Добавляем только если издание целое (состояние больше 30)
    addBook(book) {
        if (book instanceof PrintEditionItem && book.state > 30) {
            this.books.push(book);
        }
    }

    // Поиск по любому свойству (название аргумента type здесь означает "ключ", а не жанровую принадлежность)
    findBookBy(key, value) {
        const foundBook = this.books.find(item => item[key] === value);
        return foundBook ? foundBook : null;
    }

    // Выдача книги по названию
    giveBookByName(bookName) {
        const index = this.books.findIndex(item => item.name === bookName);
        
        if (index !== -1) {
            return this.books.splice(index, 1)[0];
        }
        
        return null;
    }
}

/* --- Примеры использования из условия задачи --- */

const sherlock = new PrintEditionItem(
    "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
    2019,
    1008
);

console.log(sherlock.releaseDate); // 2019
console.log(sherlock.state); // 100
sherlock.fix(); 
// Не сработает, так как состояние равно 100 (max). Внутри метода стоит проверка.
console.log(sherlock.state); // 100

const picknick = new FantasticBook(
    "Аркадий и Борис Стругацкие",
    "Пикник на обочине",
    1972,
    168
);

console.log(picknick.author); // "Аркадий и Борис Стругацкие"
picknick.state = 10;
console.log(picknick.state); // 10
picknick.fix(); 
// 10 * 1.5 = 15. Условие (состояние меньше 100) выполняется.
console.log(picknick.state); // 15

/* --- Дополнительная проверка логики ограничений --- */

const oldMagazine = new Magazine("Вестник района", 1985, 40);
oldMagazine.state = -5; // Пытаемся испортить ниже нуля
console.log(oldMagazine.state); // 0

oldMagazine.fix(); // Попытка починить уничтоженное издание
console.log(oldMagazine.state); // 0 (метод ничего не делает)

oldMagazine.state = 150; // Пытаемся выставить выше максимума
console.log(oldMagazine.state); // 100

oldMagazine.fix(); // Починка почти нового издания со 100%
console.log(oldMagazine.state); // 100 (метод ничего не делает)

/* --- ОБЯЗАТЕЛЬНЫЙ ТЕСТОВЫЙ СЦЕНАРИЙ ИЗ ЗАДАНИЯ --- */

// 1. Создаем библиотеку
const library = new Library("Центральная районная библиотека");

// 2. Добавляем в библиотеку несколько печатных изданий разных типов
library.addBook(new DetectiveBook("Артур Конан Дойл", "Записки о Шерлоке Холмсе", 1892, 1024));
library.addBook(new FantasticBook("Братья Стругацкие", "Трудно быть богом", 1964, 320));
library.addBook(new Magazine("Техника - молодежи", 1950, 42));

// Для сценария нам нужна книга 1919 года. 
// Проверяем, есть ли она (ее нет), или создаем её при необходимости.
let book1919 = library.findBookBy("releaseDate", 1919);
if (!book1919) {
    // Создаем книгу 1919 года (например, "Мартин Иден" Джека Лондона)
    book1919 = new NovelBook("Джек Лондон", "Мартин Иден", 1919, 448);
    library.addBook(book1919);
}
console.log("Книга найдена или создана:", book1919.name); // Мартин Иден

// 3. Выдаем любую книгу читателю (возьмем ту, что только что нашли/создали)
const givenBook = library.giveBookByName("Мартин Иден");
console.log("Выдана книга:", givenBook ? givenBook.name : "Ошибка: книга не найдена"); // Мартин Иден

// В библиотеке должно остаться меньше книг
console.log("Книг в фонде после выдачи:", library.books.length); // Должно стать на 1 меньше

// 4. Повредим выданную книгу (состояние упадет ниже порога добавления в библиотеку)
givenBook.state = 20;
console.log("Состояние поврежденной книги:", givenBook.state); // 20

// Попытка вернуть её сейчас должна провалиться (так как state <= 30)
library.addBook(givenBook);
console.log("Попытка вернуть без починки (длина массива):", library.books.length); // Не изменилась

// 5. Восстанавливаем выданную книгу методом fix()
// 20 * 1.5 = 30. Этого недостаточно для возврата (нужно > 30).
givenBook.fix(); 
console.log("После первого fix():", givenBook.state); // 30

// Вызываем еще раз, чтобы точно пройти порог библиотеки
givenBook.fix(); 
// 30 * 1.5 = 45
console.log("После второго fix() (готово к возврату):", givenBook.state); // 45

// 6. Пытаемся добавить восстановленную книгу обратно в библиотеку
library.addBook(givenBook);
console.log("Итоговое количество книг после успешного возврата:", library.books.length); // Вернулось к исходному числу + 1 за книгу 1919 года
