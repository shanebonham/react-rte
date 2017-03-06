/* @flow */
import React, {Component} from 'react';
import IconButton from '../ui/IconButton';
import autobind from 'class-autobind';
import cx from 'classnames';

import styles from './MenuContainer.css';

type Props = {
  buttonLabel: string;
  iconName: string;
  className?: string;
  items: Array<Object>;
  onSelect: Function;
};

type State = {
  showMenu: bool;
  open: string;
};

export default class MenuContainer extends Component {
  props: Props;
  state: State;

  constructor() {
    super(...arguments);
    this.state = {
      showMenu: false,
      open: '',
    };
    autobind(this);
  }

  render() {
    let {iconName, className, buttonLabel, items} = this.props;
    // `focusOnClick` will prevent the editor from losing focus when a control button is clicked.
    return (
      <div className={cx(className, styles.root)}>
        <IconButton
          label={buttonLabel}
          iconName={iconName}
          onClick={this.handleButtonClick}
          focusOnClick={false}
        >
        </IconButton>
        {this.state.showMenu &&
          <ul className={styles.menu}>
            {items.map((item) => (
              <MenuItem item={item} key={item.key} onMouseEnter={this.handleMouseEnter}>
                {this.state.open === item.key &&
                  <SubMenu>
                    {item.options.map((option) => (
                      <SubMenuItem
                        key={option.data}
                        data={option.data}
                        label={option.label}
                        onClick={this.handleSubMenuItemClick}
                      />
                    ))}
                  </SubMenu>
                }
              </MenuItem>
            ))}
          </ul>
        }
      </div>
    );
  }

  handleButtonClick() {
    this.setState({showMenu: !this.state.showMenu});
  }

  handleSubMenuItemClick(event: Object) {
    const {data} = event.target.dataset;
    this.props.onSelect(data);
    this.setState({showMenu: false, open: ''});
  }

  handleMouseEnter(event: Object) {
    const {id} = event.target.dataset;
    if (!id) {
      return;
    }
    this.setState({open: id});
  }
}

const Menu = (props) => {
  let {className, children} = props;
  return <ul className={cx(className, styles.menu)}>{children}</ul>;
};

Menu.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

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
  return <ul className={cx(className, styles.menu, styles.submenu)}>{children}</ul>;
};

SubMenu.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
};

const SubMenuItem = (props) => {
  let {className, label, data, onClick} = props;
  return <li className={cx(className, styles.menuitem)} onClick={onClick} data-data={data}>{label}</li>;
};

SubMenuItem.propTypes = {
  className: React.PropTypes.string,
  label: React.PropTypes.string,
  data: React.PropTypes.string,
  onClick: React.PropTypes.func,
};
