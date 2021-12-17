class myNode
{
    constructor(id, data)
    {
        this.id = [] + id;
        this.data = data;
        this.connections = [];
    }

    addNode(data)
    {
        var connect = this.connections;
        var n = 10*this.id + connect.length;
        connect.push(new myNode(n, data));
    }

    removeNode(id)
    {
        if(id.length==1) {
            this.connections.splice(id[0], 1);
        } else {
            this.connections[id.shift()].removeNode(id);
        }
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

var shush = new myNode(0, 0);
shush.addNode(1);
shush.addNode(2);
shush.connections[0].addNode(1);
var snesh = document.getElementById("test");
snesh.innerHTML = testezera(shush);