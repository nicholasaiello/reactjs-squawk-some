import React, { Component } from 'react';

import { DEFAULT_SYNC_INTERVAL } from '../constants/Env';

// TODO need to restart on search/filter actions
export default class AppSyncProgressBar extends Component {

  constructor(props) {
    super(props);
    this.progressStep = 0;
    this.progressTimeoutId = 0;
    this.state = { enabled: props.enabled };
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      const { style } = this.refs.progressBar,
        { progressInterval } = this.props;

      style.transition = `all ${progressInterval}ms linear`;
      this.handleProgressChange();
    });
  }

  resetProgress() {
    clearTimeout(this.progressTimeoutId);
    this.progressTimeoutId = 0;
    this.progressStep = -1;
  }

  // TODO refactor?
  handleProgressChange = () => {
    const { enabled } = this.state;
    if (enabled) {
      const { style } = this.refs.progressBar,
        { progressInterval } = this.props;

      requestAnimationFrame(() => {
        style.width = `${this.progressStep}%`;
      });

      const nextStep = this.progressStep + 1;
      if (nextStep <= 100) {
        this.progressStep = nextStep;
        this.progressTimeoutId = setTimeout(() => {
          this.handleProgressChange();
        }, progressInterval);
      } else {
        this.props.onProgressComplete();
        this.resetProgress();

        this.handleProgressChange();
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
  progressInterval: (DEFAULT_SYNC_INTERVAL / 100),
  onProgressComplete: () => {}
};
