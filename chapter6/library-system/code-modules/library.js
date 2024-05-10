import { Catalog } from './category.js'
import { UserManagement } from './user-management.js'
import { _ } from '../lib/fp-lodash.js'

export class Library {
	static searchBooksByTitleJSON = (libraryData, query) => {
		let catalogData = _.get(libraryData, "catalog")
		let results = Catalog.searchBooksByTitle(catalogData, query)
		let resultsJson = JSON.stringify(results)

		return resultsJson
	}

	static addMember = (library, member) => {
		let currentUserManagement = _.get(library, "userManagement")
		let nextUserManagement = UserManagement.addMember(currentUserManagement, member)
		let nextLibrary = _.set(library, "userManagement", nextUserManagement)

		return nextLibrary
	}
}
