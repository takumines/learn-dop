import { _ } from './lib/fp-lodash.js'

const diffObjects = (data1, data2) => {
	let emptyObject = _.isArray(data1) ? [] : {}
	if (_.isEqual(data1, data2)) {
		return emptyObject
	}
	let keys = _.union(_.keys(data1), _.keys(data2))

	return _.reduce(
		keys,
		(acc, k) => {
			let res = diff(_.get(data1, k), _.get(data2, k))
			if ((_.isObject(res) && _.isEmpty(res)) || (res === "no-diff")) {
				return acc
			}

			return _.set(acc, [k], res)
		},
		emptyObject
	)
}

export const diff = (data1, data2) => {
	if (_.isObject(data1) && _.isObject(data2)) {
		return diffObjects(data1, data2)
	}

	if (data1 !== data2) {
		return data2
	}

	// ２つの値が同じことを示す文字列を返す
	return "no-diff"
}

export const informationPaths = (obj, path = []) => {
	return _.reduce(
		obj,
		(acc, v, k) => {
			if (_.isObject(v)) {
				return _.concat(acc, informationPaths(v, _.concat(path, k)))
			}

			return _.concat(acc, [_.concat(path, k)])
		},
		[]
	)
}

export const havePathInCommon = (diff1, diff2) => {
	return !_.isEmpty(_.intersection(informationPaths(diff1), informationPaths(diff2)))
}
