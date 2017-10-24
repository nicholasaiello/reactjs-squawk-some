import React, { Component } from 'react';

import {
  toggleNavDrawer,
  updateNavQuery,
  updateNavFilter, } from '../actions/nav';
import {
  getNewTwitterStream
} from '../actions/streams';

class AppNav extends Component {

  constructor(props) {
    super(props);
    this.storage = window.localStorage;
  }

  handleNavBtnClick = (e) => {
    e.stopPropagation();
    this.props.dispatch(toggleNavDrawer());
  }

  handleSearchChange = (e) => {
    const query = e.target.value || '';
    if (query || e.inputType === 'deleteContentBackward') {
      this.props.dispatch(updateNavQuery(query));
    }
  }

  handleFilterChange = (e) => {
    const fltr = e.target.value || '';

    if (fltr || e.inputType === 'deleteContentBackward') {
      // TODO clean-up
      this.storage.setItem('_lastFilter', fltr);
      this.props.dispatch(updateNavFilter(fltr));
    }
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();

    const form = e.target,
      query = form.srch.value,
      fltr = form.fltr.value;

    if (query) {
      // TODO clean-up
      this.storage.setItem('_lastQuery', query);
      this.props.dispatch(getNewTwitterStream(query, fltr));
      form.srch.blur();
    }
  }

  render() {
    const { query, fltr } = this.props;

    let fltrProps = {};
    if (!query || query.length < 2) {
      fltrProps['disabled'] = '1';
    }

    return (
      <nav>
        <button className="nav-btn" onClick={this.handleNavBtnClick}></button>
        <figure><em>$</em>quawk <em>$</em>ome</figure>
        <form name="search-form" onSubmit={(e) => this.handleSearchSubmit(e.nativeEvent)}>
          <input
            type="search"
            name="srch"
            defaultValue={query}
            maxLength={16}
            placeholder="search for something..."
            onInput={(e) => this.handleSearchChange(e.nativeEvent)} />
          <label>&rarr;</label>
          <input
            type="text"
            name="fltr"
            defaultValue={fltr}
            minLength={2}
            maxLength={16}
            placeholder="filter results..."
            {...fltrProps}
            onInput={(e) => this.handleFilterChange(e.nativeEvent)} />
          <input type="submit" />
        </form>
      </nav>
    );
  }
};

export default AppNav;
