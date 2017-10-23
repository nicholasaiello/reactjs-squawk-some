import React from 'react';

const AppNav = ({ query, fltr, onNavToggle, onSearchChange, onSubmit, onFilterChange }) => {

  const handleSearchChange = function(e) {
    const query = e.target.value || '';
    if (query || e.inputType === 'deleteContentBackward') {
      onSearchChange(e, query);
    }
  };

  const handleSearchSubmit = function(e) {
    e.preventDefault();

    const form = e.target,
      query = form.srch.value,
      fltr = form.fltr.value;

    // TODO clean-up
    window.localStorage.setItem('_lastQuery', query);

    if (query) {
      onSubmit(e, query, fltr);
    }
  };

  const handleFilterChange = function(e) {
    const fltr = e.target.value || '';
    if (fltr || e.inputType === 'deleteContentBackward') {
      onFilterChange(e, fltr);
    }
  };

  let fltrProps = {};
  if (!query || query.length < 2) {
    fltrProps['disabled'] = '1';
  }

  return (
    <nav>
      <button className="nav-btn" onClick={onNavToggle}></button>
      <form name="search-form" onSubmit={(e) => handleSearchSubmit(e.nativeEvent)}>
        <input
          type="search"
          name="srch"
          defaultValue={query}
          maxLength={16}
          placeholder="search for something..."
          onInput={(e) => handleSearchChange(e.nativeEvent)} />
        <label>&rarr;</label>
        <input
          type="text"
          name="fltr"
          value={fltr}
          minLength={2}
          maxLength={16}
          placeholder="filter results..."
          {...fltrProps}
          onInput={(e) => handleFilterChange(e.nativeEvent)} />
        <input type="submit" />
      </form>
    </nav>
  );
};

export default AppNav;
