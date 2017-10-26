import React from 'react';

// TODO receive data via WebSockets
const AppTicker = ({ query, symbol, open, close, low, high, volume, updated }) => {

  if (query.charAt(0) !== '$') {
    return (
      <div className="ticker">
        no info available for &nbsp;<strong>{query}</strong>.
      </div>
    );
  } else if (!symbol || (query.substr(1).toUpperCase() !== symbol)) {
    return (
      <div className="ticker">
        loading price info for &nbsp;<strong>{query}</strong>...
      </div>
    );
  }

  return (
    <div className="ticker">
      <h4>{symbol.toUpperCase()}</h4>
      <figure>
        <label>last tick:</label>
        <figcaption>
          ${parseFloat(close).toLocaleString('en')}
        </figcaption>
      </figure>
      <figure>
        <label>open:</label>
        <figcaption>
          ${parseFloat(open).toLocaleString('en')}
        </figcaption>
      </figure>
      <figure>
        <label>low/high:</label>
        <figcaption>
          ${parseFloat(low).toLocaleString('en')} /
          ${parseFloat(high).toLocaleString('en')}
        </figcaption>
      </figure>
      <figure>
        <label>volume:</label>
        <figcaption>
          {parseInt(volume).toLocaleString('en')}
        </figcaption>
      </figure>
      <figure>
        <label>updated:</label>
        <figcaption>
          {new Date(updated).toLocaleString()}
        </figcaption>
      </figure>
    </div>
  );

};

export default AppTicker;
