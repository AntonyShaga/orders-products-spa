'use client'

import './Pagination.css'

type Props = {
  page: number
  total: number
  pageSize: number
  onPageChange: (page: number) => void
}

export const Pagination = ({ page, total, pageSize, onPageChange }: Props) => {
  const start = page * pageSize + 1
  const end = Math.min((page + 1) * pageSize, total)

  return (
    <div className="pagination">
      <button
        className="pagination__btn"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
      >
        <span className="pagination__arrow pagination__arrow--left" />
      </button>

      <span className="pagination__info">
        {start}–{end} of {total}
      </span>

      <button
        className="pagination__btn"
        onClick={() => onPageChange(page + 1)}
        disabled={(page + 1) * pageSize >= total}
      >
        <span className="pagination__arrow pagination__arrow--right" />
      </button>
    </div>
  )
}
