import React from 'react';

/**
 * Add highlight styles to provided query matches
 */
const highlightText = (text, query = null) => {
  if (!query) {
      return text;
  }

  const re = new RegExp(query.replace(/\$/ig, '\\$1'), 'ig');

  let builders = [], i = 0, match = re.exec(text);
  while(match) {
    const m = match[0];
    builders.push(text.substr(0, match.index));
    builders.push(<span key={i} className="mark">{m}</span>);
    builders.push(text.substr(match.index + m.length));

    i++;
    match = re.exec(text);
  }

  if (builders.length === 0) {
    return text;
  }

  return builders;
}

/**
 * format Date to readable string
 */
const formatDateTimeString = (dt) => (
  `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`
);

const FeedItem = ({ query, item }) => {
  const classes = ['feed-item'];
  if (item.text.length >= 140) {
    classes.push('big');
  }

  return (
    <li className={classes.join(' ')} style={{backgroundImage: `url('${item.user_profile_img}')`}}>
      <p>
        <strong>
          <a href={`https://twitter.com/${item.user_screen_name}`} target="_blank">{item.user_name}</a>
        </strong>
        {highlightText(item.text, query)}
      </p>
      <small>{formatDateTimeString(new Date(item.created_at))}</small>
    </li>
  );
};

export default FeedItem;
