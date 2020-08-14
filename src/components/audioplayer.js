import React, { Component } from "react"
import WaveSurfer from "wavesurfer.js"
import audioPlayerStyles from "../styles/audioplayer.module.css"
import playButton from "../img/play.png"
import pauseButton from "../img/pause.png"

// TODO
// - Add Preloading to speed up loading times
// - Change/Remove cursor
// - Improve play/pause button functionaility:
//   - Needs to work when using media keys
//   - Needs to switch to paused when reaching end of song

export default class Waveform extends Component {
  constructor(props) {
    super(props)
    this.togglePlayback = this.togglePlayback.bind(this)
    this.state = {
      hasBeenPlayed: false,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
    }
  }

  togglePlayback(e) {
    e.stopPropagation()
    if (!this.state.hasBeenPlayed) this.wavesurfer.backend.ac.resume()
    this.wavesurfer.playPause()
    this.setState(prevState => ({
      hasBeenPlayed: true,
      isPlaying: !prevState.isPlaying,
    }))
  }

  formatTime(totalSeconds) {
    let seconds = Math.floor(totalSeconds % 60)
    const minutes = Math.floor(totalSeconds / 60)
    if (seconds < 10) {
      seconds = `0${seconds}`
    }
    return `${minutes}:${seconds}`
  }

  componentDidMount() {
    this.wavesurfer = WaveSurfer.create({
      audioContext: this.audioContext,
      responsive: true,
      normalize: true,
      hideScrollbar: true,
      backend: "MediaElement",
      container: `#waveform-${this.props.id}`,
      waveColor: "#ccc",
      progressColor: "#BE6065",
      barHeight: 1,
      barWidth: 3,
      barRadius: 2,
      height: 75,
      pixelRatio: 1,
      minPxPerSec: 200,
    })
    try {
      this.wavesurfer.load(this.props.src)

      // Set current time and duration of audio
      this.wavesurfer.on("ready", () => {
        const currentTime = this.wavesurfer.getCurrentTime()
        const duration = this.wavesurfer.getDuration()
        this.setState({
          currentTime,
          duration,
        })
      })

      // Updates currentTime
      this.wavesurfer.on("audioprocess", () => {
        const currentTime = this.wavesurfer.getCurrentTime()
        this.setState({
          currentTime,
        })
      })
    } catch (error) {
      console.error(error)
    }
  }
  componentWillUnmount() {
    this.wavesurfer.destroy()
  }
  render() {
    return (
      <div className={audioPlayerStyles.player}>
        <div id={`waveform-${this.props.id}`} className="waveform"></div>
        <div className={audioPlayerStyles.media_controls}>
          <p>{this.formatTime(this.state.currentTime)}</p>
          <button
            className={audioPlayerStyles.play_button}
            onClick={this.togglePlayback}
            aria-label={this.state.isPlaying ? "Pause" : "Play"}
          >
            <img
              className={audioPlayerStyles.button_image}
              src={this.state.isPlaying ? pauseButton : playButton}
              alt={this.state.isPlaying ? "Pause" : "Play"}
            ></img>
          </button>
          <p>{this.formatTime(this.state.duration)}</p>
        </div>
      </div>
    )
  }
}
