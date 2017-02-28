/* @flow */
import React, {Component} from 'react';
import autobind from 'class-autobind';
// import cx from 'classnames';

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

export default class Flyout extends Component {
  props: Props;

  constructor() {
    super(...arguments);
    this.state = {open: null};
    autobind(this);
  }

  render() {
    let {choices, selectedKey, className, ...otherProps} = this.props;
    // className = cx(className, styles.root);
    let selectedItem = (selectedKey == null) ? null : choices.get(selectedKey);
    let selectedValue = selectedItem && selectedItem.label || '';
    return (
      <ul className={className} title={selectedValue} style={{position: 'absolute', zIndex: 5000}}>
        {choices.map((choice) => (
          <li
            {...otherProps}
            key={choice.key}
            data-id={choice.key}
            value={selectedKey}
            onMouseEnter={this._handleMouseEnter}
            // onMouseLeave={this._handleMouseLeave}
          >
            {choice.label}
            {this.state.open === choice.key &&
              <ul
                style={{
                  position: 'absolute',
                  zIndex: 5000,
                  marginTop: '-16px',
                  left: '75px',
                }}
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
        <li key={option.data} onClick={() => this._onChange(option.data)}>{option.label}</li>
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

  _handleMouseLeave() {
    this.setState({open: null});
  }
}
