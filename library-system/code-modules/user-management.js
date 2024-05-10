import { _ } from '../lib/fp-lodash.js'

export class UserManagement {
	static isLibrarian = (UserManagement, email) => {
		return _.has(_.get(UserManagement, ['librariansByEmail']), email)
	}

	static isVIPMember = (UserManagement, email) => {
		return _.get(UserManagement, ["membersByEmail", email, "isVIP"]) == true
	}

	static isSuperMember = (UserManagement, email) => {
		return _.get(UserManagement, ["membersByEmail", email, "isSuper"]) == true
	}

	static addMember = (userManagement, member) => {
		let email = _.get(member, "email")
		let infoPath = ["membersByEmail", email]
		if (_.has(userManagement, infoPath)) {
			throw "Member already exists"
		}

		let nextUserManagement = _.set(userManagement, infoPath, member)

		return nextUserManagement
	}
}
