import React from "react"
import Header from "../components/header"

export default function Layout({ children }) {
  return (
    <div style={{ margin: `2rem auto`, maxWidth: 900, padding: `0 0.5rem` }}>
      <Header />
      {children}
    </div>
  )
}