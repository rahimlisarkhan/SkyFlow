import { Col, Skeleton } from 'antd';
import { SkeletonButtonProps } from 'antd/es/skeleton/Button';
import React from 'react';

interface ISkeleton extends SkeletonButtonProps {
  width?: number | string;
  height?: number;
  count?: number;
  length?: number;
  radius?: number;
  span?: number;
}

function Skeletons({
  width = 340,
  height = 150,
  length = 6,
  span = 8,
  radius = 6,
  ...props
}: ISkeleton) {
  const list = Array.from({ length }).fill(0);

  return list.map((_, index) => (
    <Col key={index} span={span}>
      <Skeleton.Button
        active
        style={{ width, height, borderRadius: radius, ...props.style }}
        {...props}
      />
    </Col>
  ));
}
export default Skeletons;
