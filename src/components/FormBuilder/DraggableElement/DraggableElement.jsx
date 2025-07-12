import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Card } from "antd";
import "./DraggableElement.scss";

const DraggableElement = ({ field, id }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: {
        type: "sidebar-element",
        fieldType: field.type,
        label: field.label,
      },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`draggable-element ${isDragging ? "dragging" : ""}`}
    >
      <Card className="element-card" size="small">
        <div className="element-content">
          <div className="element-content-flex">
            <div className="element-icon">{field.icon}</div>
            <div className="element-label">{field.label}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DraggableElement;
