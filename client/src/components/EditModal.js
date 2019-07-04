import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import FormValidator from "../utils/FormValidator";
import './Header.css'


export default class EditModal extends React.Component {
    constructor(props) {
      super(props);
  

      this.validator = new FormValidator([
        { 
          field: 'question', 
          method: 'isEmpty', 
          validWhen: false, 
          message: 'Title is required.' 
        },
        { 
          field: 'answers', 
          method: 'isEmpty', 
          validWhen: false, 
          message: 'Add answer.'
        }
      ]);
  
  
      this.submitted = false;
  
      this.state = {
        show: false,
        question: '',
        answers: [],
        validation: this.validator.valid(),
        message: ''
      };
    }
  
    handleClose = () => {
      this.setState({ show: false });
    }
  
    handleShow = () => {
      this.setState({ show: true });
    }

    onChangeQuestion = event => {
      this.setState({
        question : event.target.value,
      });
    }


    onChangeAnswer = (e, index) => {
        this.state.answers[index] = e.target.value
        
      this.setState({
         answers : this.state.answers,
      });
    }

    addAnsewr = (e) => {
        e.preventDefault()
        if(this.state.answers.length < 5){
       this.setState({
          answers: [...this.state.answers, ''] 
       })
    } else {
       this.setState({
           message: 'Max. 5 answers are allowed, '
       })
    }
    }
    
    handelRemove = (e,index) => {
        e.preventDefault()
      this.state.answers.splice(index, 1)

      this.setState({
          answers: this.state.answers
      })
    }

    onSubmit = (e) => {
      e.preventDefault()
      const validation = this.validator.validate(this.state);
      this.setState({ validation });
    
      if(this.state.answers.length <= 1){
       this.setState({message: 'Min 2 answers are required.'})
      } else {
         
     
      this.submitted = true;

      const data = { question: this.state.question,
        answers: this.state.answers }


     if (validation.isValid) {
      e.preventDefault()
      fetch('http://localhost:8080/question', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
      }
    }).then(res => {
      if(res.status !== 200 && res.status !== 201){
        throw new Error('Failed!')
      } 
      res.json().then(resData => {
      console.log(resData);
    })
    })
    .catch(err => {
      console.log(err)
    }) 

        this.setState({
          question: '',
          answers: [],
    });
    this.handleClose()
    window.location.reload();
      }
    }
    }
    render() {

        let validation = this.submitted ?                         // if the form has been submitted at least once
        this.validator.validate(this.state) :   // then check validity every time we render
        this.state.validation                   // otherwise just use what's in state


      return (
        <>
          <button onClick={this.handleShow} className="btn btn-link">Edit</button>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Question settings</Modal.Title>
            </Modal.Header>
            <form className="form-group container" >    
            <label className="form-label m-2" for="inputDefault">Question</label>
            <input  type="text"
                                className="form-control"
                                value={this.props.question}
                                onChange={this.onChangeQuestion}
                                placeholder="Enter question"
                                />
                                 <span className="help-block  text-danger">{validation.question.message}</span>


            <label className="form-label m-2" for="inputDefault">Answers</label>
           
                        {this.props.answers.map((answer, index) => {
                            return (
                                <div  key={index} style={{display: 'flex'}}>
                                <input  type="text"
                                className="form-control m-1"
                                value={answer}
                                onChange={(e)=> this.onChangeAnswer(e, index)}
                                placeholder={`Answer ${index}`}
                                />  
                                <button type='button' 
                                onClick={(e) => this.handelRemove(e,index)} 
                                className="btn btn-link" style={{color: 'red'}}>Remove</button>
                                </div>
                            )
                        })}      <span className="help-block  text-danger">{this.state.message}</span>
                                 <span className="help-block  text-danger">{validation.answers.message}</span>
                                 <button type="submit" onClick={(e) => this.addAnsewr(e)} className="btn btn-primary m-2">Add new answer</button>
            <Modal.Footer>
            <button type="submit" onClick={this.onSubmit} class="btn btn-primary">Save changes</button>
            </Modal.Footer>
            </form>
          </Modal>
        </>
      );
    }
  }
  
