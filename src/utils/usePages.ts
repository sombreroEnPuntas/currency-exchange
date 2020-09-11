import { useEffect, useState } from 'react'

interface Deps {
  list: any[]
  pageSize: number
}
const usePages = ({ list, pageSize }: Deps) => {
  const [cursor, setCursor] = useState(0)
  const [pages, setPages] = useState([])

  useEffect(() => {
    setPages(
      list.reduce((all, page, index) => {
        const currentPage = Math.floor(index / pageSize)
        all[currentPage] = [].concat(all[currentPage] || [], page)
        return all
      }, [])
    )
  }, [list, pageSize])

  return {
    handleBack: () => setCursor(cursor - 1 < 0 ? pages.length - 1 : cursor - 1),
    handleNext: () => setCursor(cursor + 1 > pages.length - 1 ? 0 : cursor + 1),
    page: pages[cursor] || [],
    pageNumber: cursor + 1,
    totalPages: pages.length,
  }
}

export default usePages
