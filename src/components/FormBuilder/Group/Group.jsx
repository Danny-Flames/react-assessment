import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card, Input, Button, Switch, Tooltip, Space } from 'antd';
import { MdDragIndicator, MdDelete, MdMoreVert } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import Field from '../Field/Field';
import { updateGroupTitle, removeGroup } from '../../../store/formBuilderSlice';
import './Group.scss';

const Group = ({ group, sectionId, groupIndex }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(group.title);

  // Main drop zone for the entire group
  const { isOver, setNodeRef } = useDroppable({
    id: `group-${group.id}`,
    data: {
      type: 'group',
      sectionId,
      groupId: group.id,
    },
  });

  // Additional drop zone at the bottom for adding more elements
  const { isOver: isOverBottom, setNodeRef: setBottomNodeRef } = useDroppable({
    id: `group-bottom-${group.id}`,
    data: {
      type: 'group',
      sectionId,
      groupId: group.id,
    },
  });

  const handleTitleSubmit = () => {
    dispatch(updateGroupTitle({ sectionId, groupId: group.id, title: tempTitle }));
    setIsEditing(false);
  };

  const handleTitleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTitleSubmit();
    } else if (e.key === 'Escape') {
      setTempTitle(group.title);
      setIsEditing(false);
    }
  };

  const handleRemoveGroup = () => {
    dispatch(removeGroup({ sectionId, groupId: group.id }));
  };

  return (
    <div 
      className={`group-wrapper ${isOver || isOverBottom ? 'group-wrapper--drop-target' : ''}`}
    >
      <Card className="group-card" size="small">
        <div className="group-header">
          <div className="group-header__left">
            <div className="drag-handle">
              <MdDragIndicator />
            </div>
            
            <div className="group-title-container">
              {isEditing ? (
                <Input
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  onBlur={handleTitleSubmit}
                  onKeyDown={handleTitleKeyPress}
                  autoFocus
                  className="group-title-input"
                  size="small"
                />
              ) : (
                <h4 
                  className="group-title"
                  onClick={() => setIsEditing(true)}
                >
                  {group.title}
                </h4>
              )}
            </div>
          </div>

          <div className="group-header__right">
            <Space>
              <div className="required-toggle">
                <span className="required-label">Required</span>
                <Switch size="small" />
              </div>
              
              <Tooltip title="More options">
                <Button type="text" size="small" icon={<MdMoreVert />} />
              </Tooltip>
              
              <Tooltip title="Delete group">
                <Button 
                  type="text" 
                  size="small" 
                  icon={<MdDelete />}
                  onClick={handleRemoveGroup}
                  danger
                />
              </Tooltip>
            </Space>
          </div>
        </div>

        <div 
          ref={setNodeRef}
          className="group-content"
        >
          {group.fields.length === 0 ? (
            <div className={`drop-zone ${isOver ? 'drop-zone--active' : ''}`}>
              <div className="drop-zone__content">
                <IoMdAdd className="drop-zone__icon" />
                <p className="drop-zone__text">
                  {isOver ? 'Drop element here' : 'Drag elements here or click "Add Elements"'}
                </p>
              </div>
            </div>
          ) : (
            <>
              <SortableContext 
                items={group.fields.map(f => f.id)} 
                strategy={verticalListSortingStrategy}
              >
                <div className="fields-container">
                  {group.fields.map((field, fieldIndex) => (
                    <Field
                      key={field.id}
                      field={field}
                      sectionId={sectionId}
                      groupId={group.id}
                      fieldIndex={fieldIndex}
                    />
                  ))}
                </div>
              </SortableContext>
              
              {/* Always show drop zone for adding more fields */}
              <div 
                ref={setBottomNodeRef}
                className={`drop-zone drop-zone--additional ${isOverBottom ? 'drop-zone--active' : ''}`}
              >
                <div className="drop-zone__content">
                  <IoMdAdd className="drop-zone__icon" />
                  <p className="drop-zone__text">
                    {isOverBottom ? 'Drop element here' : 'Drop more elements here'}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Group;