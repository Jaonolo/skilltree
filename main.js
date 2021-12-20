class myNode
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
        newNode.renderNode();
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
        nc.renderAll();
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

let r = 30;
let len = 50;

var nc = new fabric.Canvas('canvas');
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

var root = new myNode(0, 0);
nc.add(root.circle, root.text);
nc.centerObject(root.circle);
root.circle.setCoords();
root.text.set({
    top: root.circle.getCenterPoint().y,
    left: root.circle.getCenterPoint().x
});
root.text.setCoords();
nc.renderAll();

var i = 0;

// root.addNode(1);
// root.addNode(2);
// root.connections[0].addNode(1);

var teste = () => {
    root.addNode(++i);
}

/* things that need to change:
    dockerize
    react
    check renderAll (and other things) efficiency
    check node limit
    id generation method
    disable group select
    pan (zoom?)
    buttons in canvas?
*/