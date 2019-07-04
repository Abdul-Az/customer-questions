import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import FormValidator from "../utils/FormValidator";
import './Header.css'


export default class CreateThreadModel extends React.Component {
    constructor(props, context) {
      super(props, context);
  

      this.validator = new FormValidator([
        { 
          field: 'title', 
          method: 'isEmpty', 
          validWhen: false, 
          message: 'Title is required.' 
        },
        { 
          field: 'description',
          method: 'isEmpty', 
          validWhen: false, 
          message: 'Description is required'
        },
        { 
          field: 'tags', 
          method: 'isEmpty', 
          validWhen: false, 
          message: 'Min 2 answers are required.'
        }
      ]);
  
  
      this.submitted = false;
  
      this.state = {
        show: false,
        title: '',
        description: '',
        tags: [],
        answers: [],
        validation: this.validator.valid(),
        email: localStorage.getItem('email'),
        userId: localStorage.getItem('userId')
      };
    }
  
    handleClose = () => {
      this.setState({ show: false });
    }
  
    handleShow = () => {
      this.setState({ show: true });
    }

    onChangeTitle = event => {
      this.setState({
         title : event.target.value,
      });
    }

    onChangeDescription = event => {
      this.setState({
         description : event.target.value,
      });
    }
    onChangeAnswer = (e, index) => {
        this.state.answers[index] = e.target.value
        
      this.setState({
         answers : this.state.answers,
      });
    }

    addAnsewr = e => {
        e.preventDefault()
       this.setState({
          answers: [...this.state.answers, ''] 
       })
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
      this.submitted = true;

      const data = { title: this.state.title,
        description: this.state.description, 
        tags: this.state.tags, 
        email: this.state.email, 
        userId: this.state.userId  }


        if (validation.isValid) {
      e.preventDefault()
      fetch('https://dcoder-server.herokuapp.com/threads', {
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
          title: '',
          description: '',
          tags: [],
    });
    this.handleClose()
    window.location.reload();
      }
    }
    render() {

        let validation = this.submitted ?                         // if the form has been submitted at least once
        this.validator.validate(this.state) :   // then check validity every time we render
        this.state.validation                   // otherwise just use what's in state


      return (
        <>
          <Button onClick={this.handleShow} className="app-fab--absolute btn btn-primary">Add question</Button>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add a custom question</Modal.Title>
            </Modal.Header>
            <form className="form-group container" >    
            <label className="form-label m-2" for="inputDefault">Question</label>
            <input  type="text"
                                className="form-control"
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                placeholder="Enter Title"
                                />
                                 <span className="help-block  text-danger">{validation.title.message}</span>


            <label className="form-label m-2" for="inputDefault">Answers</label>
           
                        {this.state.answers.map((answer, index) => {
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
                        })}       
                                 <span className="help-block  text-danger">{validation.tags.message}</span>
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
  
