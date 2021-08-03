// Draggable
import { gsap } from 'gsap'
import { Draggable } from "gsap/Draggable";
import style from './css/style.scss'

gsap.registerPlugin(Draggable);

export const columnDrag = (column, tableID, columns) => {
    const columnID = column.id
    const table = document.getElementById(tableID);
    const draggableColumn = document.querySelector(`[data-column-id*="${columnID}"]`);
    const handle = document.querySelector(`[data-column-id*="${columnID}"] .dragHandle`);  

    let controlStartX, columnItems = [], columnData = [], draggingTableItem, tableItemGap = 0;

    function moveColumn(column, move) {
        let idx = columnItems.length;
        let controlItem = columnItems[0];
        tableItemGap = controlStartX - controlItem.x
        let deltaX = column.x - controlStartX;
        let item;

        while (--idx > -1) {
            item = columnItems[idx];
            gsap.set(item.elem, { x: item.x + deltaX + tableItemGap });
        }
    }

    Draggable.create(draggableColumn,
        {
            type: 'x',
            edgeResistance: 0.65,
            dragClickables: false,
            trigger: handle,
            bounds: table,
            onPress: function () {
                const itemNodes = document.querySelectorAll(`[data-column-id*="${columnID}"]`);
                controlStartX = this.target.getBoundingClientRect().x;

                let elem;
                for (let i = 0; i < itemNodes.length; i++) {
                    elem = itemNodes[i]
                    elem.classList.add(style.dragging)
                    
                    columnItems.push({
                        elem,
                        x: elem.getBoundingClientRect().x
                    })
                }

                let data = {}
                columns.forEach((d, index)=> {
                    const node = document.querySelector(`[data-column-id*="${d.id}"]`);
                    data = {
                        elem: node,
                        index,
                        x: node.getBoundingClientRect().x,
                        y: node.getBoundingClientRect().y,
                        items: document.querySelectorAll(`[data-column-id*="${d.id}"]`)
                    }
                    columnData.push(data);

                    if (d.id == columnID) draggingTableItem = data;
                });
            },
            onRelease: function () {
                columnItems.forEach(d => d.elem.classList.remove(style.dragging));
            },
            onDrag: function() {
                moveColumn(this);

                columnData.forEach(column => {
                    let hitX = column.x
                    if (this.hitTest(column.elem, '55%') && (hitX !== controlStartX)) {                        
                        let difference;

                        if (column.index < draggingTableItem.index) {
                            difference = controlStartX - hitX
                        }
                        if (column.index > draggingTableItem.index) {
                            difference = -(hitX - controlStartX)
                        }
                        
                        gsap.to(column.items, {
                            duration: 0.3,
                            x: difference,
                            zIndex: 500,
                            onComplete: function() {
                                column.x = column.elem.getBoundingClientRect().x
                            }
                        })

                        controlStartX = hitX;

                        return;
                    }
                })
            }
        })
}