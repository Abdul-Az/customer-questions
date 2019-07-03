import React, { Component } from 'react';
import { Card } from "react-bootstrap";
import "./Header.css"

export default class FixedNavBar extends Component {
    render() {
        return (
            <Card style={{ width: '100%', position: 'fixed', top: 0, zIndex: 1, overflow: 'hidden'  }}>
            <Card.Body>
              <Card.Title style={{fontSize: "2rem"}}>Custom questions</Card.Title>
              <Card.Subtitle className="mb-2 text-muted"> You must add at least one queston to launch a survey.</Card.Subtitle>
              <div style={{marginTop: '2rem'}}>
              <Card.Link style={{marginRight: '40%'}}><b>Questions</b></Card.Link>
              <Card.Link ><b>Questions settings</b></Card.Link>
              </div>
            </Card.Body>
          </Card>
        )
    }
}
