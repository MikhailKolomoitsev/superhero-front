import React from 'react'
import { NavLink } from 'react-router-dom'

const Created = () => {
  return (
    <div>
      <h3>Hero is Created</h3>
      <NavLink to='/create'>Create One More</NavLink>
      <br />
      <NavLink to='/'>Go to Main Page</NavLink>
    </div>
  )
}

export default Created