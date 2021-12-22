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
        var color = this.id;
        for(var i = 0; i + this.id.length < 6; i++){
            color = '0' + color
        }
        this.circle = new fabric.Circle({
            radius: r,
            fill: '#' + color + '00',
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
        this.text.set({
            selectable: false
        })
    }

    addNode(data)
    {
        var connect = this.connections;
        var n = (connect.length + 1) + this.id;
        var newNode = new myNode(n, data);
        connect.push(newNode);
        this.setChildrenAngle();

        return(newNode)
    }

    // removeNode(id)
    // {
    //     this.findNode(id)
    // }

    findNode(id)
    {
        if(id.length===1) {
            return this;
        } else {
            const temp = [] + id.substr(0, id.length - 1)
            return this.connections[temp[temp.length - 1] - 1].findNode(temp);
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
        if(this.connections===""){
            return 0;
        }
        for(let i = 0; i < this.connections.length; i++){
            this.connections[i].setAngle(this.angle + i*(360/this.connections.length), this.circle)
            this.connections[i].setChildrenAngle()
        }
    }
}