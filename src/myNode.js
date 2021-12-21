import { fabric } from 'fabric'

let r = 30;
let len = 50;

export class myNode
{
    constructor(id, data)
    {
        this.id = [] + id;
        this.data = data;
        this.connections = [];
        this.circle = new fabric.Circle({
            radius: r,
            fill: 'transparent',
            strokeWidth: 5,
            stroke: 'black',
            selectable: false
        });
        this.path = new fabric.Path(`M 0 0 L ${len} 0 z`)
        this.path.set({
            strokeWidth: 5,
            stroke: 'black',
            selectable: false
        });
        this.angle = 0;
        this.text = new fabric.Text(this.id);
    }

    addNode(data)
    {
        var connect = this.connections;
        var n = this.id + (connect.length + 1);
        var newNode = new myNode(n, data);
        connect.push(newNode);
        this.setChildrenAngle();
    }

    removeNode(id)
    {
        if(id.length==1) {
            this.connections.splice(id[0], 1);
        } else {
            this.connections[id.shift()].removeNode(id);
        }
    }

    setAngle(angle, ref){
        this.angle = angle
        this.path.set({
            angle: -this.angle,
            top: ref.getCenterPoint().y - Math.sin((Math.PI*this.angle)/180)*(r + len/2),
            left: ref.getCenterPoint().x + Math.cos((Math.PI*this.angle)/180)*(r + len/2),
        });
        this.path.setCoords();
        this.circle.set({
            top: ref.getCenterPoint().y - Math.sin((Math.PI*this.angle)/180)*(r + len + r),
            left: ref.getCenterPoint().x + Math.cos((Math.PI*this.angle)/180)*(r + len + r),
        });
        this.circle.setCoords();
        this.text.set({
            top: this.circle.getCenterPoint().y,
            left: this.circle.getCenterPoint().x
        });
        this.text.setCoords();
    }

    setChildrenAngle(){
        if(this.connections==""){
            return 0;
        }
        for(let i = 0; i < this.connections.length; i++){
            this.connections[i].setAngle(i*(360/this.connections.length), this.circle)
            this.connections[i].setChildrenAngle()
        }
    }
}
