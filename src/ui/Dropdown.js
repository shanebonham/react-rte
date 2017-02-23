/* @flow */
import React, {Component} from 'react';
import autobind from 'class-autobind';
import cx from 'classnames';

import styles from './Dropdown.css';

type Choice = {
  label: string;
  className?: string;
};

type Props = {
  choices: Map<string, Choice>;
  selectedKey: ?string;
  onChange: (selectedKey: string) => any;
  className?: string;
  defaultChoice?: string;
};

export default class Dropdown extends Component {
  props: Props;

  constructor() {
    super(...arguments);
    autobind(this);
  }

  render() {
    let {choices, selectedKey, defaultChoice, className, ...otherProps} = this.props;
    className = cx(className, styles.root);
    let selectedItem = (selectedKey == null) ? null : choices.get(selectedKey);
    let selectedValue = selectedItem && selectedItem.label || '';
    return (
      <span className={className} title={selectedValue}>
        <select {...otherProps} value={selectedValue} onChange={this._onChange}>
          {defaultChoice &&
            <option>{defaultChoice}</option>
          }
          {this._renderChoices()}
        </select>
        <span className={styles.value}>{selectedValue}</span>
      </span>
    );
  }

  _onChange(event: Object) {
    this.props.onChange(event);
  }

  _renderChoices() {
    let {choices} = this.props;
    return choices.map(({options, label, key, className}) => {
      if (options && options.length) {
        return (
          <optgroup key={key} label={label}>
            { options.map((option) => (
              <option key={option.data} value={option.data} className={option.className}>{option.label}</option>
            ))}
          </optgroup>
        );
      } else {
        return <option key={key} value={key} className={className}>{label}</option>;
      }
    });
  }
}
