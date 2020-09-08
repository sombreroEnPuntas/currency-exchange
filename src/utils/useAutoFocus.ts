import { useRef, useEffect } from 'react'

const useAutoFocus = () => {
  const htmlElRef = useRef(null)

  useEffect(() => {
    htmlElRef.current && htmlElRef.current.focus()
  }, [htmlElRef])

  return htmlElRef
}

export default useAutoFocus
