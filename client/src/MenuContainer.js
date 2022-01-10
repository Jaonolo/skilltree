import './FabricCanvas.css'
import axios from 'axios'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faSave, faCog } from '@fortawesome/free-solid-svg-icons';
import { CircularProgress } from '@mui/material'

const save = (root, setAnimate) => {
    setAnimate(true)
    axios
        .post("http://localhost:5000/record/add", root)
        .then((res) => {
            if(res.status === 200)
            {
                setAnimate(false)
            }
        })
}

export const MenuContainer = ({root}) => {
    const [animate, setAnimate] = useState(false)

    return(
        <div className="menuContainer canvasContainer">
            <div className="menuHolder">
                <button className="button"><FontAwesomeIcon icon={faPencilAlt} style={{height: 25, width: 25}}/></button>
                <button className={animate ? "button animate" : "button"} onClick={() => {save(root, setAnimate)}}>
                    {(animate) ? 
                        <CircularProgress style={{height: 25, width: 25}}/>
                            :
                        <FontAwesomeIcon icon={faSave} style={{height: 25, width: 25}}/>
                    }
                </button>
                <button className="button"><FontAwesomeIcon icon={faPencilAlt} style={{height: 25, width: 25}}/></button>
                <button className="button"><FontAwesomeIcon icon={faCog} style={{height: 25, width: 25}}/></button>
            </div>
        </div>
    )
}