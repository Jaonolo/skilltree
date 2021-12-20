export class myNode
{
    constructor(id, data, ref)
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
        this.ref = ref;
        this.text = new fabric.Text(this.id);
    }

    addNode(data)
    {
        var connect = this.connections;
        var n = this.id + (connect.length + 1);
        connect.push(new myNode(n, data, this.circle));
    }

    removeNode(id)
    {
        if(id.length==1) {
            this.connections.splice(id[0], 1);
        } else {
            this.connections[id.shift()].removeNode(id);
        }
    }

    renderNode(){
        nc.add(this.circle, this.path, this.text)
        nc.renderAll()
    }

    setAngle(angle){
        this.angle += angle
        this.path.set({
            angle: -this.angle,
            top: this.ref.getCenterPoint().y - Math.sin((Math.PI*this.angle)/180)*(r + len/2),
            left: this.ref.getCenterPoint().x + Math.cos((Math.PI*this.angle)/180)*(r + len/2),
        });
        this.path.setCoords();
        this.circle.set({
            top: this.ref.getCenterPoint().y - Math.sin((Math.PI*this.angle)/180)*(r + len + r),
            left: this.ref.getCenterPoint().x + Math.cos((Math.PI*this.angle)/180)*(r + len + r),
        });
        this.circle.setCoords();
        this.text.set({
            top: this.circle.getCenterPoint().y,
            left: this.circle.getCenterPoint().x
        });
        this.text.setCoords();
        nc.renderAll();
    }
}