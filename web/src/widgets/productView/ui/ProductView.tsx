import { AddToCartButton } from 'features';
import { calculateDiscount, formatPriceRub } from 'shared';

import {
  StyledDiscount,
  StyledH1,
  StyledNewPrice,
  StyledOldPrice,
  StyledP,
  StyledPriceSection,
  StyledProductContainer,
  StyledProductDetails,
  StyledProductImage,
  StyledProductInfo,
  StyledProductView,
  StyledWrapper,
} from './ProductView.styles';

import { Product } from 'entities/product/model/types';

type ProductViewProps = {
  product: Product;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  loading: boolean;
  isBuyer: boolean;
};

const ProductView = ({
  product,
  quantity,
  onIncrement,
  onDecrement,
  loading,
  isBuyer,
}: ProductViewProps) => {
  const discount = calculateDiscount(product.price, product.new_price);

  const renderOldPriceAndDiscount = () => {
    if (product.price !== product.new_price) {
      return (
        <>
          <StyledOldPrice>{formatPriceRub(product.price)}</StyledOldPrice>
          <StyledDiscount>{`-${discount}%`}</StyledDiscount>
        </>
      );
    }
    return null;
  };

  const renderAddToCartButton = () => {
    if (isBuyer) {
      return (
        <AddToCartButton
          quantity={quantity}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          loading={loading}
        />
      );
    }
    return null;
  };

  return (
    <StyledProductView>
      <StyledProductContainer>
        <StyledProductInfo>
          <StyledH1>{product?.name}</StyledH1>
          <StyledP>{product?.category}</StyledP>
          <StyledP>{product?.description}</StyledP>
        </StyledProductInfo>
        <StyledWrapper>
          <StyledProductImage
            src={`https://via.placeholder.com/200x300?text=${product?.name}`}
            alt={product?.name}
          />
          <StyledProductDetails>
            <StyledPriceSection>
              <StyledNewPrice>
                {formatPriceRub(product.new_price)}
              </StyledNewPrice>
              {renderOldPriceAndDiscount()}
            </StyledPriceSection>
          </StyledProductDetails>
          {renderAddToCartButton()}
        </StyledWrapper>
      </StyledProductContainer>
    </StyledProductView>
  );
};

export default ProductView;
