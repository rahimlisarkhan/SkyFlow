import React from 'react';
import { Result, Button } from 'antd';
import styles from './error.module.css';
import { ResultStatusType } from 'antd/es/result';

interface NotFoundType {
  onBack: () => void;
  backTitle: string;
  status?: ResultStatusType;
  title: string;
  subTitle: string;
}

export function NotFound({
  status = 404,
  title,
  subTitle,
  backTitle,
  onBack,
}: NotFoundType) {
  return (
    <div className={styles.errorContainer}>
      <Result
        status={status}
        title={title}
        subTitle={subTitle}
        extra={
          <Button variant="solid" color="blue" onClick={onBack}>
            {backTitle}
          </Button>
        }
      />
    </div>
  );
}
