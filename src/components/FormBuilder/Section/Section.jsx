import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, Input, Button, Switch, Tooltip, Space } from "antd";
import { IoMdAdd } from "react-icons/io";
import { MdDragIndicator, MdDelete, MdMoreVert } from "react-icons/md";
import Group from "../Group/Group";
import {
  updateSectionTitle,
  removeSection,
  addGroup,
} from "../../../store/formBuilderSlice";
import "./Section.scss";
import dragIcon from "../../../assets/vertical-icons.png";
import sectionGroupBg from "../../../assets/section-group-bg.png";
import expandIcon from "../../../assets/expand-icon.png";
import hierachyIcon from "../../../assets/hierarchy.png";
import copyIcon from "../../../assets/copy.png";
import verticalIcon from "../../../assets/vertical-icon-single.png";

const Section = ({ section, sectionIndex }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(section.title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleTitleSubmit = () => {
    dispatch(updateSectionTitle({ sectionId: section.id, title: tempTitle }));
    setIsEditing(false);
  };

  const handleTitleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleTitleSubmit();
    } else if (e.key === "Escape") {
      setTempTitle(section.title);
      setIsEditing(false);
    }
  };

  const handleAddGroup = () => {
    dispatch(addGroup({ sectionId: section.id }));
  };

  const handleRemoveSection = () => {
    dispatch(removeSection(section.id));
  };

  return (
    <div ref={setNodeRef} style={style} className="section-wrapper">
      <Card
        className="section-card"
        style={{ backgroundImage: `url(${sectionGroupBg})` }}
      >
        <div className="section-header">
          <div className="section-header__left">
            <div className="drag-handle" {...attributes} {...listeners}>
              <img src={dragIcon} alt="vertical-icon" />
            </div>

            <div className="section-title-container">
              {isEditing ? (
                <Input
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  onBlur={handleTitleSubmit}
                  onKeyDown={handleTitleKeyPress}
                  autoFocus
                  className="section-title-input"
                />
              ) : (
                <h3
                  className="section-title"
                  onClick={() => setIsEditing(true)}
                >
                  {section.title}
                </h3>
              )}
            </div>
          </div>

          <div className="section-header__right">
            <Space>
              <div className="required-toggle">
                <span className="required-label">Required</span>
                <Switch size="small" style={{backgroundColor: '#CFCECE'}} />
              </div>

              <Tooltip title="Expand section">
                <Button
                  type="text"
                  size="small"
                  icon={
                    <img
                      src={expandIcon}
                      alt="expand-icon"
                      height={16}
                      width={16}
                    />
                  }
                />
              </Tooltip>

              <Tooltip title="Hierachy">
                <Button
                  type="text"
                  size="small"
                  icon={
                    <img
                      src={hierachyIcon}
                      alt="hierachy-icon"
                      height={16}
                      width={16}
                    />
                  }
                />
              </Tooltip>

              <Tooltip title="Copy">
                <Button
                  type="text"
                  size="small"
                  icon={
                    <img
                      src={copyIcon}
                      alt="copy-icon"
                      height={16}
                      width={16}
                    />
                  }
                />
              </Tooltip>

              <Tooltip title="Show More">
                <Button
                  type="text"
                  size="small"
                  icon={<img src={verticalIcon} alt="more-icon" height={12} />}
                />
              </Tooltip>

              <Tooltip title="Delete section">
                <Button
                  type="text"
                  size="small"
                  icon={<MdDelete />}
                  onClick={handleRemoveSection}
                  danger
                />
              </Tooltip>
            </Space>
          </div>
        </div>

        <div className="section-content">
          {section.groups.length === 0 ? (
            <div className="empty-section">
              <div className="empty-section__content">
                <p>No groups in this section</p>
                <Button
                  type="dashed"
                  icon={<IoMdAdd />}
                  onClick={handleAddGroup}
                  block
                >
                  Add Group
                </Button>
              </div>
            </div>
          ) : (
            <>
              {section.groups.map((group, groupIndex) => (
                <Group
                  key={group.id}
                  group={group}
                  sectionId={section.id}
                  groupIndex={groupIndex}
                />
              ))}

              <div className="add-group-container">
                <Button
                  type="dashed"
                  icon={<IoMdAdd />}
                  onClick={handleAddGroup}
                  block
                  className="add-group-btn"
                >
                  Add Group
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Section;
