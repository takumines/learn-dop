import { SystemState } from './system-state.js'
import { Library } from '../code-modules/library.js'

class System {
  addMember (member) {
    let previous = SystemState.get()
    let next = Library.addMember(previous, member)
    SystemState.commit(previous, next)
  }
}
