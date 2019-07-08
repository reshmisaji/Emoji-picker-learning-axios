import React from "react";
import "./App.css";
import axios from "axios";
import emojis from "./private/emoji";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setEmoji = this.setEmoji.bind(this);
    this.modifyEmojiState = this.modifyEmojiState.bind(this);
    this.render = this.render.bind(this);
    this.Emojis = this.Emojis.bind(this);
    this.generateOption = this.generateOption.bind(this);
    this.state = { moji: "", emojis: emojis };
  }

  modifyEmojiState(value) {
    this.setState({ moji: value });
  }

  setEmoji() {
    const emoji = document.getElementById("emoji").value; 
    axios
      .get(`https://www.emojidex.com/api/v1/emoji/${emoji}`)
      .then(res => this.modifyEmojiState(res.data.moji));
  }

  generateOption(key) {
    return <option value={this.state.emojis[key]}>{key}</option>;
  }

  Emojis() {
    const emojis = Object.keys(this.state.emojis).map(key =>
      this.generateOption(key)
    );
    return emojis;
  }

  render() {
    return (
      <div className="App">
        <div className="search">
          <select id="emoji">
            <this.Emojis />
          </select>
          <button onClick={this.setEmoji}>Submit</button>
        </div>
        <div className="emoji">{this.state.moji}</div>
      </div>
    );
  }
}

export default App;
