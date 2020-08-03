import React, { Component } from 'react';

export class Popover extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="customPopover">
                <label>{this.props.message}</label>
            </div>
        )
    }
}