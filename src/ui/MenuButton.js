/* @flow */
import React, {Component} from 'react';
import IconButton from '../ui/IconButton';
import autobind from 'class-autobind';
import cx from 'classnames';

import styles from './MenuButton.css';

type Props = {
  style: string;
  children?: ReactNode;
  iconName: string;
  className?: string;
};

export default class MenuButton extends Component {
  props: Props;

  constructor() {
    super(...arguments);
    this.state = {showMenu: false};
    autobind(this);
  }

  render() {
    let {style, iconName, children, className, ...otherProps} = this.props; // eslint-disable-line no-unused-vars
    className = cx(className, styles.root);

    // let iconName = style.toLowerCase();
    // `focusOnClick` will prevent the editor from losing focus when a control
    // button is clicked.
    return (
      <div className={className}>
        <IconButton
          {...otherProps}
          iconName={iconName}
          onClick={this._onClick}
          focusOnClick={false}
        >
          <span className={styles.norgie} />
        </IconButton>
        {this.state.showMenu && this.props.children}
      </div>
    );
  }

  _onClick() {
    this.setState({showMenu: !this.state.showMenu});
  }
}
