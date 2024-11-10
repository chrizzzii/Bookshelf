const { nanoid } = require('nanoid');
const bookshelf = require('./bookshelf');

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        }).code(400);
    }

    const newBook = {
        id: nanoid(),
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished: pageCount === readPage,
        reading,
        insertedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    bookshelf.push(newBook);

    return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: newBook.id
        }
    }).code(201);
};

const getBooksHandler = (request, h) => {
    let filteredBooks = bookshelf;

    const { name, reading, finished } = request.query;

    if (name) {
        filteredBooks = filteredBooks.filter(book => book.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (reading !== undefined) {
        const isReading = reading === '1';
        filteredBooks = filteredBooks.filter(book => book.reading === isReading);
    }

    if (finished !== undefined) {
        const isFinished = finished === '1';
        filteredBooks = filteredBooks.filter(book => book.finished === isFinished);
    }

    const books = filteredBooks.map(book => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
    }));

    return h.response({
        status: 'success',
        data: {
            books
        }
    }).code(200);
};

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const book = bookshelf.find(b => b.id === bookId);

    if (!book) {
        return h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan'
        }).code(404);
    }

    return h.response({
        status: 'success',
        data: {
            book
        }
    }).code(200);
};

const updateBookHandler = (request, h) => {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        }).code(400);
    }

    const bookIndex = bookshelf.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan'
        }).code(404);
    }

    const updatedBook = {
        ...bookshelf[bookIndex],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished: pageCount === readPage,
        updatedAt: new Date().toISOString()
    };

    bookshelf[bookIndex] = updatedBook;

    return h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui'
    }).code(200);
};

const deleteBookHandler = (request, h) => {
    const { bookId } = request.params;
    const bookIndex = bookshelf.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan'
        }).code(404);
    }

    bookshelf.splice(bookIndex, 1);

    return h.response({
        status: 'success',
        message: 'Buku berhasil dihapus'
    }).code(200);
};

module.exports = {
    addBookHandler,
    getBooksHandler,
    getBookByIdHandler,
    updateBookHandler,
    deleteBookHandler
};