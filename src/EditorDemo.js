/* @flow */
import React, {Component} from 'react';
import RichTextEditor, {createEmptyValue} from './RichTextEditor';
import {convertToRaw} from 'draft-js';
import autobind from 'class-autobind';

import type {EditorValue} from './RichTextEditor';

type Props = {};
type State = {
  value: EditorValue;
  format: string;
  readOnly: boolean;
};

export default class EditorDemo extends Component {
  props: Props;
  state: State;

  constructor() {
    super(...arguments);
    autobind(this);
    this.state = {
      value: createEmptyValue(),
      format: 'html',
      readOnly: false,
    };
  }

  render() {
    let {value, format} = this.state;

    const toolbarConfig = {
      extraProps: { tabIndex: -1},
      display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'PLACEHOLDER_DROPDOWN', 'PLACEHOLDER_CONTAINER'],
      INLINE_STYLE_BUTTONS: [
        {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
        {label: 'Italic', style: 'ITALIC'},
      ],
      BLOCK_TYPE_BUTTONS: [
        {label: 'UL', style: 'unordered-list-item'},
        {label: 'OL', style: 'ordered-list-item'},
        {label: 'Heading', style: 'header-one'},
      ],
      PLACEHOLDER_DROPDOWN: [
        {label: 'Recipient', key: 'recipient', options: [
          {label: 'Full Name', data: 'to.full_name'},
          {label: 'First Name', data: 'to.first_name'},
          {label: 'Last Name', data: 'to.last_name'},
        ]},
        {label: 'Sender', key: 'sender', options: [
          {label: 'Full Name', data: 'from.full_name'},
          {label: 'First Name', data: 'from.first_name'},
          {label: 'Last Name', data: 'from.last_name'},
        ]},
        {label: 'Organization', key: 'organization', options: [
          {label: 'Name', data: 'organization.name'},
        ]},
      ],
      PLACEHOLDER_CONTAINER: [
        {label: 'Recipient', key: 'recipient', options: [
          {label: 'Full Name', data: 'to.full_name'},
          {label: 'First Name', data: 'to.first_name'},
          {label: 'Last Name', data: 'to.last_name'},
        ]},
        {label: 'Sender', key: 'sender', options: [
          {label: 'Full Name', data: 'from.full_name'},
          {label: 'First Name', data: 'from.first_name'},
          {label: 'Last Name', data: 'from.last_name'},
        ]},
        {label: 'Organization', key: 'organization', options: [
          {label: 'Name', data: 'organization.name'},
        ]},
      ],
    };

    return (
      <div className="editor-demo">
        <div className="row">
          <p>This is a demo of the <a href="https://github.com/sstur/react-rte" target="top">react-rte</a> editor.</p>
        </div>
        <div className="row">
          <RichTextEditor
            toolbarConfig={toolbarConfig}
            value={value}
            onChange={this._onChange}
            className="react-rte-demo"
            placeholder="Tell a story"
            toolbarClassName="demo-toolbar"
            editorClassName="demo-editor"
            readOnly={this.state.readOnly}
          />
        </div>
        <div className="row">
          <label className="radio-item">
            <input
              type="radio"
              name="format"
              value="html"
              checked={format === 'html'}
              onChange={this._onChangeFormat}
            />
            <span>HTML</span>
          </label>
          <label className="radio-item">
            <input
              type="radio"
              name="format"
              value="markdown"
              checked={format === 'markdown'}
              onChange={this._onChangeFormat}
            />
            <span>Markdown</span>
          </label>
          <label className="radio-item">
            <input
              type="checkbox"
              onChange={this._onChangeReadOnly}
              checked={this.state.readOnly}
            />
            <span>Editor is read-only</span>
          </label>
        </div>
        <div className="row">
          <textarea
            className="source"
            placeholder="Editor Source"
            value={value.toString(format)}
            onChange={this._onChangeSource}
          />
        </div>
        <div className="row btn-row">
          <span className="label">Debugging:</span>
          <button className="btn" onClick={this._logState}>Log Content State</button>
          <button className="btn" onClick={this._logStateRaw}>Log Raw</button>
        </div>
      </div>
    );
  }

  _logState() {
    let editorState = this.state.value.getEditorState();
    let contentState = window.contentState = editorState.getCurrentContent().toJS();
    console.log(contentState);
  }

  _logStateRaw() {
    let editorState = this.state.value.getEditorState();
    let contentState = editorState.getCurrentContent();
    let rawContentState = window.rawContentState = convertToRaw(contentState);
    console.log(JSON.stringify(rawContentState));
  }

  _onChange(value: EditorValue) {
    this.setState({value});
  }

  _onChangeSource(event: Object) {
    let source = event.target.value;
    let oldValue = this.state.value;
    this.setState({
      value: oldValue.setContentFromString(source, this.state.format),
    });
  }

  _onChangeFormat(event: Object) {
    this.setState({format: event.target.value});
  }

  _onChangeReadOnly(event: Object) {
    this.setState({readOnly: event.target.checked});
  }
}
