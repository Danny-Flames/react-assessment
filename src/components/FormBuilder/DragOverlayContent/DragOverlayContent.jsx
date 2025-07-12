import React from 'react';
import { Card } from 'antd';
import './DragOverlayContent.scss';
import arrowSqrDown from "../../../assets/arrow-square-down.png";

const DragOverlayContent = ({ element }) => {
  if (!element) return null;

  return (
    <Card className="drag-overlay-card" size="small">
      <div className="drag-overlay-content">
        <span className="drag-overlay-icon">
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
        </span>
        <span className="drag-overlay-label">{element.label}</span>
      </div>
    </Card>
  );
};

export default DragOverlayContent;