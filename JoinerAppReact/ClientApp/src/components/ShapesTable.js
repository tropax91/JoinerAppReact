import React, { Component } from "react";

export class ShapesTable extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ShapeList: [],
        };
    }

    render() {    
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Width</th>
                        <th>Height</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.ShapeList.map(s =>
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.name}</td>
                            <td>{s.width}</td>
                            <td>{s.height}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    componentDidMount() {
        fetch('api/shape/GetShapes')
            .then(response => response.json())
            .then(data => {
                this.setState({ ShapeList: data });
            });
    }
}