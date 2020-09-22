import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [term, setTerm] = useState('Frank Zappa');
  const [results, setResults] = useState([]);


  useEffect(() => {
    const searchWiki = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term
        },
      });
      setResults(data.query.search);
    };

    if (term && !results.length) {
      searchWiki();
    } else {
      const timeoutId = setTimeout(() => {
        if (term) {
          searchWiki();
        }
      }, 600);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [term, results.length]);

  const renderedResults = results.map(res => {
    return (
      <div key={res.pageid} className="item">
        <div className="right floated content">
          <a href={`https://en.wikipedia.org?curid=${res.pageid}`} className="ui button">Go</a>
        </div>
        <div className="content">
          <div className="header">
            {res.title}
          </div>
          <span dangerouslySetInnerHTML={{ __html: res.snippet }}></span>
        </div>
      </div>
    )
  })

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term:</label>
          <input
            className="input"
            onChange={(e) => setTerm(e.target.value)} value={term}
          />
        </div>
      </div>
      <div className="ui celled list">
        {renderedResults}
      </div>
    </div>
  )
}

export default Search;