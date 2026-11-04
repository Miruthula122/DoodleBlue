import Icon from './Icon.jsx'

function Pagination({ currentPage, totalPages, onChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav className="pagination" aria-label="Student pages">
      <button
        type="button"
        className="page-button"
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <Icon name="left" size={14} />
      </button>

      {pages.map((number) => (
        <button
          key={number}
          type="button"
          className={number === currentPage ? 'page-button active' : 'page-button'}
          onClick={() => onChange(number)}
          aria-current={number === currentPage ? 'page' : undefined}
        >
          {number}
        </button>
      ))}

      <button
        type="button"
        className="page-button"
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <Icon name="right" size={14} />
      </button>
    </nav>
  )
}

export default Pagination
