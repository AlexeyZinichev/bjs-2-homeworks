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
