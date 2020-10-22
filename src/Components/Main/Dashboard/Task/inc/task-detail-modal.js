 /**
  * @package props Task and Hide State
  * ? Modal to show Task Details
  */
 import React            from 'react';
 import {Modal,Button}   from 'react-bootstrap';
 import base64           from 'react-native-base64';

const TaskDetail = (props) => {
    const style = {
        taskID:{
            borderBottom: '1px solid #CCC',
            fontSize:'12px',
            color:'#2f2f2f'
        }   
    }
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
             {props.task.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {base64.decode(props.task.content)}
            </p>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>OK</Button>
          </Modal.Footer>
        </Modal>
      );
}

export default TaskDetail;