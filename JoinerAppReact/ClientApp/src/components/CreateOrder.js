import React, { Component } from 'react';
import { AddressInput } from './AddressInput';
import { Button, Form, Label, Input, Card } from 'reactstrap';


export class CreateOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shapesAreLoaded: false,
            materialsAreLoaded: false,
            shapes: [],
            materials: [],
            orderLines: [],
            price: 0,
            billingAddress: {
                addressLine1: "",
                addressLine2: "",
                postalCode: "",
                city: "",
            }
        };
    }

    render() {
        return (
            <div>
                <Card className='CreateOrderCard'>
                <h2>Opret Ordre</h2>
                <div className="row">
                    <div className="col-2">
                        <Label>Figur</Label>
                    </div>
                    <div className="col-2">
                        <Label>Materiale</Label>
                    </div>
                    <div className="col-auto">
                        <Label>Antal</Label>
                    </div>
                </div>
                {this.state.orderLines.map((line, lineIndex) => (
                    <div className="row" key={`orderLine-${lineIndex.toString()}`}>
                        <div className="col-2">
                            <select className='DEsign' value={this.state.orderLines[lineIndex].shapeId} onChange={(e) => this.handleShapeChange(lineIndex, e)}>
                                {this.state.shapes.map((shape, optionIndex) => (
                                    <option key={`shape-option-${optionIndex.toString()}`} value={shape.id}>
                                        {shape.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-2">
                            <select className='DEsign' value={this.state.orderLines[lineIndex].materialId} onChange={(e) => this.handleMaterialChange(lineIndex, e)}>
                                {this.state.materials.map((material, optionIndex) => (
                                    <option key={`material-option-${optionIndex.toString()}`} value={material.id}>
                                        {material.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-auto">
                            <input className='DEsign'
                                type="number"
                                name={line.shapeId}
                                placeholder={`Quantity`}
                                value={line.quantity}
                                onChange={(e) => this.handleQuantityChange(lineIndex, e)}
                            />
                        </div>

                        <div className="col">
                            <Button color="danger"
                                type="button"
                                name={line.shapeId}
                                value="Remove"
                                onClick={(e) => this.handleRemoveOrderLine(lineIndex, e)}>Fjern vare
                            </Button>
                        </div>
                    </div>
                ))}
                {this.state.shapesAreLoaded && this.state.materialsAreLoaded &&
                    <div className="row">
                        <div className="col">
                            <Button color="primary" type="button" value="Add Item" onClick={this.handleAddItem}>Tilføj vare</Button>
                        </div>
                        <div className="col">
                            <Label>Pris: </Label><span>{this.state.price}</span>
                        </div>
                    </div>
                }

                <br /><br />
                    <h4>Faktureringsadresse</h4>
                    <AddressInput address={this.state.billingAddress} onChange={this.handleAddressChange} />
                    <br /><br />
                    <Button  color="primary" type="button" onClick={this.handleSubmitOrder.bind(this)}>Indsend Ordre</Button>
                </Card>
            </div>
        );
    }

    componentDidMount() {
        fetch('https://localhost:44359/api/shape/GetShapes')
            .then(res => res.json())
            .then(json => this.setState({ shapes: json, shapesAreLoaded: true }));

        fetch('https://localhost:44359/api/material/GetMaterials')
            .then(res => res.json())
            .then(json => this.setState({ materials: json, materialsAreLoaded: true }));
    }

    handleAddItem = (event) => {
        let orderLinesObj = this.state.orderLines;
        orderLinesObj.push({ shapeId: this.state.shapes[0].id, quantity: 0, materialId: this.state.materials[0].id });
        this.setState({ orderLines: orderLinesObj })

    }

    handleShapeChange = (index, event) => {
        let newOrderLines = this.state.orderLines.map((line, mapIndex) => {
            if (mapIndex === index) {
                let newOrderLine = line;
                newOrderLine.shapeId = event.target.value;
                return newOrderLine;
            }
            return line;
        });
        this.setState({ orderLines: newOrderLines });
        this.UpdatePrice();
    }

    handleMaterialChange = (index, event) => {
        let newOrderLines = this.state.orderLines.map((line, mapIndex) => {
            if (mapIndex === index) {
                let newOrderLine = line;
                newOrderLine.materialId = event.target.value;
                return newOrderLine;
            }
            return line;
        });
        this.setState({ orderLines: newOrderLines });
    }

    handleQuantityChange = (index, event) => {
        let { target: { name, value } } = event;
        let newOrderLines = this.state.orderLines.map((line, mapIndex) => {
            if (mapIndex == index) {
                let newOrderLine = line;
                newOrderLine.quantity = parseInt(value);
                return newOrderLine;
            }
            return line;
        });
        this.setState({ orderLines: newOrderLines });
        this.UpdatePrice();
    }

    handleRemoveOrderLine = (index, event) => {
        let orderLinesObj = this.state.orderLines;
        orderLinesObj.splice(index, 1);
        this.setState({ orderLines: orderLinesObj });
        this.UpdatePrice();
    }

    async UpdatePrice() {
        fetch('https://localhost:44359/api/order/GetPrice', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderLines: this.state.orderLines })
        })
        .then(res => res.json())
        .then(json => {
            this.setState({ price: json.price });
            this.props.displayPopover("Price was updated");
        });

    }

    handleAddressChange = (event) => {
        let { target: { name, value } } = event;
        let billingaddressObj = this.state.billingAddress;
        billingaddressObj[name] = value;

        this.setState({ billingAddress: billingaddressObj });
    }

    async handleSubmitOrder() {
        fetch('https://localhost:44359/api/order/submitorder', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ orderLines: this.state.orderLines, price: this.state.price, billingAddress: this.state.billingAddress })
        }).then(res => {
            if (res.status == 200) {
                this.props.displayPopover("Ordren er blevet registreret");
            }
            else if (res.status == 401) {
                this.props.displayPopover("Du skal være logget ind for at indsende en ordre");
            }
        });
    }
}