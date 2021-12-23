import { useRef, useEffect, useState } from 'react';
import { Menu, MenuItem } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './FabricCanvas.css'

var i = 2;

function FabricCanvas(props) {
    const sizeRef = useRef();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (target) => {
        setAnchorEl(target);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [state, setState] = useState({
        style: {},
        color: 0,
    });
    
    const addChild = (parent) => {
        const newNode = parent.addNode(i);
        props.nc.add(newNode.text, newNode.path, newNode.circle)
    }

    props.nc.off('mouse:down');
    props.nc.on('mouse:down', function(opt) {
        if(opt.target) {

            var id = String(opt.target.fill)
            id = id.slice(1)
            while((id[0]==0)&&(id.length > 3)){
                id = id.slice(1)
            }
            id = id.slice(-0, -2)

            const element = props.root.findNode(id)
            setState({
                style: {
                    zIndex: -1,
                    position: 'absolute',
                    top: element.circle.getCenterPoint().y + 50 + this.viewportTransform[5],
                    left: element.circle.getCenterPoint().x + 50 + this.viewportTransform[4]
                }, 
                color: id
            })
            handleClick(
                document.getElementById('pseudo')
            )
        } else {
            console.log(this)
            this.isDragging = true;
            this.lastPosX = opt.e.clientX;
            this.lastPosY = opt.e.clientY;
        }
    });
    props.nc.on('mouse:move', function(opt) {
        if (this.isDragging) {
            var e = opt.e;
            var vpt = this.viewportTransform;
            vpt[4] += e.clientX - this.lastPosX;
            vpt[5] += e.clientY - this.lastPosY;
            // this.requestRenderAll();
            this.lastPosX = e.clientX;
            this.lastPosY = e.clientY;
        }
    });
    props.nc.on('mouse:up', function(opt) {
        // on mouse up we want to recalculate new interaction
        // for all objects, so we call setViewportTransform
        this.setViewportTransform(this.viewportTransform);
        this.isDragging = false;
    });

    useEffect(() => {
        console.log("Re-rendering FabricCanvas component")
        props.nc.setDimensions({
            height: sizeRef.current.clientHeight,
            width: sizeRef.current.clientWidth
        });
    });

    return(
        <div className="canvasContainer" ref={sizeRef}>
            <canvas id="canvas"></canvas>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {
                    addChild(props.root.findNode(state.color))
                    handleClose();
                }}>
                    <span style={{verticalAlign: 'middle'}}><FontAwesomeIcon icon={faPlus}/></span>
                    <p style={{margin: '0 0 0 0.7rem'}}>Add Child</p>
                </MenuItem>
            </Menu>
            <div id="pseudo" style={state.style}></div>
        </div>
    );
}

export default FabricCanvas;