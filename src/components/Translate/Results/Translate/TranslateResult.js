// TranslateResult component contain drop down menu allow user to select language
// display the translated word from API
import React, { Component } from 'react';
import axios from 'axios';
import languageDict from '../../../../helpers/languageMap.js';
import { browserHistory } from 'react-router';

class TranslateResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: [],
      translatedKeywords: [],
      targetLanguage: 'en',
      languagesArray: []
    }

    this.languageMap = {};
    this.onDropdownSelect = this.onDropdownSelect.bind(this);
    this.onLanguageSelect = this.onLanguageSelect.bind(this);
    this.storeLanguageReference = this.storeLanguageReference.bind(this);
    this.scrollToLanguage = this.scrollToLanguage.bind(this);
    this.onBackButtonEvent = this.onBackButtonEvent.bind(this);
  }

  componentDidMount() {
    document.body.onkeydown = this.scrollToLanguage;
    window.onpopstate = this.onBackButtonEvent;
  }

  componentWillMount() {
    let tempArray = [];

    for (let key in languageDict) {
      tempArray.push(key);
    }

    this.setState({
      languagesArray: tempArray
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.keywords < 1) {
      const mappedKeywords = this.props.keywords.map(v => v.class);

      this.setState({
        keywords: mappedKeywords
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('onkeydown', this.scrollToLanguage);
  }

  scrollToLanguage(e) {
    const keyValue = String.fromCharCode(e.keyCode);
    const lowerBound = 'A'.charCodeAt(0), upperBound = 'Z'.charCodeAt(0);

    if (e.keyCode >= lowerBound && e.keyCode <= upperBound) {
      this.languageMap[keyValue].scrollIntoView();
    } else {
      return true;
    }
  }

  onBackButtonEvent(e) {
    console.log('going back');
    e.preventDefault();
    browserHistory.goBack();
  }

  onDropdownSelect(e) {
    let languageSelection = languageDict[e.target.value];

    axios.post('/api/translate', {keywords: this.state.keywords, source: 'en', target: languageSelection })
    .then((result) => {
      let translations = result.data.data.translations.map(v => v.translatedText);
      this.setState({
        translatedKeywords: translations
      })
    });
  }

  onLanguageSelect(e) {
    let languageSelection = languageDict[e.currentTarget.textContent];

    axios.post('/api/translate', {keywords: this.state.keywords, source: 'en', target: languageSelection })
    .then((result) => {
      let translations = result.data.data.translations.map(v => v.translatedText);
      this.setState({
        translatedKeywords: translations
      })
    });
  }

  storeLanguageReference(val) {
    //lets access the first letter of the values innerHTML
    const letter = val.innerHTML.charAt(0);

    if (!this.languageMap[letter]) {
      this.languageMap[letter] = val;
    }
  }

  render() {
    return (
      <div className="results-page">

        <div className="results-select-language">
          {this.state.languagesArray.map((language) => {
            return (
              <div 
                key={language} 
                className="language-option" 
                onClick={this.onLanguageSelect}
                ref={this.storeLanguageReference}>{language}</div>
            )
          })}
        </div>

        <table className="results-table">
          <thead>
            <tr>
              <th className="words-header">words</th>
              <th className="scores-header">scores</th>
              <th className="translations-header">translations</th>
            </tr>
          </thead>
          <tbody className="translated-item">
            {this.props.keywords.map((keyword, index) => {
              return (
                <tr key={keyword.class}>
                  <td>{keyword.class}</td>
                  <td>{keyword.score}</td>
                  <td>{this.state.translatedKeywords[index]}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

      </div>
    )
  }
}

export default TranslateResult;