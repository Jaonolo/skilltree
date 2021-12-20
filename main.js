class myNode
{
    constructor(id, data, ref)
    {
        this.id = [] + id;
        this.data = data;
        this.connections = [];
        this.circle = new fabric.Circle({
            radius: r,
            strokeWidth: 5,
            fill: 'transparent',
            stroke: 'red',
            selectable: false,
            top: root.getCenterPoint().y,
            left: root.getCenterPoint().x + (r + len + r),
        });
        this.path = new fabric.Path(`M 0 0 L ${len} 0 z`)
        this.path.set({
            stroke: 'green',
            strokeWidth: 5,
            selectable: false,
            angle: 0,
            top: root.getCenterPoint().y,
            left: root.getCenterPoint().x + (r + len/2),
        });
        this.angle = 0;
        this.ref = ref;
    }

    addNode(data)
    {
        var connect = this.connections;
        var n = 10*this.id + connect.length;
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
        nc.add(this.circle, this.path)
        nc.renderAll()
    }

    setAngle(angle){
        this.angle += angle
        this.path.set({
            angle: -this.angle,
            top: this.ref.getCenterPoint().y - Math.sin((Math.PI*this.angle)/180)*(r + len/2),
            left: this.ref.getCenterPoint().x + Math.cos((Math.PI*this.angle)/180)*(r + len/2),
        });
        this.circle.set({
            top: this.ref.getCenterPoint().y - Math.sin((Math.PI*this.angle)/180)*(r + len + r),
            left: this.ref.getCenterPoint().x + Math.cos((Math.PI*this.angle)/180)*(r + len + r),
        });
        nc.renderAll();
    }
}

var sumpa = (yo) => {
    if(yo.connections.length != 0) {
        let a = testezera(yo);
        return a;
    } else {
        let a = `
        <div class="teste">
            <div>
                ${yo.data}
            </div>
        </div>
    `;
        return a;
    }
}

var testezera = (inputius) => {
    console.log(inputius.data);
    let c = '';
    for(i of inputius.connections){
        c += sumpa(i);
    }
    console.log(c);
    let a = `
        <div class="teste">
            <div>
                ${inputius.data}
            </div>
            ${c}
        </div>
    `
    return a;
}

let r = 20;
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

var root = new fabric.Circle({
    radius: r,
    strokeWidth: 5,
    fill: 'transparent',
    stroke: 'red',
    selectable: false
});
nc.add(root);
nc.centerObject(root);
root.setCoords();
nc.renderAll();

var setangle = (glurb, ref, node) => {
    
}

var shush = new myNode(0, 0, root);
shush.addNode(1);
shush.addNode(2);
shush.connections[0].addNode(1);
// var snesh = document.getElementById("test");
// snesh.innerHTML = testezera(shush);

shush.renderNode();
shush.connections[0].setAngle(45);
shush.connections[1].setAngle(-45);
shush.connections[0].renderNode();
shush.connections[1].renderNode();

var teste = () => {
    shush.setAngle(10);
    shush.connections[0].setAngle(10);
    shush.connections[1].setAngle(10);
}