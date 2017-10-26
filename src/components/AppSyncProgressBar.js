import React, { Component } from 'react';

import { DEFAULT_SYNC_INTERVAL } from '../constants/Env';

import {
  incrementProgressBar,
  startProgressBar,
  stopProgressBar
} from '../actions/nav';
import {
  getTwitterStream
} from '../actions/streams';

export default class AppSyncProgressBar extends Component {

  constructor(props) {
    super(props);
    this.progressTimeoutId = 0;
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      const { style } = this.refs.progressBar,
        { progressInterval } = this.props;

      style.transition = `all ${progressInterval}ms linear`;
      this.handleProgressChange();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.progress !== this.props.progress) {
      this.handleProgressChange();
    }
  }

  resetProgress() {
    clearTimeout(this.progressTimeoutId);
    this.progressTimeoutId = 0;
    this.props.dispatch(startProgressBar());
  }

  handleProgressChange = () => {
    const {
      dispatch,
      progress,
      progressInterval
    } = this.props;

    if (progress !== -1) {
      const { style } = this.refs.progressBar;
      requestAnimationFrame(() => {
        style.width = `${progress}%`;
      });

      if (progress <= 100) {
        this.progressTimeoutId = setTimeout(() => {
          clearTimeout(this.progressTimeoutId);
          dispatch(incrementProgressBar());
        }, progressInterval);
      } else {
        dispatch(getTwitterStream());
        this.resetProgress();
      }
    }
  }

  render() {
    return (
      <div className="feed-sync-progressbar">
        <span ref="progressBar" />
      </div>
    );
  }
}

AppSyncProgressBar.defaultProps = {
  progressInterval: (DEFAULT_SYNC_INTERVAL / 100)
};
