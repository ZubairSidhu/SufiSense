import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import headerStyles from "../styles/header.module.css"

const NavLink = styled(props => <Link {...props} />)`
  color: black;
  text-decoration: none;
`

export default function Header() {
  return (
    <div className={headerStyles.top_bar}>
      <header>
        <figure>
          <img
            className={headerStyles.logo}
            src={"/placeholder.png"}
            alt="SufiSense Logo"
          />
          <figcaption>
            <h4>SubText SubText SubText</h4>
          </figcaption>
        </figure>
        <div className={headerStyles.nav_links}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about/">About</NavLink>
          <NavLink to="/contact/">Contact</NavLink>
        </div>
      </header>
    </div>
  )
}