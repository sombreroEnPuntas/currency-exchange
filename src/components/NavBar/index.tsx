import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const pages = [
  { href: '/pockets', label: 'Pockets' },
  { href: '/exchange', label: 'Exchange' },
  { href: '/', label: 'About' },
]

const NavLink = ({ href, label }) => {
  const router = useRouter()

  return (
    <li>
      <Link href={href}>
        <a className={`menu-item${router.pathname === href ? ' active' : ''}`}>
          {label}
        </a>
      </Link>
    </li>
  )
}

const NavBar = () => (
  <div className="terminal-nav header">
    <div className="terminal-logo">
      <div className="logo terminal-prompt">
        <a href="#" className="no-style">
          {'currency-exchange'}
        </a>
      </div>
    </div>
    <nav className="terminal-menu">
      <ul>
        {pages.map((page) => (
          <NavLink key={`menu-item-${page.label}`} {...page} />
        ))}
      </ul>
    </nav>
  </div>
)

export default NavBar
