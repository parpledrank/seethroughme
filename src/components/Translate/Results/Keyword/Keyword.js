import React from 'react'

class Keyword extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <div className="source-language">source language</div>
        <div>
          {this.props.keywords.map((keyword, index) => {
            return (
              <div className="keyword" key={index}>
                <div className>{`${keyword.class} (${keyword.score})`}</div>
                {/*<div className="Score">likelihood: {keyword.score}</div>*/}
              </div>
            );
          })}
        </div>
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