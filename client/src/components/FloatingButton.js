import React from 'react'
import { Button } from 'react-bootstrap';
import './Header.css';

export default function FloatingButton() {
    return (
        <div>
              <Button className="app-fab--absolute btn btn-primary">Add question</Button>
        </div>
    )
}
