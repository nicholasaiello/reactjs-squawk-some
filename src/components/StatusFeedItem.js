import React from 'react';

/**
 * Add highlight styles to provided query matches
 */
const highlightText = (text, query = null, clsName, parts = []) => {
  if (!query) {
      return [text];
  }

  const re = new RegExp(query.replace(/\$/ig, '\\$1'), 'ig');

  let i = 0, match = re.exec(text);
  while(match) {
    const m = match[0];
    parts.push(text.substr(0, match.index));
    parts.push(<span key={i} className={clsName}>{m}</span>);
    parts.push(text.substr(match.index + m.length));

    i++;
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
    let parts = highlightText(text, query, "mark query", []);

    // apply filter if defined and value not found in query
    // if (fltr && query.toLowerCase().indexOf(fltr.toLowerCase()) === -1) {
    //   console.log(newText)
    //   newText = highlightText(typeof newText === 'string' ? newText : newText.join(''), fltr, "mark filter");
    // }

    return parts;
  };

  return (
    <li className={classes.join(' ')} style={{backgroundImage: `url('${item.user_profile_img}')`}}>
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
