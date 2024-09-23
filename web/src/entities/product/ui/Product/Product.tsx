import { Button, Card, Col, Row, Typography } from 'antd';
import { Product as ProductInterface } from 'entities/product/model/types';
import React from 'react';

const { Title, Text } = Typography;

interface ProductProps extends Omit<ProductInterface, 'user'> {
  user: {
    name: string;
  };
}



interface PriceInfoProps {
  price: number,
  new_price: number
}
const PriceInfo: React.FC<PriceInfoProps> = ({ price, new_price }) => {
  if (price == new_price) {
    return <Text strong>{price}Р</Text>
  }
  return <><Text delete>{price}Р</Text> <Text strong>{new_price}Р</Text></>

}

const Product: React.FC<ProductProps> = ({
  name,
  category,
  description,
  price,
  new_price,
  user,
}) => {
  return (
    <Card
      hoverable
      style={{ width: 300 }}
      cover={
        <img
          alt={name}
          src={`https://via.placeholder.com/300x200?text=${name}`}
        />
      }
    >
      <Row>
        <Col span={24}>
          <Title level={4}>{name}</Title>
        </Col>
        <Col span={24}>
          <Text type='secondary'>категория: {category}</Text>
        </Col>
        <Col span={24}>
          <Text>описание: {description}</Text>
        </Col>
        <Col span={24}>
          <Text>
            {"цена: "}
            <PriceInfo price={price} new_price={new_price} />
          </Text>
        </Col>
        <Col span={24} style={{ marginTop: '10px' }}>
          <Button type='primary'>перейти</Button>
        </Col>
        <Col span={24} style={{ marginTop: '10px' }}>
          <Text type='secondary'>продавец: {user.name}</Text>
        </Col>
      </Row>
    </Card>
  );
};

export default Product;
