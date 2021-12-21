import { Component } from 'react';
import { myNode } from  './myNode.js'
import { fabric } from 'fabric'

var nc = new fabric.Canvas();
var root = new myNode(0, 0);
var i = 0;

export default class FabricCanvas extends Component{
    teste() {
        root.addNode(++i);
        nc.add(root.connections[i-1].circle, root.connections[i-1].path, root.connections[i-1].text)
        nc.renderAll();
    }

    componentDidMount() {
        nc.initialize('canvas')
        nc.set({
            hoverCursor: 'select',
            backgroundColor: '#bbb'
        })
        nc.setDimensions({
            height: 500,
            width: 500
        });
        fabric.Object.prototype.originX = 'center';
        fabric.Object.prototype.originY = 'center';

        nc.add(root.circle, root.text);
        nc.centerObject(root.circle);
        root.circle.setCoords();
        root.text.set({
            top: root.circle.getCenterPoint().y,
            left: root.circle.getCenterPoint().x
        });
        root.text.setCoords();
        nc.renderAll();
    }

    render() {
        return(
            <div>
                <button onClick={this.teste}>yo</button>
                <canvas id="canvas"></canvas>
            </div>
        );
    }
}