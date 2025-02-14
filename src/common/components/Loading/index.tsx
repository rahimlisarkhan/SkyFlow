import React from "react";
import { Spin, Space } from "antd";
import styles from "./Loading.module.css"; // Import the CSS module

const Loading = () => {
  return (
    <div className={styles.container}>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
};

export default Loading;
