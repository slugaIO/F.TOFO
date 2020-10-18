import React from 'react';
import {Form, Row, Col, Card,OverlayTrigger, Tooltip} from 'react-bootstrap';
import {Button, Container} from 'react-bootstrap';
import {DatePickerInput } from 'rc-datepicker';
import TaskEditor from './inc/edit-task'
import base64 from 'react-native-base64'

class EditTask extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:'',
            selectedDate: new Date().toString(),
            taskContent:'my task',
            redirect:false
        }
    }
    // is set by the Editor
    setTaskContent = (content) => {
        this.setState({
            taskContent:base64.encode(content)
        })
    }
    onChange = (date) => {
		this.setState({
            selectedDate: `${date}`
            
        });
    }
    handleChange = (e) => {
        let change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }
    render() {
        return (
            <Container fluid>
            <h2>Edit Task #{this.props.match.params.id}</h2>
                <Card>
                <Card.Header>Task Manager</Card.Header>
                <Card.Body>
                <Row>
                    <Col>
                        <TaskEditor setTaskContent={this.setTaskContent}/>
                    </Col>
                    <Col>
                        <Form>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control name='title' value={this.state.title} type="text" onChange={this.handleChange} autoComplete="off"/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Timing</Form.Label>
                                    <DatePickerInput onChange={this.onChange} value={this.state.selectedDate} className='my-custom-datepicker-component'/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col />
                            <Col>
                                <Form.Group>
                                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={this.renderTooltip}>
                                        <Button variant="success" type="submit" onClick={this.addTask}>
                                            add Task
                                        </Button>
                                    </OverlayTrigger>
                                </Form.Group>
                            </Col>
                        </Row>
                        </Form>
                    </Col>
                </Row>
                </Card.Body>
                </Card>
            </Container>
        )
    }
}

export default EditTask;