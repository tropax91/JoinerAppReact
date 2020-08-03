import React, { Component } from "react";
import { Button, Form, Label, Input } from 'reactstrap';
var _ = require('lodash');

export class MaterialsTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            MaterialList: [],
            searchVal: "",
            orderVal:"id"
        }
    }

    render() {
        return (
            <div>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Materiale ID</th>
                                <th>Navn</th>
                                <th>valgmulighed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.MaterialList.map(mat =>
                                <tr key={mat.id}>
                                    <td>{mat.id}</td>
                                    <td>{mat.name}</td>
                                    <td>{mat.isSelectable}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <p>Skriv id for at ændre på valgmuligheden for materiale</p>
                        <Input className='DEsign' type='text' name='id'
                            placeholder='MatID' value={this.state.MatID}
                            required
                        />
                        <Button className="MaterialIdB" color="primary" type='submit'>Submit Id</Button>
                    </form>
                </div>
                <div>
                    
                <p>Search table</p>
                    <Input className='DEsign'
                        type='text'
                        name='search'
                        placeholder='value'
                        value={this.state.searchVal}
                        onChange={this.handleUpdateSearch}
                    />
                    <Button color="primary" type='submit' onClick={this.getMaterials}>Submit search value</Button>
                    
                </div>
                <div>
                    <p>Tabel orden</p>
                    <select value={this.state.orderVal} onChange={(e) => this.handleChange(e)}>
                        <option value="id">Materiale Id</option>
                        <option value="name">Materiale navn</option>
                        <option value="selectability">Valgmulighed</option>
                    </select>
                </div>
            </div>
        )
    }

    handleChange = (event) => {
        console.log(event.target.value);
        var value = event.target.value
        this.setState({ orderVal: value });
        this.onSort();
    }

    componentDidMount() {
        this.getMaterials();
    }

    //Method to get data from api
    getMaterials = () => {
        fetch(`https://localhost:44359/api/Material/GetMaterials?search=${this.state.searchVal}`)
        .then(response => response.json())
        .then(data => {
            this.setState({ MaterialList: data });
        });
    }
    //Sort function, hit everytime we do an onChange operation in the dropdown menu, as of now sorts ascending.
    onSort = (event) => {

        // Inspiration and the the suggestive use of lodash can be found here:
        //https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value?rq=1
        //console.log(event.target.value);
        console.log(this.state.orderVal);
        const data = this.state.MaterialList;
        var orderVal = this.state.orderVal;
        console.log(orderVal);
        //It works but for some reason the orderVal is always the last chosen orderVal and not of the newly chosen orderVal
        var sorteddata = _.sortBy(data, [orderVal]);
        this.setState({
            MaterialList: sorteddata
        });
    }

    handleUpdateSearch = (event) => {
        this.setState({ searchVal: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch('https://localhost:44359/api/Material/edit', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: event.target.id.value })//state will not always have updated at this point, so use the event object instead
        })
            .then(res => {
                res.json();
                this.setState({ fetch: 1 });
                this.getMaterials();
            })
            .then(data => console.log(data))
    }
}
    

