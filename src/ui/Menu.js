/* @flow */
import React, {Component} from 'react';
import autobind from 'class-autobind';
import cx from 'classnames';

import styles from './Menu.css';

type Item = {
  label: string;
  className?: string;
};

type Props = {
  items: Map<string, Item>;
  selectedKey: ?string;
  onChange: (selectedKey: string) => any;
  className?: string;
};

export default class Menu extends Component {
  props: Props;

  constructor() {
    super(...arguments);
    this.state = {open: null};
    autobind(this);
  }

  render() {
    let {items, className} = this.props;
    className = cx(className, styles.root);
    return (
      <ul className={className}>
        {items.map((item) => (
          <MenuItem item={item} onMouseEnter={this._handleMouseEnter}>
            {this.state.open === item.key &&
              <SubMenu>
                {item.options.map((option) => (
                  <SubMenuItem option={option} onClick={this._onClick} />
                ))}
              </SubMenu>
            }
          </MenuItem>
        ))}
      </ul>
    );
  }

  _onClick(event) {
    const {data} = event.target.dataset;
    this.setState({open: null});
    this.props.onChange(data);
  }

  _handleMouseEnter(event) {
    const {id} = event.target.dataset;
    if (!id) {
      return;
    }
    this.setState({open: id});
  }
}

const MenuItem = (props) => {
  let {className, item, children, onMouseEnter} = props;
  return (
    <li
      className={cx(className, styles.menuitem)}
      label={item.label}
      key={item.key}
      data-id={item.key}
      onMouseEnter={onMouseEnter}
    >
      {item.label}{children}
    </li>);
};

MenuItem.propTypes = {
  className: React.PropTypes.string,
  item: React.PropTypes.object,
  children: React.PropTypes.node,
  onMouseEnter: React.PropTypes.func,
};

const SubMenu = (props) => {
  let {className, children} = props;
  return <ul className={cx(className, styles.root, styles.submenu)}>{children}</ul>;
};

SubMenu.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

const SubMenuItem = (props) => {
  let {className, option, ...otherProps} = props;
  return <li className={cx(className, styles.menuitem)} key={option.data} data-data={option.data} {...otherProps}>{option.label}</li>;
};

SubMenuItem.propTypes = {
  className: React.PropTypes.string,
  label: React.PropTypes.string,
  option: React.PropTypes.object,
  onClick: React.PropTypes.func,
};
