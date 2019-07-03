import React, { Component } from 'react'
import { Card, Button } from "react-bootstrap"

export default class CustomCard extends Component {

  edit = (e) => {
    console.log(e)
  }
    render() {
        return (
          <div style={{marginTop: '10rem'}}>
            <Card>
  <Card.Body>
    <Card.Title style={{maxWidth: '50rem'}}>Assingmendsf</Card.Title>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <Button onClick={this.edit} >Edit</Button>
    </div>
    <Card.Text style={{maxWidth: '50rem'}} >

      <ul style={{display: 'flex', flexDirection: 'row', }} >
        <li style={{paddingRight: '30px'}}>
            asdd
        </li>
        <li style={{paddingRight: '30px'}}>
asfasf
        </li>
        <li style={{paddingRight: '30px'}}>
asfasf
        </li>
      </ul>
    </Card.Text>
  
  </Card.Body>
</Card>

</div>
        )
    }
}
