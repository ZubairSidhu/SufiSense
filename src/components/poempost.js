import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import poempostStyles from "../styles/poempost.module.css"
import AudioPlayer from "./audioplayer"
import Poem from "./poem"

const HeaderLink = styled(props => <Link {...props} />)`
  color: white;
  text-decoration: none;
`

const PoemPost = ({ poem }) => (
  <div className={poempostStyles.post_box}>
    <div className={poempostStyles.poem_header}>
      <div>
        <HeaderLink to={poem.frontmatter.slug}>
          <h1>{poem.frontmatter.title}</h1>
        </HeaderLink>
        <i>
          <h2>By {poem.frontmatter.author}</h2>
        </i>
      </div>
      <h2>{poem.frontmatter.date}</h2>
    </div>

    <div className={poempostStyles.audio_box}>
      <AudioPlayer
        src={poem.frontmatter.audio_file}
        id={poem.frontmatter.post_id}
      />
    </div>

    <div
      className={poempostStyles.poem_desc}
      dangerouslySetInnerHTML={{ __html: poem.html }}
    ></div>

    <div>
      <Poem
        original_language={poem.frontmatter.original_language}
        original_text={poem.frontmatter.original_text}
        translated_text={poem.frontmatter.translated_text}
      />
    </div>
  </div>
)

export default PoemPost
