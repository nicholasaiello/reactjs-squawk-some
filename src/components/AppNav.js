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
    e.stopPropagation();
    const query = e.target.value || '';
    if (query || e.inputType === 'deleteContentBackward') {
      const { dispatch } = this.props;
      dispatch(updateNavQuery(query));
    }
  }

  handleFilterChange = (e) => {
    e.stopPropagation();
    const fltr = e.target.value || '';

    if (fltr || e.inputType === 'deleteContentBackward') {
      const { dispatch } = this.props;
      // TODO clean-up
      this.storage.setItem('_lastFilter', fltr);
      dispatch(updateNavFilter(fltr));
    }
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();

    const form = e.target,
      query = form.srch.value,
      fltr = form.fltr.value;

    if (query) {
      const { dispatch } = this.props;
      dispatch(getNewTwitterStream(query, fltr));
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
            maxLength={16}
            placeholder="search for something..."
            onInput={(e) => this.handleSearchChange(e.nativeEvent)} />
          <label>&rarr;</label>
          <input
            type="text"
            name="fltr"
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
