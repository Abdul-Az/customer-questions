import React, { Component } from 'react'
import { Card, Button } from "react-bootstrap"
import EditModal from './EditModal';

export default class CustomCard extends Component {
  state = {
    data: '',
  };

  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    // Localhost endpoint http://localhost:8080/
    fetch('http://localhost:8080/questions', {
      method: 'GET',
      body: null,
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
      if (response.status !== 200) {
        console.log(
          `Looks like there was a problem. Status Code: ${response.status}`
        );
        return;
      }

      // Examine the text in the response
      response.json().then(data => {
        if (data.error) {
          return this.setState({ error: data.message });
        }

        console.log(data);
        return this.setState({ data: data });
      });
    });
  };

  edit = (e) => {
    console.log(e)
  }
    render() {
        return (
          <div style={{marginTop: '10rem'}}>
            {Object.values(this.state.data).map(question => (
            <Card>
  <Card.Body>
    <Card.Title style={{maxWidth: '50rem'}}>{question.question}</Card.Title>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <EditModal question={question.question} answers={question.answers} id={question._id}/>
    </div>
    <Card.Text style={{maxWidth: '50rem'}} >

      <ul style={{display: 'flex', flexDirection: 'row', }} >
        {question.answers.map(answer => (
            <li style={{paddingRight: '30px'}}>
            {answer}
        </li>
        )
        )}
      </ul>
    </Card.Text>
  
  </Card.Body>
</Card>
            ))}

</div>
        )
    }
}
