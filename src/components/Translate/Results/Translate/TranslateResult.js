// TranslateResult component contain drop down menu allow user to select language
// display the translated word from API
import React, { Component } from 'react';
import axios from 'axios';
import languageDict from '../../../../helpers/languageMap.js';

class TranslateResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: [],
      translatedKeywords: [],
      targetLanguage: 'en',
      languagesArray: []
    }

    this.onDropdownSelect = this.onDropdownSelect.bind(this);
    this.onLanguageSelect = this.onLanguageSelect.bind(this);
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

  render() {
    return (
      <div className="results-page">

        <div className="results-select-language">
          {this.state.languagesArray.map((language) => {
            return (
              <div key={language} className="language-option" onClick={this.onLanguageSelect}>{language}</div>
            )
          })}

          {/*<select name="languagelist" form="languageform" onChange={this.onDropdownSelect}>
            {this.state.languagesArray.map((language) => {
              return (
                <option key={language} value={language}>{language}</option>
              )
            })}
          </select>*/}
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