import React from 'react';
import styles from './Products.module.css';
import { Typography, Row, Col, Card } from 'antd';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { InformationType } from '@/types/panel.types';

const { Title, Paragraph } = Typography;

interface IProducts {
  data: InformationType['products'];
}

export function Products({ data }: IProducts) {
  const { t } = useTranslation('common');

  return (
    <section id="product" className={styles.section}>
      <Title level={2}>{t('product')}</Title>
      <Paragraph>{t('product_desc')}</Paragraph>

      <Row gutter={[16, 16]}>
        {data.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <Image
                  alt="product"
                  src={product.imageUrl}
                  width={500}
                  height={300}
                  objectFit="cover"
                />
              }
            ></Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}
