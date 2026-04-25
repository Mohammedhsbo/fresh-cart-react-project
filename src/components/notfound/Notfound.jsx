import React from 'react'
import { Link } from 'react-router-dom'

export default function Notfound() {
  return (
    <div className="container text-center py-5 mt-5">
      <h1 className="text-success fw-bold display-1 mb-4">404</h1>
      <h3 className="text-muted mb-4">Oops! The page you are looking for does not exist.</h3>
      <Link to="/" className="btn btn-success px-4 py-2 fs-5">
        Return Home
      </Link>
    </div>
  )
}
