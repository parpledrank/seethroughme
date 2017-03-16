import React from 'react'

class Keyword extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="KeywordListContainer">
        {this.props.keywords.map((keyword, index) => {
          return (
            <div className="KeywordContainer" key={index}>
              <span className="Keyword">word: {keyword.class}&nbsp;</span>
              <span className="Score">likelihood: {keyword.score}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Keyword;

// Alternative way render keyword list using div
        /*<table>
          <tr>
            <th>Words</th>
            <th>Score</th>
          </tr>
          {this.props.keywords.map((keyword,index) => {
            return (
              <tr key={index}>
                <td>{keyword.class}</td>
                <td>{keyword.score}</td>
              </tr>
            );
          })}
        </table>*/