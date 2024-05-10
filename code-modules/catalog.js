import { _ } from '../lib/fp-lodash.js'

export class Catalog {
  static authorNames = (catalogData, book) => {
    let authorIds = _.get(book, ['authorIds'])
    let names = _.map(authorIds, function (authorId) {
      return _.get(catalogData, ['authorsById', authorId, 'name'])
    })

    return names
  }

  static bookInfo = (catalogData, book) => {
    let bookInfo = {
      'title': _.get(book, 'title'),
      'isbn': _.get(book, 'isbn'),
      'authorNames': Catalog.authorNames(catalogData, book)
    }

    return bookInfo
  }

  static searchBooksByTitle = (catalogData, query) => {
    let allBooks = _.values(_.get(catalogData, 'booksByIsbn'))
    let matchingBooks = _.filter(allBooks, function (book) {
      return _.get(book, 'title').includes(query)
    })

    let bookInfos = _.map(matchingBooks, function (book) {
      return Catalog.bookInfo(catalogData, book)
    })

    return bookInfos
  }
}
