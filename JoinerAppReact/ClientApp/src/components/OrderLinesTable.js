import React, { Component } from "react";
import { Link } from 'react-router-dom';

export class OrderLinesTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Figur</th>
                        <th>Materiale</th>
                        <th>Antal</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.map(o =>
                        <tr key={o.shapeId}>
                            <td><Link to={"api/shape/DownloadShape/" + o.shapeId} target="_blank">{o.shapeName}</Link></td>
                            <td>{o.materialName}</td>
                            <td>{o.quantity}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}