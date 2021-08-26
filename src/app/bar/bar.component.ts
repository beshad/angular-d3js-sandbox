import { Component, OnInit } from '@angular/core'
import { DATA, DATA2, SALES } from '../data/data'
import * as d3 from 'd3'

@Component({
    selector: 'app-bar',
    templateUrl: './bar.component.html',
    styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {
    private data = DATA
    private svg: any
    private margin = 50
    private width = 750 - this.margin * 2
    private height = 400 - this.margin * 2

    constructor() {}

    ngOnInit(): void {
        // this.createSvg()
        // this.drawBars(this.data)
        // this.doSomething()
        this.do()
    }

    private do = () => {
        const svg = d3.select('svg')
        svg.size()

        var rects = svg.selectAll('rect').data(SALES)

        rects.size()
    }

    private doSomething = (): void => {
        // d3.selectAll('p').style('color', '#f33')
        // d3.select('body').style('background-color', 'yellow')
        // d3.selectAll('p').style('color', () => {
        //     return 'hsl(' + Math.random() * 360 + ',100%,50%)'
        // })

        const p = d3
            .select('#text')
            .selectAll('p')
            .data([4, 8, 15, 16, 23, 42])
            .style('font-size', function (d) {
                return d + 'px'
            })

        // Enter…
        p.enter()
            .append('p')
            .text((d) => {
                console.log(d)
                return d
            })

        // Exit…
        // p.exit().remove()
    }

    private createSvg(): void {
        this.svg = d3
            .select('figure#bar')
            .append('svg')
            .attr('width', 640)
            .attr('height', 480)
            .append('g')
            .attr('transform', 'translate(50,50)')
        // this.svg = d3
        //     .select('figure#bar')
        //     .append('svg')
        //     .attr('width', this.width + this.margin * 2)
        //     .attr('height', this.height + this.margin * 2)
        //     .append('g')
        //     .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')')
    }

    private drawBars(data: any[]): void {
        // Create the X-axis band scale
        const x = d3
            .scaleBand()
            .range([0, this.width])
            .domain(data.map((d) => d.Framework))
            .padding(0.2)

        // Draw the X-axis on the DOM
        this.svg
            .append('g')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('transform', 'translate(-10,0)rotate(-45)')
            .style('text-anchor', 'end')

        // Create the Y-axis band scale
        const y = d3.scaleLinear().domain([0, 200000]).range([this.height, 0])

        // Draw the Y-axis on the DOM
        this.svg.append('g').call(d3.axisLeft(y))

        // Create and fill the bars
        this.svg
            .selectAll('bars')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', (d) => x(d.Framework))
            .attr('y', (d) => y(d.Stars))
            .attr('width', x.bandwidth())
            .attr('height', (d) => this.height - y(d.Stars))
            .attr('fill', '#d04a35')
    }
}
