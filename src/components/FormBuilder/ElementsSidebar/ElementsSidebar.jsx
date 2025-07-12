import React, { useState } from "react";
import { Typography, Tabs, Input, Collapse } from "antd";
import { MdSearch, MdKeyboardArrowDown } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import DraggableElement from "../DraggableElement/DraggableElement";
import "./ElementsSidebar.scss";
import arrowSqrDown from "../../../assets/arrow-square-down.png";

const { Title } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

const ElementsSidebar = () => {
  const [activeKey, setActiveKey] = useState(["1"]);

  const accountProfileFields = [
    {
      type: "file",
      label: "Photo",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
    {
      type: "date",
      label: "Date of Birth",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
    {
      type: "text",
      label: "State",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },

    {
      type: "radio",
      label: "Do you have residency?",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
    {
      type: "text",
      label: "Gender",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
    {
      type: "text",
      label: "Salutation",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
    {
      type: "email",
      label: "Email Address",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
    {
      type: "text",
      label: "Mobile Number",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
    {
      type: "text",
      label: "Last Name",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },

    
    {
      type: "text",
      label: "First Name",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
  ];

  const customFields = [
    {
      type: "text",
      label: "AmountInput",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
    {
      type: "text",
      label: "BackgroundImageMarkup",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
    {
      type: "file",
      label: "Camera",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
    {
      type: "checkbox",
      label: "Checkboxes",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
    {
      type: "date",
      label: "DatePicker",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
    {
      type: "datetime",
      label: "DateTimePicker",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
    {
      type: "signature",
      label: "DrawSignatureInput",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
    {
      type: "select",
      label: "Dropdown",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
    {
      type: "autocomplete",
      label: "DropdownAutocompleteInput",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
    {
      type: "email",
      label: "EmailInput",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
    {
      type: "file",
      label: "FileInput",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
    {
      type: "rating",
      label: "FiveStarRating",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
    {
      type: "location",
      label: "GooglePlacePickerInput",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
    {
      type: "text",
      label: "HeaderText",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
    {
      type: "hidden",
      label: "HiddenInput",
      icon: (
        <img
          src={arrowSqrDown}
          alt="arrow-square-down"
          height={20}
          width={20}
        />
      ),
    },
  ];

  const accordionItems = [
    {
      key: "1",
      label: "PRF - Account Profile",
      fields: accountProfileFields,
    },
    {
      key: "2",
      label: "BIO - Biodata",
      fields: [],
    },
    {
      key: "3",
      label: "CON - Contact Info",
      fields: [],
    },
    {
      key: "4",
      label: "PAS - Passports",
      fields: [],
    },
    {
      key: "5",
      label: "IDC - ID Cards",
      fields: [],
    },
  ];

  return (
    <div className="elements-sidebar-content">
      <Tabs defaultActiveKey="standard" className="elements-tabs">
        <TabPane tab="Standard Fields" key="standard">
          <div className="search-container">
            <Input
              placeholder="Search"
              prefix={<CiSearch size={20} />}
              className="search-input"
            />
          </div>

          <div className="accordion-container">
            <Collapse
              activeKey={activeKey}
              onChange={setActiveKey}
              className="fields-accordion"
              expandIcon={() => null}
              ghost
            >
              {accordionItems.map((item) => (
                <Panel
                  header={
                    <div className="accordion-header">
                      <span className="accordion-title">{item.label}</span>
                      <MdKeyboardArrowDown
                        className={`accordion-arrow ${
                          activeKey.includes(item.key) ? "expanded" : ""
                        }`}
                      />
                    </div>
                  }
                  key={item.key}
                  className="accordion-panel"
                >
                  {item.fields.length > 0 ? (
                    <div className="fields-grid">
                      {item.fields.map((field, index) => (
                        <DraggableElement
                          key={`${field.type}-${index}`}
                          field={field}
                          id={`standard-${field.type}-${index}`}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="empty-accordion">
                      <p>No fields available</p>
                    </div>
                  )}
                </Panel>
              ))}
            </Collapse>
          </div>
        </TabPane>

        <TabPane tab="Custom Fields" key="custom">
          <div className="search-container">
            <Input
              placeholder="Search Custom Fields"
              prefix={<MdSearch />}
              className="search-input"
            />
          </div>

          <div className="fields-grid">
            {customFields.map((field, index) => (
              <DraggableElement
                key={`${field.type}-${index}`}
                field={field}
                id={`custom-${field.type}-${index}`}
              />
            ))}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ElementsSidebar;
