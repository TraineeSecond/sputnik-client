import { AddToCartButton } from 'features';
import { useTranslation } from 'react-i18next';
import { calculateDiscount, formatPriceRub } from 'shared';

import {
  StyledCarousel,
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
  StyledRate,
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
  const { t } = useTranslation();

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

  const renderProductImages = () => {
    if (product.images.length === 0) {
      return (
        <StyledProductImage
          src={`https://via.placeholder.com/200x300?text=${product?.name}`}
          alt={product?.name}
        />
      );
    }

    return product.images.map((image) => (
      <StyledProductImage key={image.id} src={image.image} alt={product.name} />
    ));
  };

  return (
    <StyledProductView>
      <StyledProductContainer>
        <StyledProductInfo>
          <StyledH1>{product?.name}</StyledH1>
          <StyledP>{product?.category}</StyledP>
          <StyledRate disabled value={product.rating} />
          <StyledP>{`${t('Количество отзывов:')} ${product.reviewerscount}`}</StyledP>
          <StyledP>{product?.description}</StyledP>
        </StyledProductInfo>
        <StyledWrapper>
          <StyledCarousel>{renderProductImages()}</StyledCarousel>
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
