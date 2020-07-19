import { useContext, useMemo } from 'react'
import ResponsiveContext from '../core/context/ResponsiveContext'

export type ResponsivePropertyArray<T> = T[]

export type ResponsivePropertyObject<T> = { [name: string]: T }

type ResponsiveProperty<T> = T | ResponsivePropertyArray<T> | ResponsivePropertyObject<T>

const useResponsive = (selection?: string[]) => {
  const { breakpoints, validKeys } = useContext(ResponsiveContext)

  const validSelection = useMemo(() => {
    const selectedKeys = selection || breakpoints.keys
    return validKeys.filter(
      (key: string) => selectedKeys.includes(key)
    )
  }, [selection, validKeys])

  return <T>(property: ResponsiveProperty<T>) => {

    let validValues: ResponsivePropertyObject<T> = {}
    // In case of array specification
    if (Array.isArray(property)) {
      const array = property as ResponsivePropertyArray<T>
      validValues = validSelection
        .reduce<ResponsivePropertyObject<T>>((res, key, index) => {
          res[key] = array[index]
          return res
        }, {})
    }
    // In case of object specification
    else if (typeof property === 'object') {
      validValues = property as ResponsivePropertyObject<T>
    }
    // Any other type of value is simply returned
    else {
      return property as T
    }

    const key = validSelection.reverse().find((key: string) => {
      const value = validValues[key]
      return !!value
    })

    return key ? validValues[key] : null
  }
}

export default useResponsive
