import React from 'react';

import {
  updateNavQuery,
  hideNavDrawer,
  toggleNavDrawer
} from '../actions/nav';
import { addSavedSearch, removeSavedSearch } from '../actions/searches';
import { getNewTwitterStream } from '../actions/streams';

// TODO add dispatch event for OPEN
const AppDrawer = ({ dispatch, open, savedSearches, onOpenToggle }) => {

  const handleOverlayClick = (e) => {
    e.stopPropagation();
    dispatch(toggleNavDrawer());
  }

  const handleSearchClick = (e, query) => {
    e.stopPropagation();
    dispatch(getNewTwitterStream(query, ''));
    dispatch(updateNavQuery(query));
    dispatch(hideNavDrawer());
  };

  const handleAddSearchSubmit = (e) => {
    e.preventDefault();

    const form = e.target,
      query = form.query.value || '';

    if (query && !savedSearches[query]) {
      dispatch(addSavedSearch(query, ''));
      form.query.blur();
      form.reset();
    }
  };

  const handleRemoveSearchClick = (e, query) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to remove "${query}"?`)) {
      dispatch(removeSavedSearch(query));
    }
  };

  const renderSavedSearches = (searches) => (
    Object.keys(searches).map((k,i) => (
      <li
        key={i}
        className="saved-search"
        onClick={(e) => handleSearchClick(e, k)}>
          {k}
          <strong onClick={(e) => handleRemoveSearchClick(e, k)}>x</strong>
      </li>
    ))
  );

  let formProps = {
    minLength: 1, maxLength: 16};
  if (Object.keys(savedSearches).length >= 10) {
    formProps['disabled'] = '1';
  }

  return (
    <aside className={open ? "open" : ''} onClick={handleOverlayClick}>
      <ul onClick={(e) => e.stopPropagation()}>
        <li>
          <h4>Saved Searches</h4>
        </li>
        {renderSavedSearches(savedSearches)}
        <li>
          <form onSubmit={handleAddSearchSubmit}>
            <input
              type="text"
              name="query"
              placeholder="Add a search..."
               {...formProps}
              pattern="^[\w\\$\\#\\@\\+\\s]{1,16}$" />
            <input type="submit" />
          </form>
        </li>
      </ul>
    </aside>
  );

};

export default AppDrawer;
