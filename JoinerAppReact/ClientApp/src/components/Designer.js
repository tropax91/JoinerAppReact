import React, { Component } from 'react';
import { Button, Form, Label, Input, Card } from 'reactstrap';

const shapehandling = require('./../utilities/shapehandling');

export class Designer extends Component {
    static displayName = Designer.name;


    constructor(props) {
        super(props);
        this.state = {
            paths: [],
            minMaxXY: [0, 0, 0, 0],//min x, min y, max x, max y
            widthLimit: 2400,
            heightLimit: 1200,
            intersectingPaths: false,
            svg: {
                width: "600",
                height: "300",
                viewBox: "0 0 200 100",
                path: ""
            },
            shapeName: ""
        };
    }

    render() {
        return (
            <div>
                <Card className='DesignerCard'>
                <div className="row">
                    <div id="blueprint" className="col-auto">
                        <svg width={this.state.svg.width} height={this.state.svg.height} viewBox={this.state.svg.viewBox} xmlns="http://www.w3.org/2000/svg">
                            <g id="svgGroup" strokeLinecap="round" fillRule="evenodd" fontSize="9pt" stroke="#000" strokeWidth="0.25mm" fill="none" style={{ stroke: "#000", strokeWidth: "0.25mm", fill: "none" }}>
                                <path d={this.state.svg.path} shapeRendering="geometricPrecision" vectorEffect="non-scaling-stroke" />
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="dimension-display">
                    <span><Label>Bredde:</Label>{this.getWidth().toFixed(0)}/{this.state.widthLimit}mm</span>
                    <span><Label>Højde:</Label>{this.getHeigth().toFixed(0)}/{this.state.heightLimit}mm</span>
                    {this.state.intersectingPaths && <span>Figuren har krydsende linjer</span>}
                </div>
                <div id="controlpanel">
                    {this.state.paths.map((path, index) => (
                        <div key={index.toString()}>
                            <select className='DEsign' key={index.toString()} value={path.type} onChange={(e) => this.handleTypeChange(index, e)}>
                                {shapehandling.pathTypes.map((type, index) => (
                                        <option key={index.toString()} value={type}>
                                            {type}
                                        </option>
                                ))}
                            </select>
                            {this.pathTypeSwitch(index)}
                        </div>
                    ))}
                </div>

                    <Button className='DeButton' color='primary' onClick={this.addPath} type="button" value="">Tilføj linje</Button>
                    <Button color='danger' onClick={this.removePath} type="button" value="">Fjern linje</Button><br />
                    <Input className='DeButton' onChange={this.handleShapeNameChange} type="text" value={this.state.shapeName} placeholder="Figur navn" />
                    <Button color='primary' onClick={this.uploadShape.bind(this)} type="button" value="">Gem</Button>
                </Card> 
            </div>
        );
    }

    getWidth = () => {
        return this.state.minMaxXY[2] - this.state.minMaxXY[0];
    }

    getHeigth = () => {
        return this.state.minMaxXY[3] - this.state.minMaxXY[1];
    }

    pathTypeSwitch = (index) => {
        switch (this.state.paths[index].type) {
            case 'line':
                return this.renderLineEditor(index);
            case 'arc':
                return this.renderArcEditor(index);
            default:
                return (<span>Invalid</span>);
        }
    }

    renderLineEditor = (index) => {
        return (
            <span>
                <Label className='ArcDesigner'>Vinkel</Label>
                <input className='DEsign'
                    type="number"
                    placeholder={`Linje #${index + 1} vinkel`}
                    value={this.state.paths[index].angle}
                    name="angle"
                    onChange={(e) => this.handlePathChange(index, e)}
                />
                <Label className='ArcDesigner'>Længde</Label>
                <input className='DEsign'
                    type="number"
                    placeholder={`Linje #${index + 1} længde`}
                    value={this.state.paths[index].length}
                    name="length"
                    onChange={(e) => this.handlePathChange(index, e)}
                />
            </span>
        )
    }

    renderArcEditor = (index) => {
        return (
            <span>
                <Label className='ArcDesigner'>Vinkel</Label>
                <input className='DEsign'
                    type="number"
                    placeholder={`Linje #${index + 1} vinkel`}
                    value={this.state.paths[index].angle}
                    name="angle"
                    onChange={(e) => this.handlePathChange(index, e)}
                />
                <Label className='ArcDesigner'>Radius</Label>
                <input className='DEsign'
                    type="number"
                    placeholder={`Linje #${index + 1} radius`}
                    value={this.state.paths[index].length}
                    name="length"
                    onChange={(e) => this.handlePathChange(index, e)}
                />
                <Label className='ArcDesigner'>Størrelse</Label>
                <input className='DEsign'
                    type="number"
                    placeholder={`Linje #${index + 1} størrelse`}
                    value={this.state.paths[index].arcSize}
                    name="arcSize"
                    onChange={(e) => this.handlePathChange(index, e)}
                />
                <Label className='ArcDesigner'>Med uret</Label>
                <input className='DEsign'
                    type="checkbox"
                    checked={this.state.paths[index].clockwise}
                    name="clockwise"
                    onChange={(e) => this.handlePathChange(index, e)}
                />
            </span>
        )
    }

    handleTypeChange = (index, event) => {
        var pathsObj = this.state.paths;
        pathsObj[index].type = event.target.value;
        this.setState({ paths: pathsObj });
        this.updateShapeState();
    }

    addPath = () => {
        let pathsObj = this.state.paths;
        if (pathsObj.length > 0) {
            pathsObj.push({ ...pathsObj[pathsObj.length - 1] });
        }
        else {
            pathsObj.push({
            "type": 'line',
            "angle": 0,
            "length": 200,
            "arcSize": 45,
            "clockwise": false
        })
        }
        this.setState({ paths: pathsObj });
        this.updateShapeState();
    }

    removePath = () => {
        let tempEdges = this.state.paths;
        tempEdges.splice(-1);
        this.setState({ edges: tempEdges })
        this.updateShapeState();
    }

    handlePathChange = (index, event) => {
        console.log(event.target.checked + ", " + event.target.name);
        let newPaths = this.state.paths.map((path, sIndex) => {
            if (index !== sIndex) {
                return path;
            }

            let newPath = path;
            let { target: { name, value, checked } } = event;
            if (name == 'clockwise') {
                newPath[name] = checked;
            }
            else {
                if (name == 'angle' || name == 'arcSize') {
                    value = value % 360;
                    if (value < 0) {
                        value = 360 + value;
                    }
                }
                newPath[name] = value ? parseInt(value) : 0;
            }
            return newPath;
        });

        this.setState({ paths: newPaths });
        this.updateShapeState();
    }

    updateShapeState = () => {
        let { shape, newMinMaxXY, hasIntersectingPaths } = shapehandling.getShapeData(this.state.paths);
        let { viewBoxValue, pathValue } = shapehandling.getSvgValues(shape);

        this.setState({
            svg: {
                width: "600",
                height: "300",
                viewBox: viewBoxValue,
                path: pathValue
            },
            minMaxXY: newMinMaxXY,
            intersectingPaths: hasIntersectingPaths
        });
    }

    handleShapeNameChange = (event) => {
        this.setState({ shapeName: event.target.value });
    }

    async uploadShape() {
        const { valid, msg } = this.validateModel();
        if (valid) {
            let dxfData = shapehandling.getDxf(shapehandling.getShapeData(this.state.paths));
            const response = await fetch('/api/shape/uploadshape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.shapeName,
                    dxf: dxfData,
                    width: Math.round(this.state.minMaxXY[2] - this.state.minMaxXY[0]),
                    height: Math.round(this.state.minMaxXY[3] - this.state.minMaxXY[1])
                })
            });

            if (response.status == 401) {
                this.props.displayPopover("Du skal være logget ind for at gemme en figur");
            }
            if (response.status == 409) {
                this.props.displayPopover("Det angivne navn er allerede brugt");
            }
            if (response.status == 200) {
                this.props.displayPopover("Figuren blev gemt");
            }
        }
        else {
            this.props.displayPopover(msg);
        }
    }

    validateModel = () => {
        if (this.getWidth() > this.state.widthLimit) {
            return { valid: false, msg: 'Figuren er for bred' };
        }
        if (this.getHeigth() > this.state.heightLimit) {
            return { valid: false, msg: 'Figuren er for høj' };
        }
        if (this.state.intersectingPaths) {
            return { valid: false, msg: 'Figuren har krydsende linjer' };
        }
        if (!this.state.shapeName.length > 0) {
            return { valid: false, msg: 'Der mangler at blive angivet et navn' };
        }
        return { valid: true, msg: 'Figuren er gyldig' };
    }
}