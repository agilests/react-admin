import React, { Component } from "react";

export default class Preview extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        const { sign, part } = this.props;
        return (
            <svg width="540" height="180" style={{ background: "#dcdcdc" }}>
                <rect width="270" height="100" x="100" y="40" fill="transparent" stroke-width="2" stroke="red">
                    
                </rect>
                <text x="120" y="90" style={{ font: 'bold 30px sans-serif' }}>世界之窗</text>
            </svg>
        )
    }
}