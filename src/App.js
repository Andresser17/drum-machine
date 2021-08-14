import "./App.css";
import { Component } from "react";

const songs = [
  {
    name: "Pages of a book",
    url: "https://freesound.org/data/previews/583/583347_828493-lq.mp3",
  },
  {
    name: "Metal agut",
    url: "https://freesound.org/data/previews/583/583344_828493-lq.mp3",
  },
  {
    name: "MSfxP10 - 83_4 - (Bass Loop - 102.520 BPM)",
    url: "https://freesound.org/data/previews/583/583264_9497060-lq.mp3",
  },
  {
    name: "FX Anti-Gravity Noise Riser 128bpm",
    url: "https://freesound.org/data/previews/583/583134_4819210-lq.mp3",
  },
  {
    name: "Medium Crowd Applause 01",
    url: "https://freesound.org/data/previews/583/583130_6549161-lq.mp3",
  },
  {
    name: "Drums 28 - (174 BPM?)",
    url: "https://freesound.org/data/previews/583/583109_9497060-lq.mp3",
  },
  {
    name: "8 bit helicopter",
    url: "https://freesound.org/data/previews/583/583108_12024110-lq.mp3",
  },
  {
    name: "FX SaSc Glass Tiles Shatter Crash",
    url: "https://freesound.org/data/previews/583/583065_6667441-lq.mp3",
  },
  {
    name: "Dubstep Drop Pattern with fx",
    url: "https://freesound.org/data/previews/583/583000_6094089-lq.mp3",
  },
];

class AudioHelper extends Component {
  constructor(props) {
    super(props);
    this.playSong = this.playSong.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  playSong(e) {
    const audio = e.target.children[0];
    const audioName = this.props.song.name;

    audio.play();
    this.props.onButtonsChange(audio, audioName);
  }

  keyPress(e) {
    const letter = this.props.letter;
    const button = document.getElementById("button-" + letter);
    const audioId = button.children[0].id.toUpperCase();

    if (audioId === e.key.toUpperCase()) {
      button.click();
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyPress);
  }

  render() {
    const letter = this.props.letter;
    const url = this.props.song.url;

    return (
      <button
        onClick={this.playSong}
        id={"button-" + letter}
        className="drum-pad"
      >
        {letter}
        <audio src={url} id={letter} className="clip"></audio>
      </button>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songName: "",
      buttons: [],
    };
    this.onButtonsChange = this.onButtonsChange.bind(this);
  }

  onButtonsChange(audio, name) {
    const buttons = this.state.buttons;
    const inButtons = buttons.some((media) => {
      if (media.id === audio.id) {
        return true;
      }
      return false;
    });

    this.setState({
      songName: name,
    });

    buttons.map((media) => {
      if (media.paused === false && media.id !== audio.id) {
        media.pause();
        media.currentTime = 0;
      }
      return media;
    });

    if (!inButtons) {
      this.setState((state) => {
        return {
          buttons: [...state.buttons, audio],
        };
      });
    }
  }

  render() {
    return (
      <div id="drum-machine">
        <div id="audio-keys">
          <AudioHelper
            onButtonsChange={this.onButtonsChange}
            letter="Q"
            song={songs[0]}
          />
          <AudioHelper
            onButtonsChange={this.onButtonsChange}
            letter="W"
            song={songs[1]}
          />
          <AudioHelper
            onButtonsChange={this.onButtonsChange}
            letter="E"
            song={songs[2]}
          />
          <AudioHelper
            onButtonsChange={this.onButtonsChange}
            letter="A"
            song={songs[3]}
          />
          <AudioHelper
            onButtonsChange={this.onButtonsChange}
            letter="S"
            song={songs[4]}
          />
          <AudioHelper
            onButtonsChange={this.onButtonsChange}
            letter="D"
            song={songs[5]}
          />
          <AudioHelper
            onButtonsChange={this.onButtonsChange}
            letter="Z"
            song={songs[6]}
          />
          <AudioHelper
            onButtonsChange={this.onButtonsChange}
            letter="X"
            song={songs[7]}
          />
          <AudioHelper
            onButtonsChange={this.onButtonsChange}
            letter="C"
            song={songs[8]}
          />
        </div>
        <div id="display">
          <p>{this.state.songName}</p>
        </div>
      </div>
    );
  }
}

export default App;
