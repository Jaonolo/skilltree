import { useRef, useEffect, useState } from 'react';
import { Menu, MenuItem } from '@mui/material'
import './FabricCanvas.css'

var i = 2;

function FabricCanvas(props) {
    const sizeRef = useRef();
    const [state, setState] = useState({
        style: {},
        color: 0,
    });
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (target) => {
      setAnchorEl(target);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const teste = (testoio) => {
        const newNode = testoio.addNode(i);
        props.nc.add(newNode.text, newNode.path, newNode.circle)
        props.nc.renderAll();
    }

    props.nc.off('mouse:down');
    props.nc.on('mouse:down', (e) => {
        if(e.target) {
            var tempColor = String(e.target.fill)
            tempColor = tempColor.slice(1)
            while((tempColor[0]==0)&&(tempColor.length > 3)){
                tempColor = tempColor.slice(1)
            }

            tempColor = tempColor.slice(-0, -2)
            const shush = props.root.findNode(tempColor)
            setState({style: {zIndex: -1, position: 'absolute', top: shush.circle.getCenterPoint().y, left: shush.circle.getCenterPoint().x}, color: tempColor})
            handleClick(
                document.getElementById('pseudo')
            )
        }
    });

    useEffect(() => {
        console.log("HA!")
        props.nc.setDimensions({
            height: sizeRef.current.clientHeight,
            width: sizeRef.current.clientWidth
        });
        props.nc.renderAll();
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
                <MenuItem onClick={() => {
                    teste(props.root.findNode(state.color))
                    handleClose();
                }}>teste</MenuItem>
            </Menu>
            <div id="pseudo" style={state.style}></div>
        </div>
    );
}

export default FabricCanvas;