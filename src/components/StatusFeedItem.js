import React from 'react';

/**
 * Parse text for filter matches
 */
const parseFilter = (i, text, fltr = '', clsName) => {
  fltr = fltr.toLowerCase();
  const str = text.toLowerCase();

  let start;
  if (!fltr ||
       (start = str.indexOf(fltr)) === -1) {
    return [text];
  }

  let end = 0,
    parts = [];
  const len = fltr.length;

  do {
    parts = parts.concat([
      text.substr(end, start),
      <span key={i++} className={`${clsName} filter`}>{text.substr(start, len)}</span>,
      text.substr(start + len)
    ]);

    end = start + len + 1;
    start = str.indexOf(fltr, end);
  } while(start !== -1);

  return parts;
};

/**
 * Add highlight styles to provided query matches
 */
const highlightText = (text, query = null, fltr = null, clsName) => {
  if (!query) {
      return [text];
  }

  const re = new RegExp(query.replace(/(\$|\%|\#|\@)/ig, '\\$1'), 'ig');

  let i = 0,
    parts = [],
    filterParts = [],
    match = re.exec(text);

  while(match) {
    const m = match[0];

    filterParts = parseFilter(i++, text.substr(0, match.index), fltr, clsName);
    if (filterParts.length) {
      parts = parts.concat(filterParts);
      i += filterParts.length / 3;
    }

    parts.push(<span key={i++} className={`${clsName} query`}>{m}</span>);

    filterParts = parseFilter(i++, text.substr(match.index + m.length), fltr, clsName);
    if (filterParts.length) {
      parts = parts.concat(filterParts);
      i += filterParts.length / 3;
    }

    match = re.exec(text);
  }

  if (parts.length === 0) {
    return [text];
  }

  return parts;
}

/**
 * format Date to readable string
 */
const formatDateTimeString = (dt) => (
  `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`
);

const FeedItem = ({ query, fltr, item }) => {
  const classes = ['feed-item'];
  if (item.text.length >= 140) {
    classes.push('big');
  }

  const renderText = (text, query, fltr) => {
    return highlightText(text, query, fltr, "mark");
  };

  return (
    <li className={classes.join(' ')}>
      <img src={`${item.user_profile_img}`} alt={item.user_name} />
      <p>
        <strong>
          <a href={`https://twitter.com/${item.user_screen_name}`} target="_blank">{item.user_name}</a>
        </strong>
        {renderText(item.text, query, fltr)}
      </p>
      <small>{formatDateTimeString(new Date(item.created_at))}</small>
    </li>
  );
};

export default FeedItem;
