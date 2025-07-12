import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button, Layout, Typography } from "antd";
import { MdUndo, MdRedo, MdSave, MdClose } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import addIcon from "../../assets/addIcon.png";
import closeIcon from "../../assets/close-icon.png";
import Header from "./Header/Header";
import Section from "./Section/Section";
import ElementsSidebar from "./ElementsSidebar/ElementsSidebar";
import DragOverlayContent from "./DragOverlayContent/DragOverlayContent";
import {
  addSection,
  addField,
  undo,
  redo,
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../../store/formBuilderSlice";
import "./FormBuilder.scss";
import sidebarIcon1 from "../../assets/sidebar-icon-1.png";
import sidebarIcon2 from "../../assets/sidebar-icon-2.png";
import sidebarIcon3 from "../../assets/sidebar-icon-3.png";
import sidebarIcon4 from "../../assets/sidebar-icon-4.png";
import sidebarMinus from "../../assets/sidebar-minus.png";
import sidebarPlus from "../../assets/sidebar-plus.png";
import circularExpandIcon from "../../assets/circular-expand-icon.png";

const { Content, Sider } = Layout;
const { Title } = Typography;

const FormBuilder = () => {
  const dispatch = useDispatch();
  const { sections, formTitle, formId, historyIndex, history } = useSelector(
    (state) => state.formBuilder
  );
  const [activeId, setActiveId] = useState(null);
  const [draggedElement, setDraggedElement] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);

    // Check if dragging from sidebar
    if (active.data.current?.type === "sidebar-element") {
      setDraggedElement(active.data.current);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      setDraggedElement(null);
      return;
    }

    // Handle dropping from sidebar to group (both main and bottom drop zones)
    if (active.data.current?.type === "sidebar-element") {
      const isGroupDropZone = over.data.current?.type === "group";
      const isBottomDropZone = over.id?.includes("group-bottom-");

      if (isGroupDropZone || isBottomDropZone) {
        const fieldType = active.data.current.fieldType;
        const { sectionId, groupId } = over.data.current;

        dispatch(addField({ sectionId, groupId, fieldType }));

        console.log(
          `Added ${fieldType} field to group ${groupId} in section ${sectionId}`
        );
      }
    }

    setActiveId(null);
    setDraggedElement(null);
  };

  const handleSave = () => {
    dispatch(saveToLocalStorage());
  };

  const handleUndo = () => {
    dispatch(undo());
  };

  const handleRedo = () => {
    dispatch(redo());
  };

  const openSidebar = () => {
    setSidebarVisible(true);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="form-parent-container">
        <Layout className="form-builder">
          <Header
            formTitle={formTitle}
            formId={formId}
            onSave={handleSave}
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={canUndo}
            canRedo={canRedo}
          />

          <Layout
            className={`form-builder__content ${
              sidebarVisible ? "sidebar-open" : ""
            }`}
          >
            {/* Left Sidebar - Navigation - Starts */}
            <Sider
              // width={80}
              width={120}
              className="form-builder__left-sidebar"
              theme="light"
              style={{ backgroundColor: "#F6F7FB" }}
            >
              <div className="left-sidebar-content">
                <div className="circularExpandIcon">
                  <img
                    src={circularExpandIcon}
                    alt="circularExpandIcon"
                    height={46}
                    width={46}
                  />
                </div>
                {/* Action buttons */}
                <div className="action-buttons">
                  <Button
                    type="text"
                    icon={
                      <img
                        src={sidebarIcon1}
                        alt="sidebar-icon-1"
                        height={50}
                        width={50}
                      />
                    }
                    onClick={handleUndo}
                    className="action-btn"
                    title="Undo"
                  />
                  <Button
                    type="text"
                    icon={
                      <img
                        src={sidebarIcon2}
                        alt="sidebar-icon-2"
                        height={50}
                        width={50}
                      />
                    }
                    onClick={handleRedo}
                    className="action-btn"
                    title="Redo"
                  />
                </div>

                <div className="left-sidebar-content-lower">
                  {/* Home icon */}
                  <div className="home-section">
                    <Button type="text" className="home-btn" title="Home">
                      <img src={sidebarIcon3} alt="sidebar-icon-3" />
                    </Button>
                  </div>

                  {/* Upload icon */}
                  <div className="upload-section">
                    <Button type="text" className="upload-btn" title="Upload">
                      <img src={sidebarIcon4} alt="sidebar-icon-4" />
                    </Button>
                  </div>

                  {/* Section numbers */}
                  <div className="section-numbers">
                    {sections.map((section, index) => (
                      <div
                        key={section.id}
                        className={`section-number ${
                          index === 0 ? "active" : ""
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="">
                  {/* Bottom section */}
                  <div className="bottom-section">
                    <img
                      src={sidebarMinus}
                      alt="sidebarMinus"
                      height={46}
                      width={46}
                    />
                    <div className="section-last-number">100</div>
                    <img
                      src={sidebarPlus}
                      alt="sidebarPlus"
                      height={46}
                      width={46}
                    />
                  </div>
                </div>
              </div>
            </Sider>
            {/* Left Sidebar - Navigation - Ends */}

            {/* Main Content - Starts */}
            <Content className="form-builder__main">
              <div className="form-builder__canvas">
                <div className="form-builder__toolbar">
                  <Button
                    type="primary"
                    icon={<IoMdAdd />}
                    onClick={() => dispatch(addSection())}
                    className="add-section-btn"
                  >
                    Add Section
                  </Button>
                </div>

                <div className="form-builder__sections">
                  {sections.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-content">
                        <Title level={4}>No sections yet</Title>
                        <p>Click "Add Section" to start building your form</p>
                      </div>
                    </div>
                  ) : (
                    <SortableContext
                      items={sections.map((s) => s.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {sections.map((section, index) => (
                        <Section
                          key={section.id}
                          section={section}
                          sectionIndex={index}
                        />
                      ))}
                    </SortableContext>
                  )}
                </div>
              </div>
            </Content>
            {/* Main Content - Ends */}

            {/* Elements Sidebar - Side panel without overlay */}
            {sidebarVisible && (
              <Sider
                width={"40vw"}
                className="form-builder__sidebar"
                theme="light"
              >
                <div className="form-builder__sidebar-inner">
                  <div className="sidebar-header elements-header">
                    <div className="sidebar-title flex-centered">
                      <p onClick={closeSidebar} className="close-btn">
                        <img
                          src={closeIcon}
                          alt="close-Icon"
                          height={20}
                          width={20}
                        />
                      </p>
                      <div>
                        <Title level={4} className="elements-header-title">
                          Elements
                        </Title>
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-content">
                    <ElementsSidebar />
                  </div>
                </div>
              </Sider>
            )}
          </Layout>

          <DragOverlay>
            {activeId && draggedElement ? (
              <DragOverlayContent element={draggedElement} />
            ) : null}
          </DragOverlay>
        </Layout>
        {/* Add Elements Button - Positioned when sidebar is closed */}
        {!sidebarVisible && (
          <div className="add-elements-button" onClick={openSidebar}>
            <div className="plus-icon">
              <img
                src={addIcon}
                alt="import-Icon"
                height={48}
                width={48}
                className="form-header-lower__nav-item-grid-inner-icon"
              />
            </div>
            <Button className="add-elements-btn" size="large">
              Add Elements
            </Button>
          </div>
        )}
      </div>
    </DndContext>
  );
};

export default FormBuilder;
