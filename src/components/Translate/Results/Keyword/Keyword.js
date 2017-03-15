import React from 'react'

class Keyword extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div className="KeywordListContainer">
        <table>
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
        </table>
      </div>
    );
  }
}

export default Keyword;

// Alternative way render keyword list using div
        /*{this.props.keywords.map((keyword, index) => {
          return (
            <div className="KeywordContainer" key={index}>
              <span className="Keyword">class: {keyword.class}&nbsp;</span>
              <span className="Score">score: {keyword.score}</span>
            </div>
          );
        })}*/