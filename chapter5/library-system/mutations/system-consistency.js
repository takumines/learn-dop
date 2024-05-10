import { diff, havePathInCommon } from '../diff.js'
import { _ } from '../lib/fp-lodash.js'

export class SystemConsistency {
	static threeWayMerge = (current, previous, next) => {
		let previousToCurrent = diff(previous, current)
		let previousToNext = diff(previous, next)
		if (havePathInCommon(previousToCurrent, previousToNext)) {
			return _.merge(current, previousToNext)
		}

		throw "Conflicting changes"
	}

	static reconcile = (current, previous, next) => {
		if (_.isEqual(current, previous)) {
			// システム状態が計算フェーズで使われたものと同じである場合は、早送りマージを実行
			return next
		}

		return this.threeWayMerge(current, previous, next)
	}
}
