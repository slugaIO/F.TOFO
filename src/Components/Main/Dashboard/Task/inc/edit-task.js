import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';

const text = "task...";

export default class TaskEditor extends Component {
  constructor(props){
    super(props);
    this.setTaskContent = this.props.setTaskContent.bind(this);
  }
  state = {
    editorState: createEditorStateWithText(text)
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.setTaskContent(editorState.getCurrentContent().getPlainText('\u0001'));
  }

  render() {
    return (
      <div>
        <div /*className={editorStyles.editor}*/ onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}