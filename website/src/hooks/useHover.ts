import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const defaultOptions = {
  containsChildren: true,
}

export function useHover<T extends HTMLElement>({ containsChildren } = defaultOptions) {
  const ref = useRef<T>(null)
  const [isHover, setIsHover] = useState(false)

  const enterEvent = containsChildren ?  'mouseover' : 'mouseenter'
  const leaveEvent = containsChildren ? 'mouseleave' : 'mouseout'

  const handleEnter = useCallback(() => {
    setIsHover(true)
  }, [])

  const handleLeave = useCallback(() => {
    setIsHover(false)
  }, [])

  const controls = useMemo(
    () => ({
      over: handleEnter,
      out: handleLeave,
    }),
    [handleLeave, handleEnter],
  )

  useEffect(() => {
    const node = ref.current

    if (!node) {
      return
    }

    node.addEventListener(enterEvent, handleEnter)
    node.addEventListener(leaveEvent, handleLeave)

    return () => {
      node.removeEventListener(enterEvent, handleEnter)
      node.removeEventListener(leaveEvent, handleLeave)
    }
  }, [handleLeave, handleEnter, enterEvent, leaveEvent])

  return [ref, isHover, controls] as const
}
