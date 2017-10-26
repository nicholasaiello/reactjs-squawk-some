import React, { Component } from 'react';

import {
  toggleNavDrawer,
  updateNavQuery,
  updateNavFilter, } from '../actions/nav';
import {
  getNewTwitterStream
} from '../actions/streams';

class AppNav extends Component {

  handleNavBtnClick = (e) => {
    e.stopPropagation();
    this.props.dispatch(toggleNavDrawer());
  }

  handleFilterChange = (e) => {
    e.stopPropagation();
    const { value } = this.refs.fltr;

    if ((value || '') || e.inputType === 'deleteContentBackward') {
      const { dispatch } = this.props;
      dispatch(updateNavFilter(value));
    }
  }

  handleSearchSubmit = (e) => {
    e.preventDefault();

    const { query, fltr } = this.refs;

    if (query.value) {
      query.blur();

      const { dispatch } = this.props;
      dispatch(getNewTwitterStream(query.value, fltr.value));
    }
  }

  render() {
    const { query, fltr } = this.props,
      inputAttrs = {
        minLength: 2,
        maxLength: 16
      };

    let fltrAttrs = {};
    if (!query || query.length < 2) {
      fltrAttrs['disabled'] = '1';
    }

    return (
      <nav>
        <button className="nav-btn" onClick={this.handleNavBtnClick}></button>
        <figure><em>$</em>quawk <em>$</em>ome</figure>
        <form name="search-form" onSubmit={(e) => this.handleSearchSubmit(e.nativeEvent)}>
          <input
            ref="query"
            type="search"
            defaultValue={query}
            placeholder="search, ex. $MSFT"
            {...inputAttrs} />
          <label>&rarr;</label>
          <input
            ref="fltr"
            type="text"
            defaultValue={fltr}
            placeholder="filter results..."
            {...inputAttrs}
            {...fltrAttrs}
            onInput={(e) => this.handleFilterChange(e.nativeEvent)} />
          <input type="submit" />
        </form>
      </nav>
    );
  }
};

export default AppNav;
