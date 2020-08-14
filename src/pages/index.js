import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PoemPost from "../components/poempost"

// Create PoemPost components for each file in src/markdown-pages
const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Poems = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PoemPost key={edge.node.id} poem={edge.node} />)
  return <Layout>{Poems}</Layout>
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          html
          frontmatter {
            slug
            post_id
            title
            author
            date(formatString: "MMMM DD, YYYY")
            audio_file
            original_language
            original_text
            translated_text
          }
        }
      }
    }
  }
`