const watchMedia = (min: number, max?: number) => {
  let mediaQuery = `(min-width: ${min}px)`
  if (max) {
    mediaQuery += ` and (max-width: ${max}px)`
  }

  return window.matchMedia(mediaQuery)
}

export default watchMedia
