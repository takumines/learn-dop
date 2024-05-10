import { _ } from './library-system/lib/fp-lodash.js'
import { SystemConsistency } from './library-system/mutations/system-consistency.js'

let libraryData  = {
	"catalog": {
		'booksByIsbn': {
			'123-123456789': {
				'isbn': '123-123456789',
				'title': 'Watchmen',
				'publicationYear': 1987,
				'authorIds': ['alan-moore', 'dave-gibbons'],
				'bookItems': [
					{
						'id': 'book-item-1',
						'libId': 'nyc-cebtral-lib',
						'isLebt': true
					},
					{
						'id': 'book-item-2',
						'libId': 'boston-pub-lib',
						'isLebt': false
					}
				]
			}
		},
		'authorsById': {
			'alan-moore': {
				'name': 'Alan Moore',
				'bookIsbns': ['123-123456789']
			},
			'dave-gibbons': {
				'name': 'Dave Gibbons',
				'bookIsbns': ['123-123456789']
			}
		}
	}
}

let userManagement = {
	'librariansByEmail': {
		'hoge@example.com': {
			'email': 'hoge@example.com',
			'password': 'password',
		}
	},
	'membersByEmail': {
		'fuga@example.com': {
			'email': 'huga@example.com',
			'password': 'password',
			'isVIP': true,
		}
	}
}

let library = {
	"catalog": {
		'booksByIsbn': {
			'123-123456789': {
				'isbn': '123-123456789',
				'title': 'Watchmen',
				'publicationYear': 1987,
				'authorIds': ['alan-moore', 'dave-gibbons']
			}
		},
		'authorsById': {
			'alan-moore': {
				'name': 'Alan Moore',
				'bookIsbns': ['123-123456789']
			},
			'dave-gibbons': {
				'name': 'Dave Gibbons',
				'bookIsbns': ['123-123456789']
			}
		}
	}
}

let previous = library
let next = _.set(
	library,
	["catalog", "booksByIsbn", "123-123456789", "publicationYear"],
	1986
)

let libraryWithUpdatedTitle = _.set(
	library,
	["catalog", "booksByIsbn", "123-123456789", "title"],
	"One Piece"
)

let current = _.set(
	libraryWithUpdatedTitle,
	["catalog", "authorsById", "dave-gibbons", "name"],
	"eiichiro oda"
)

const merge = SystemConsistency.reconcile(library, previous, next)

console.log("%o",merge)
