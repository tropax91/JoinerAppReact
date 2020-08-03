import React, { Component } from "react";
import { OrderLinesTable } from './../OrderLinesTable';
import { Button, Form, Label, Input } from 'reactstrap';


export class OrderDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order: {},
            orderLines: [],
            statuses: [],
            selectedStatusId: '',
            data: [],
            switch: 0
        };
    }

    componentDidMount() {
        this.handleGetDetails();
        fetch('api/Order/GetOrderStatuses')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    statuses: data,
                });
            });
        
    }

    handleGetDetails = () => {        
        let orderId = this.props.location.hash ? this.props.location.hash.substring(1) : null;
        if (orderId) {
            fetch('api/Order/GetOrderDetails?id=' + orderId)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        order: data.orderDetails,
                        orderLines: data.orderLines
                    });
                });
        }
    }

    handleStatusChange = (e) => {
        this.setState({ selectedStatusId: e.target.value })
    }

    async submitOrderStatusUpdate() {
        const response = await fetch('/api/order/UpdateOrderStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.order.id,
                newStatusId: this.state.selectedStatusId,
            })
        });

        if (response.status == 200) {
            //this.props.displayPopover("Name is already used");
            console.log("Ok");
            this.handleGetDetails();
        }
        else if (response.status == 400) {
            //this.props.displayPopover("Shape was saved");
            console.log("Bad Request");
        }
        else {
            console.log("Other error");
        }

    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-4"><label>Ordre Id:</label></div>
                            <div className="col">{this.state.order.id}</div>
                        </div>
                        <div className="row">
                            <div className="col-4"><label>Pris:</label></div>
                            <div className="col">{this.state.order.price}</div>
                        </div>
                        <div className="row">
                            <div className="col-4"><label>Kunde:</label></div>
                            <div className="col">{this.state.order.userFullName}</div>
                        </div>
                        <div className="row">
                            <div className="col-4"><label>Faktureringsadresse:</label></div>
                            <div className="col">{this.state.order.fullBillingAddress}</div>
                        </div>
                        <div className="row">
                            <div className="col-4"><label>Oprettelsesdato:</label></div>
                            <div className="col">{this.state.order.creationDateTime}</div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col-2"><label>Status:</label></div>
                            <div className="col">{this.state.order.status}</div>
                        </div>
                        {this.props.userIsAdmin && this.renderOrderStatusDropDown()}
                    </div>
                </div>
                <OrderLinesTable data={this.state.orderLines} />
            </div>
        );
    }

    renderOrderStatusDropDown = () => {
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <label>Opdater Status</label>
                    </div>
                </div>
                < div className="row">
                    <div className="col">
                        <select value={this.state.selectedStatusId} onChange={(e) => this.handleStatusChange(e)}>
                            {this.state.statuses.map((status, index) => (
                                <option key={`shape-option-${index.toString()}`} value={status.id}>
                                    {status.name}
                                </option>
                            ))}
                        </select>
                        <Input onClick={this.submitOrderStatusUpdate.bind(this)} type="button" value="Opdater" />
                    </div>
                </div>
            </div>
        )
    }
}