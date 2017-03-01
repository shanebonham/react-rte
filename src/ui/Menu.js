/* @flow */
import React, {Component} from 'react';
import autobind from 'class-autobind';
import cx from 'classnames';

// import styles from './Dropdown.css';

type Choice = {
  label: string;
  className?: string;
};

type Props = {
  choices: Map<string, Choice>;
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
    let {choices, className, ...otherProps} = this.props;
    // className = cx(className, styles.root, 'menu');
    className = cx(className, 'menu');
    return (
      <ul className={className}>
        {choices.map((choice) => (
          <li
            {...otherProps}
            key={choice.key}
            data-id={choice.key}
            className="menu-item"
            onMouseEnter={this._handleMouseEnter}
          >
            {choice.label}
            {this.state.open === choice.key &&
              <ul
                className="sub-menu"
              >{this._renderChoices(choice.options)}</ul>
            }
          </li>
        ))}
      </ul>
    );
  }

  _renderChoices(options) {
    return options.map((option) => {
      return (
        <li className="sub-menu-item" key={option.data} onClick={() => this._onChange(option.data)}>{option.label}</li>
      );
    });
  }

  _onChange(data) {
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

// const MenuItem = (props) => {
//   return <li className={props.className}>{props.children}</li>;
// };
//
// MenuItem.propTypes = {
//   children: React.propTypes.string,
// };
//
// const SubMenu = (props) => {
//   return <ul className={cx(props.className, 'sub-menu')}>{props.children}</ul>;
// }
//
// const SubMenuItem = (props) => {
//   return <li className={cx(props.className, 'sub-menu-item')}>{props.children}</li>
// }
