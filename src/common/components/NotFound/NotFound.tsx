import React, { memo } from 'react';
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

function NotFound({
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
          <Button type="primary" onClick={onBack}>
            {backTitle}
          </Button>
        }
      />
    </div>
  );
}

export default memo(NotFound);
