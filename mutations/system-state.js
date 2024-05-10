export class SystemState {
  systemData
  previousSystemData

  static get = () => {
    return this.systemData
  }

  static set = (_systemData) => {
    this.systemData = _systemData
  }

  static commit = (previous, next) => {
    let nextSystemData = SystemCnsistency.reconcile(
      this.systemData,
      previous,
      next
    )

    if (!SystemValidity.validate(previous, nextSystemData)) {
      throw 'Invalid state transition'
    }

    this.systemData = nextSystemData
  }

  static undoLastMutation = () => {
    this.systemData = this.previousSystemData
  }

  static reduce = (coll, f, initVal) => {
    let result = initVal
    for (let i = 0; i < coll.length; i++) {
      result = f(result, coll[i])
    }
    return result
  }

}
