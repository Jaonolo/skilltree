import { fabric } from 'fabric'

export const canvasInitialize = (nc, root) => {
    nc.initialize('canvas')
    nc.set({
        hoverCursor: 'select',
        backgroundColor: '#bbb',
        selection: false
    })
    fabric.Object.prototype.originX = 'center';
    fabric.Object.prototype.originY = 'center';

    nc.add(root.text, root.circle);
    nc.centerObject(root.circle);
    root.circle.setCoords();
    root.text.set({
        top: root.circle.getCenterPoint().y,
        left: root.circle.getCenterPoint().x
    });
}