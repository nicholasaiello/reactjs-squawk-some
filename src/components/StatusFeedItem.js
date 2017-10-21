import React from 'react';

const highlightTweetText = (text, query = null) => {
  let match, builders = [], i = 0;
  const re = new RegExp(query, 'ig');

  while((match = re.exec(text))) {
    const m = match[0];
    builders.push(text.substr(0, match.index));
    builders.push(<span key={i} className="mark">{m}</span>);
    builders.push(text.substr(match.index + m.length));

    i++;
  }

  if (builders.length === 0) {
    return text;
  }

  // console.log(builders);

  return builders;
}

const FeedItem = ({ query, item }) => (
  <li className={"feed-item"} style={{backgroundImage: `url('${item.user_profile_img}')`}}>
    <p>
      <strong>
        <a href={`https://twitter.com/${item.user_screen_name}`} target="_blank">{item.user_name}</a>
      </strong>
      {highlightTweetText(item.text, query)}
    </p>
    <small>{item.created_at}</small>
  </li>
);

export default FeedItem;
