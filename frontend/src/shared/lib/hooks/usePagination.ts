import { useState } from 'react'

export const usePagination = <T>(data: T[], pageSize: number) => {
  const [page, setPage] = useState(0)

  const total = data.length

  const paginatedData = data.slice(page * pageSize, (page + 1) * pageSize)

  return {
    page,
    setPage,
    total,
    pageSize,
    paginatedData,
  }
}
