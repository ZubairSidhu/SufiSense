import React from "react"
import poemStyles from "../styles/poem.module.css"

class Poem extends React.Component {
  // TODO: Add slider to switch between displayed language
  // state = {
  //   sliderValue: "Both",
  // }
  // sliderChange = event => {
  //   const target = event.target
  //   const value = target.value
  //   this.setState({
  //     sliderValue: value,
  //   })
  // }

  // Create rows for each pairing of original and translated text
  createPoem = () => {
    let poem = []
    for (let i = 0; i < this.props.original_text.length; i++) {
      poem.push(
        <div key={i} className={poemStyles.poem_row}>
          <div className={poemStyles.original_col}>
            <p>{this.props.original_text[i]}</p>
          </div>
          <div className={poemStyles.translated_col}>
            <p>{this.props.translated_text[i]}</p>
          </div>
        </div>
      )
    }
    return poem
  }

  render() {
    return (
      <div>
        {/* TODO: Add slider here */}
        <div className={poemStyles.poem_wrapper}>
          <div className={poemStyles.poem_row}>
            <div className={poemStyles.original_col}>
              <p>
                <b>{this.props.original_language}</b>
              </p>
            </div>
            <div className={poemStyles.translated_col}>
              <p>
                <b>English</b>
              </p>
            </div>
          </div>
          {this.createPoem()}
        </div>
      </div>
    )
  }
}

export default Poem