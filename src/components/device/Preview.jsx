import React, { Component } from "react";
import * as d3 from 'd3';


export default class Preview extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const parts = [{ id: '1', name: '世界之窗' }];


        function dragmove(d) {
            d3.select(this)
                .attr("x", function () {
                    return d.x = d3.event.x
                })
                .attr("y", d.y = d3.event.y)

            d3.select(this.nextSibling)
                .attr("x", function () {
                    return d.x = d3.event.x
                })
                .attr("y", d.y = d3.event.y)

        }

        function dragend(d) {
            console.log(d3.select(this).attr("cx"))
        }
        let drag = d3.drag()
            .on("drag", dragmove)
            .on('end', dragend);

        const svg = d3.select('#theChart').append('svg') // 在id为‘theChart’的标签内创建svg
            .style('width', 540)
            .style('height', 180)
            .style('background', '#dcdcdc')
            .on('click', () => {
                // console.log('click', d3.event.target.tagName);
            })
        let g = svg.append('g')


        svg.select('g')
            .selectAll('.part')
            .data(parts) // 绑定数据
            .enter()
            .append('g')
            .attr('class', 'part')

        svg.select('g.part')
            .selectAll('g.part')
            .data(parts) // 绑定数据
            .enter() // 为数据添加对应数量的占位符append('rect')
            .append('rect')
            .attr('class', 'part-rect')
            .attr('width',100)
            .attr('height',100)
            .attr('x', 100)
            .attr('y', 40)
            .attr('fill', 'transparent')
            .attr('strokeWidth', 2)
            .attr('stroke', 'red')
        // .call(drag)


        svg.select('g.part')
            .selectAll('.edgelabel')
            .data(parts)
            .enter()
            .append('text') // 为每一条连线创建文字区域
            .attr('class', 'edgelabel')
            .attr('x', 120)
            .attr('y', 90)
            .attr('xlink:href', (d, i) => { return i && '#edgepath' + i; }) // 文字布置在对应id的连线上
            .style('pointer-events', 'none') // 禁止鼠标事件
            .style('font', 'bold 30px sans-serif')
            .text((d) => { return d && d.name; });

            d3.select('.part-rect').call(drag)
        // 设置文字内容
    }
    render() {
        return <div className="theChart" id="theChart" ref="theChart" />
        // const { sign, part } = this.props;

        // return (
        //     <svg onLoad={this.move} width="540" height="180" style={{ background: "#dcdcdc" }}>
        //         <g className="part" onMouseOver={this.move}>
        //         <rect width="270" height="100" x="100" y="40" fill="transparent" strokeWidth="2" stroke="red"></rect>
        //         <text x="120" y="90" style={{ font: 'bold 30px sans-serif' }}>世界之窗</text>

        //         </g>

        //     </svg>
        // )
    }
}