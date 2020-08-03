import React, { Component } from 'react';
import { Button, Form, Label, Input } from 'reactstrap';


export class AddMaterial extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isSelectable: ''
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('https://localhost:44359/api/Material/InsertMaterial', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'Name': event.target.name.value,
                'isSelectable': event.target.isSelectable.value
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p>Tilføj nyt materiale</p>
                    <Input type='text'
                        name='name'
                        placeholder='Materiale navn' value={this.state.name}
                        onChange={this.handleChange}
                        required />
                    <br/>
                    <p>Er materialet tilgængeligt nu? 0 = nej, 1 = ja</p>
                    <Input type='text'
                        name='isSelectable'
                        placeholder='0/1' value={this.state.isSelectable}
                        onChange={this.handleChange}
                        required />
                    <br/>
                    <button type='submit'>Tilføj materiale</button>
                </form>
            </div>
        );
    }
}