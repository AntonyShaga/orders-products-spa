import { render, screen, fireEvent } from '@testing-library/react'
import { Pagination } from '@/shared/ui/pagination/Pagination'

describe('Pagination', () => {
  it('renders correct range', () => {
    render(<Pagination page={0} total={20} pageSize={5} onPageChange={jest.fn()} />)

    expect(screen.getByText('1–5 of 20')).toBeInTheDocument()
  })

  it('disables prev button on first page', () => {
    render(<Pagination page={0} total={20} pageSize={5} onPageChange={jest.fn()} />)

    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toBeDisabled()
  })

  it('disables next button on last page', () => {
    render(<Pagination page={3} total={20} pageSize={5} onPageChange={jest.fn()} />)

    const buttons = screen.getAllByRole('button')
    expect(buttons[1]).toBeDisabled()
  })

  it('calls onPageChange', () => {
    const onChange = jest.fn()

    render(<Pagination page={1} total={20} pageSize={5} onPageChange={onChange} />)

    const buttons = screen.getAllByRole('button')

    fireEvent.click(buttons[0])
    expect(onChange).toHaveBeenCalledWith(0)

    fireEvent.click(buttons[1])
    expect(onChange).toHaveBeenCalledWith(2)
  })
})
