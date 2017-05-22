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

  render() {
    return (
      <table className="translation-results-container">
        <thead className="dropdown-item">
          <tr className="target-language">
            <th><span>target language </span></th>
            <th><select name="languagelist" form="languageform" onChange={this.onDropdownSelect}>
              {this.state.languagesArray.map((language) => {
                return (
                  <option key={language} value={language}>{language}</option>
                )
              })}
            </select></th>
          </tr>
        </thead>
        <tbody className="translated-item">
          {this.state.translatedKeywords.map((keyword, index) => {
            return (
              <tr key={index}>
                <td>{keyword}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default TranslateResult;