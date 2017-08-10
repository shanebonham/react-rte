/* @flow */
import React, {Component} from 'react';
import autobind from 'class-autobind';
import cx from 'classnames';

import styles from './Dropdown.css';

type Choice = {
  label: string;
  className?: string;
  key?: string;
  callback?: Function;
  data?: string;
};

type Props = {
  choices: Map<string, Choice>;
  selectedKey?: ?string;
  onChange: (event: Object) => any;
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
    let options = Array.from(choices.entries());
    return options.map(([key, {label, className}]) => (
      <option key={key} value={key} className={className}>{label}</option>
    ));
    // let {choices} = this.props;
    // return Array.from(choices).map(({options, label, key, className}) => {
    //   console.log(options);
    //   if (options && options.length) {
    //     return (
    //       <optgroup key={key} label={label}>
    //         {options.map((option) => (
    //           <option key={option.data} value={option.data} className={option.className}>{option.label}</option>
    //         ))}
    //       </optgroup>
    //     );
    //   } else {
    //     return <option key={key} value={key} className={className}>{label}</option>;
    //   }
    // });
  }
}
