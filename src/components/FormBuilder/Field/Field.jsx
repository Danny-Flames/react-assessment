import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, Input, Button, Switch, Tooltip, Space, Select, Radio, Checkbox, Upload } from 'antd';
import { MdDragIndicator, MdDelete, MdSettings, MdUpload } from 'react-icons/md';
import { updateField, removeField } from '../../../store/formBuilderSlice';
import './Field.scss';

const { Option } = Select;
const { Dragger } = Upload;

const Field = ({ field, sectionId, groupId, fieldIndex }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [tempLabel, setTempLabel] = useState(field.label);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleLabelSubmit = () => {
    dispatch(updateField({ 
      sectionId, 
      groupId, 
      fieldId: field.id, 
      updates: { label: tempLabel } 
    }));
    setIsEditing(false);
  };

  const handleLabelKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLabelSubmit();
    } else if (e.key === 'Escape') {
      setTempLabel(field.label);
      setIsEditing(false);
    }
  };

  const handleRemoveField = () => {
    dispatch(removeField({ sectionId, groupId, fieldId: field.id }));
  };

  const handleFullWidthChange = (checked) => {
    dispatch(updateField({ 
      sectionId, 
      groupId, 
      fieldId: field.id, 
      updates: { fullWidth: checked } 
    }));
  };

  const handleRequiredChange = (checked) => {
    dispatch(updateField({ 
      sectionId, 
      groupId, 
      fieldId: field.id, 
      updates: { required: checked } 
    }));
  };

  const renderFieldPreview = () => {
    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <Input 
            placeholder={field.placeholder || `Enter ${field.label}`}
            disabled
            className="field-preview"
          />
        );
      
      case 'select':
        return (
          <Select 
            placeholder="Select Title Here"
            disabled
            className="field-preview"
            style={{ width: '100%' }}
          >
            {field.options?.map((option, index) => (
              <Option key={index} value={option}>{option}</Option>
            ))}
          </Select>
        );
      
      case 'radio':
        return (
          <Radio.Group disabled className="field-preview">
            {field.options?.map((option, index) => (
              <Radio key={index} value={option}>{option}</Radio>
            ))}
          </Radio.Group>
        );
      
      case 'checkbox':
        return (
          <div className="field-preview checkbox-group">
            {field.options?.map((option, index) => (
              <Checkbox key={index} disabled>{option}</Checkbox>
            ))}
          </div>
        );
      
      case 'file':
        return (
          <div className="field-preview file-upload">
            <Dragger disabled>
              <p className="ant-upload-drag-icon">
                <MdUpload />
              </p>
              <p className="ant-upload-text">Drag or Drop</p>
            </Dragger>
          </div>
        );
      
      default:
        return (
          <Input 
            placeholder="Field preview"
            disabled
            className="field-preview"
          />
        );
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="field-wrapper">
      <Card className="field-card" size="small">
        <div className="field-header">
          <div className="field-header__left">
            <div 
              className="drag-handle" 
              {...attributes} 
              {...listeners}
            >
              <MdDragIndicator />
            </div>
            
            <div className="field-label-container">
              {isEditing ? (
                <Input
                  value={tempLabel}
                  onChange={(e) => setTempLabel(e.target.value)}
                  onBlur={handleLabelSubmit}
                  onKeyDown={handleLabelKeyPress}
                  autoFocus
                  className="field-label-input"
                  size="small"
                />
              ) : (
                <span 
                  className="field-label"
                  onClick={() => setIsEditing(true)}
                >
                  {field.label}
                </span>
              )}
            </div>
          </div>

          <div className="field-header__right">
            <Space>
              <div className="field-toggles">
                <Tooltip title="Full width">
                  <div className="toggle-item">
                    <span className="toggle-label">Full</span>
                    <Switch 
                      size="small" 
                      checked={field.fullWidth}
                      onChange={handleFullWidthChange}
                    />
                  </div>
                </Tooltip>
                
                <Tooltip title="Required field">
                  <div className="toggle-item">
                    <span className="toggle-label">Required</span>
                    <Switch 
                      size="small" 
                      checked={field.required}
                      onChange={handleRequiredChange}
                    />
                  </div>
                </Tooltip>
              </div>
              
              <Tooltip title="Field settings">
                <Button type="text" size="small" icon={<MdSettings />} />
              </Tooltip>
              
              <Tooltip title="Delete field">
                <Button 
                  type="text" 
                  size="small" 
                  icon={<MdDelete />}
                  onClick={handleRemoveField}
                  danger
                />
              </Tooltip>
            </Space>
          </div>
        </div>

        <div className="field-content">
          {renderFieldPreview()}
        </div>
      </Card>
    </div>
  );
};

export default Field;