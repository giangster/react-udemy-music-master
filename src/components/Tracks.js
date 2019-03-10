import React, { Component } from "react";

class Tracks extends Component {
  state = {
    playing: false,
    audio: null,
    playingPreviewUrl: null
  };

  playAudio = previewUrl => () => {
    const audio = new Audio(previewUrl);
    if (!this.state.playing) {
      audio.play();
      this.setState({
        playing: true,
        audio,
        playingPreviewUrl: previewUrl
      });
    } else {
      this.state.audio.pause();
      if (this.state.playingPreviewUrl === previewUrl) {
        this.setState({
          playing: false
        });
      } else {
        audio.play();
        this.setState({
          playing: true,
          audio,
          playingPreviewUrl: previewUrl
        });
      }
    }
  };

  trackIcon = track => {
    if (!track.preview_url) {
      return <span>N/A</span>;
    }

    if (
      this.state.playing &&
      this.state.playingPreviewUrl === track.preview_url
    ) {
      return (
        <span>
          <i style={{ fontSize: 30 }} className="fa">
            &#xf28c;
          </i>
        </span>
      );
    }

    return (
      <span>
        <i style={{ fontSize: 30 }} className="fa">
          &#xf01d;
        </i>
      </span>
    );
  };

  render() {
    const { tracks } = this.props;
    return (
      <div>
        {tracks.map((track, index) => {
          const { name, album, preview_url } = track;
          return (
            <div
              key={index}
              onClick={this.playAudio(preview_url)}
              className="track"
            >
              <img
                src={album.images[0] && album.images[0].url}
                alt={name}
                className="track-image"
              />
              <p className="track-name">{name}</p>
              <p className="track-icon">{this.trackIcon(track)}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Tracks;
