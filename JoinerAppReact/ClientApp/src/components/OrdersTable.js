import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Form, Label, Input } from 'reactstrap';
var _ = require('lodash');


export class OrdersTable extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            OrderList: [],
            searchVal: "",
            orderVal: ''
        };
    }

    render() {
        return (
            <div>
            <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Ordre Id</th>
                        <th>Pris</th>
                        <th>Kunde</th>
                        <th>Status</th>
                        <th>Oprettelsesdato</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.OrderList.map(o =>
                        <tr key={o.id}>
                            <td><Link to={"/OrderDetails#"+ o.id}>{o.id}</Link></td>
                            <td>{o.price}</td>
                            <td>{o.userFullName}</td>
                            <td>{o.status}</td>
                            <td>{o.creationDateTime}</td>
                        </tr>
                    )}
                </tbody>
                </table>
                <p>Søg i ordrer</p>
                    <input className='DEsign'
                    type='text'
                    name='search'
                    placeholder='pris, kunde, status'
                    value={this.state.searchVal}
                    onChange={this.handleUpdateSearch}
                    />
                    <Button color="primary" type='submit' onClick={this.getOrders}>Søg</Button>
            </div>
                <div>
                    <p>Order table</p>
                    <select className='DEsign' value={this.state.orderVal} onChange={(e) => this.handleChange(e)}>
                        <option value="id">Ordrer Id</option>
                        <option value="userFullName">Brugers navn</option>
                        <option value="status">Ordrer status</option>
                        <option value="price">Ordrer price</option>
                        <option value="creationDateTime">Skabelses dato</option>
                    </select>
                </div>
            </div>
            
        );
    }

    handleChange = (event) => {
        //console.log(event.target.value);
        const value = event.target.value
        //console.log(value)
        this.setState({ orderVal: event.target.value });
        console.log(this.state.orderVal);
        this.onSort();
    }

    onSort = (event) => {

        //console.log(event.target.value);
        console.log(this.state.orderVal);
        //Code I took inspirarition from can 
        //be found here: https://stackoverflow.com/questions/43572436/sort-an-array-of-objects-in-react-and-render-them
        const data = this.state.OrderList;
        var orderVal = this.state.orderVal;
        console.log(orderVal);
        //It works but for some reason the orderVal is always the last chosen orderVal and not of the newly chosen orderVal
        var sorteddata = _.sortBy(data, [orderVal]);
        this.setState({
            OrderList: sorteddata
        });

    }

    handleUpdateSearch = (event) => {
        this.setState({ searchVal: event.target.value })
    }

    componentDidMount() {
        this.getOrders();
    }

    

    getOrders = () => {
        fetch(`https://localhost:44359/api/order/GetAllOrders?search=${this.state.searchVal}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ OrderList: data });
            });
    }
}