import React, { Component } from 'react';
import { OrdersTable } from './OrdersTable';
import { MaterialsTable } from './Admin/MaterialsTable';
import { AddMaterial } from './Admin/AddMaterial';

export class AdminDashboard extends Component {
    static displayName = AdminDashboard.name;


    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <h1>Administration</h1>
                <h4>Ordrer</h4>
                <OrdersTable />
                <br />
                <h4>Materialer</h4>
                <MaterialsTable />
                <br />
                <AddMaterial />
            </div>
        )
    }
}