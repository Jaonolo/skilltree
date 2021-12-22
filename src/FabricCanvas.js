import { useRef, useEffect } from 'react';
import { myNode } from  './myNode.js'
import { fabric } from 'fabric'
// import ContextMenu from './ContextMenu.js'
import './FabricCanvas.css'
import { Menu, MenuItem } from '@mui/material'
import { useState } from 'react'

var nc = new fabric.Canvas();
var i = 2;

const teste = (testoio) => {
    const newNode = testoio.addNode(++i);
    nc.add(newNode.text, newNode.path, newNode.circle)
    nc.renderAll();
}

function FabricCanvas() {
    const sizeRef = useRef();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (target) => {
      setAnchorEl(target);
    };
    const handleClose = () => {
      setAnchorEl(null);
      setPseudo({zIndex: -1, position: 'absolute', top: 0, left: 0})

    };
    const [pseudoStyle, setPseudo] = useState({});
    const [oba, setOba] = useState(null);

    useEffect(() => {
        nc.initialize('canvas')
        nc.set({
            hoverCursor: 'select',
            backgroundColor: '#bbb'
        })
        nc.setDimensions({
            height: sizeRef.current.clientHeight,
            width: sizeRef.current.clientWidth
        });
        fabric.Object.prototype.originX = 'center';
        fabric.Object.prototype.originY = 'center';

        var root = new myNode(0, 0);
        nc.add(root.text, root.circle);
        nc.centerObject(root.circle);
        root.circle.setCoords();
        root.text.set({
            top: root.circle.getCenterPoint().y,
            left: root.circle.getCenterPoint().x
        });
        root.text.setCoords();
        nc.off('mouse:down');
        nc.on('mouse:down', (e) => {
            if(e.target) {
                var color = String(e.target.fill)
                color = color.slice(1)
                while((color[0]==0)&&(color.length > 3)){
                    color = color.slice(1)
                }
                color = color.slice(-0, -2)
                const shush = root.findNode(color)
                console.log(shush)
                setOba(shush)
                setPseudo({zIndex: -1, position: 'absolute', top: shush.circle.getCenterPoint().y, left: shush.circle.getCenterPoint().x})
                handleClick(
                    document.getElementById('pseudo')
                )
            }
        });
        nc.renderAll();
    });

    return(
        <div className="canvasContainer" ref={sizeRef}>
            <canvas id="canvas"></canvas>
            {/* <ContextMenu></ContextMenu> */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {teste(oba)}}>teste</MenuItem>
            </Menu>
            <div id="pseudo" style={pseudoStyle}></div>
        </div>
    );
}

export default FabricCanvas;