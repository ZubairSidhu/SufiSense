import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import styled from "styled-components"
import poempostStyles from "../styles/poempost.module.css"
import AudioPlayer from "../components/audioplayer"
import Poem from "../components/poem"
import Layout from "../components/layout"

const HeaderLink = styled(props => <Link {...props} />)`
color: white;
hover: black;
text-decoration: none;
`;

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <div className={poempostStyles.post_box}>
        <div className={poempostStyles.poem_header}>
          <div>
            <HeaderLink to={frontmatter.slug}><h1>{frontmatter.title}</h1></HeaderLink>
            <i>
              <h2>By {frontmatter.author}</h2>
            </i>
          </div>
          <h2>{frontmatter.date}</h2>
        </div>

        <div className={poempostStyles.audio_box}>
          <AudioPlayer src={frontmatter.audio_file} id={frontmatter.post_id} />
        </div>

        <div
          className={poempostStyles.poem_desc}
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
        <div>
          <Poem
            original_language={frontmatter.original_language}
            original_text={frontmatter.original_text}
            translated_text={frontmatter.translated_text}
          />
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
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
`
