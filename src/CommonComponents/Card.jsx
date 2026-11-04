function Card({ children, className = '', ...props }) {
  return (
    <section className={className} {...props}>
      {children}
    </section>
  )
}

export default Card