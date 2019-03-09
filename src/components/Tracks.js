import React, { Component } from 'react';

class Tracks extends Component {
    state = {
        playing: false,
        audio: null,
        playingPreviewUrl: null
    }
    playAudio = (previewUrl) => () => {
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
                })
            }

        }
    }

    render() {
        const { tracks } = this.props;
        return (
            <div>
                {tracks.map((track, index) => {
                    const { name, album, preview_url } = track;
                    return (
                        <div key={index} onClick={this.playAudio(preview_url)} style={{ display: 'inline-block', }}>
                            <img
                                src={album.images[0] && album.images[0].url}
                                alt={name}
                                style={{
                                    width: 250,
                                    height: 250,
                                    margin: 50,
                                    objectFit: 'cover'
                                }} />
                            <p>{name}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Tracks;