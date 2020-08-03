import React, { Component } from 'react';
import { Button, Form, Label, Input } from 'reactstrap';


export class AddressInput extends Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col col-3">
                        <label>Adresse</label>
                    </div>
                    <div className="col">
                        <Input className='AddressInput'
                            type="text"
                            name="addressLine1"
                            placeholder="Indtast adresse linje 1"
                            value={this.props.address.addressLine1}
                            onChange={this.props.onChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col col-3">
                        <label>Adresse 2</label>
                    </div>
                    <div className="col">
                        <Input className='AddressInput'
                            type="text"
                            name="addressLine2"
                            placeholder="Indtast adresse linje 2"
                            value={this.props.address.addressLine2}
                            onChange={this.props.onChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col col-3">
                        <label>Postnummer</label>
                    </div>
                    <div className="col">
                        <Input className='AddressInput'
                            type="text"
                            name="postalCode"
                            placeholder="Indtast postnummer"
                            value={this.props.address.postalCode}
                            onChange={this.props.onChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col col-3">
                        <label>By</label>
                    </div>
                    <div className="col">
                        <Input className='AddressInput'
                            type="text"
                            name="city"
                            placeholder="Indtast by"
                            value={this.props.address.city}
                            onChange={this.props.onChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
}