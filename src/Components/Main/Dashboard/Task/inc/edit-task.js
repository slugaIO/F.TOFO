import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';


export default class TaskEditor extends Component {
  constructor(props){
    super(props);
    this.setTaskContent = this.props.setTaskContent.bind(this);
  }
  state = {
    editorState: createEditorStateWithText(this.props.taskContent)
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
        <div onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}