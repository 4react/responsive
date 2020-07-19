import invert from 'lodash/invert'
import BreakpointsMap from './BreakpointsMap'

class Breakpoints {
  public map: BreakpointsMap
  public keys: string[] = []

  constructor(map: BreakpointsMap) {
    const keys = Object
      .keys(map)
      .sort((k1, k2) => map[k1] - map[k2])

    if (keys.length && map[keys[0]] > 0) {
      keys.unshift('default')
      map['default'] = 0
    }

    this.map = map
    this.keys = keys


    const byValue = invert(map)
    if (!byValue.hasOwnProperty(0)) {
      byValue[0] = 'default'
    }
  }

  valueOf(key: string): number {
    return this.map[key]
  }

  indexOf(key: string): number {
    return this.keys.indexOf(key)
  }

  get values(): number[] {
    return this.keys.map(key => this.valueOf(key))
  }
}

export default Breakpoints
