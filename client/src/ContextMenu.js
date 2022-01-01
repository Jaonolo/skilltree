export const ConxtextMenu = () => {
    return(
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
    )
}