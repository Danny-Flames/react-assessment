import React from "react";
import { Layout, Button, Typography, Space } from "antd";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "./Header.scss";
import BackIcon from "../../../assets/arrow-left.png";
import Logo from "../../../assets/logo.png";
import ImportIcon from "../../../assets/import.png";
import NavIcon1 from "../../../assets/nav-icon-1.png";
import NavIcon2 from "../../../assets/nav-icon-2.png";
import NavIcon3 from "../../../assets/nav-icon-3.png";
import NavIcon4 from "../../../assets/nav-icon-4.png";
import { IoIosMore } from "react-icons/io";

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

const Header = ({
  formTitle,
  formId,
  onSave,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}) => {
  return (
    <div>
      <AntHeader className="form-header">
        <div className="form-header__left">
          <img src={BackIcon} alt="Back-Icon" height={24} width={26} />

          <div className="form-info">
            <img src={Logo} alt="Logo-Icon" height={42} width={42} />

            <div className="form-details">
              <h2 className="form-title">
                {formTitle}
              </h2>
              <Text className="form-id" type="secondary">
                {formId}
              </Text>
            </div>
          </div>
        </div>

        <div className="form-header__right">
          <Space>
            <Button
              icon={
                <div style={{ marginTop: "5px" }}>
                  <img
                    src={ImportIcon}
                    alt="import-Icon"
                    height={14}
                    width={14}
                  />
                </div>
              }
              className="import-btn"
            >
              Import JSON
            </Button>

            <Button className="publish-btn">Publish</Button>

            <Button type="primary" onClick={onSave} className="save-btn">
              Save
            </Button>

            <Button type="text" icon={<IoIosMore />} className="more-btn" />
          </Space>
        </div>
      </AntHeader>
      <div className="form-header-lower">
        <div className="form-header-lower__nav-item">Details</div>
        <div className="form-header-lower__nav-item">Identities</div>
        <div className="form-header-lower__nav-item active">Builder</div>
        <div className="form-header-lower__nav-item">Settings</div>
        <div className="form-header-lower__nav-item">Embed</div>
        <div className="form-header-lower__nav-item">Theme</div>
        <div className="form-header-lower__nav-item">PDF Filler</div>
        <div className="form-header-lower__nav-item">API Mappings</div>
        <div className="form-header-lower__nav-item">Workflow</div>
        <div className="form-header-lower__nav-item">Digest</div>
        <div className="form-header-lower__nav-item-grid">
          <div className="form-header-lower__nav-item-grid-inner">
            <div className="form-header-lower__nav-item-circleArrow">
              <MdKeyboardArrowRight size={16} />
            </div>
            <div>
              <img
                src={NavIcon1}
                alt="import-Icon"
                height={20}
                width={20}
                className="form-header-lower__nav-item-grid-inner-icon"
              />
            </div>
            <div>
              <img
                src={NavIcon2}
                alt="import-Icon"
                height={20}
                width={20}
                className="form-header-lower__nav-item-grid-inner-icon"
              />
            </div>
            <div>
              <img
                src={NavIcon3}
                alt="import-Icon"
                height={20}
                width={20}
                className="form-header-lower__nav-item-grid-inner-icon"
              />
            </div>
            <div>
              {" "}
              <img
                src={NavIcon4}
                alt="import-Icon"
                height={20}
                width={20}
                className="form-header-lower__nav-item-grid-inner-icon"
              />
            </div>
          </div>
          <div className="form-header-lower__nav-item-circleArrow end">
            <MdKeyboardArrowLeft size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
