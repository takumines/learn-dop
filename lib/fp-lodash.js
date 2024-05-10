import fp from 'lodash/fp.js';

export const _ = fp.convert({
	// Specify capping iteratee arguments.
	'cap': false,
	// Specify currying.
	'curry': false,
	// Specify fixed arity.
	'fixed': false,
	// Specify immutable operations.
	'immutable': true,
	// Specify rearranging arguments.
	'rearg': false
})
