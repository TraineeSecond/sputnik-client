import { useEffect } from 'react';

import { useProductStore } from 'entities/product/model/productStore';
import { AddToCartButton } from 'features';
import { useChangeImageFormStore } from 'features/changeImagesForm/model/changeImageForm';
import ChangeImagesForm from 'features/changeImagesForm/ui/ChangeImagesForm';
import { useChatStore } from 'features/chat/model/chatStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { calculateDiscount, formatPriceRub } from 'shared';
import { useAuthStore } from 'shared/auth/model/authStore';

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
  StyledSpin,
  StyledWrapper,
} from './ProductView.styles';
import { StyledButton } from 'features/productListing/ui/ProductListingForm.styles';

import { useProductViewStore } from '../model/ProductViewStore';

import { IProduct } from 'entities/product/model/types';

type ProductViewProps = {
  product: IProduct;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  loading: boolean;
  isBuyer: boolean;
  userId: number | undefined;
};

const ProductView = ({
  product,
  quantity,
  onIncrement,
  onDecrement,
  loading,
  isBuyer,
  userId,
}: ProductViewProps) => {
  const { currentImage, setCurrentImage } = useProductViewStore();
  const discount = calculateDiscount(product.price, product.new_price);
  const { toggleShowChangeImageFormPopUp } = useChangeImageFormStore();
  const { deleteProductImage, loadProductById, changeImagesProcess } =
    useProductStore();
  const navigate = useNavigate();
  const { user, token } = useAuthStore();
  const { startChatWithSeller } = useChatStore();
  const { t } = useTranslation();

  useEffect(() => {
    setCurrentImage(product.images[0] || null);
  }, [product.images, setCurrentImage]);

  const handleWriteToSeller = async () => {
    if (!product || !user || !token) return;
    const chatId = await startChatWithSeller(
      user.id,
      product.userid,
      token,
      product.id,
    );
    if (chatId) {
      navigate(`/chat/${chatId}`);
    }
  };

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

  const handleDeleteImageButton = async () => {
    if (currentImage) {
      await deleteProductImage(currentImage);
      await loadProductById(product.id);
    }
  };

  const renderImageChangeButtons = () => {
    if (!isBuyer && product.userid === userId) {
      if (changeImagesProcess) {
        return <StyledSpin />;
      }
      return (
        <>
          <StyledButton onClick={toggleShowChangeImageFormPopUp}>
            {t(`загрузить новое изображение`)}
          </StyledButton>
          {product.images.length !== 0 && (
            <StyledButton onClick={handleDeleteImageButton}>
              {t(`удалить это изображение`)}
            </StyledButton>
          )}
        </>
      );
    }
  };

  const renderWriteToSellerButton = () => {
    if (isBuyer && product.userid !== user?.id) {
      return (
        <StyledButton type='primary' onClick={handleWriteToSeller}>
          {t('Чат с продавцом')}
        </StyledButton>
      );
    }
    return null;
  };

  const handleCarouselChange = (current: number) => {
    setCurrentImage(product.images[current]);
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
    <>
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
            <StyledCarousel afterChange={handleCarouselChange}>
              {renderProductImages()}
            </StyledCarousel>
            <StyledProductDetails>
              <StyledPriceSection>
                <StyledNewPrice>
                  {formatPriceRub(product.new_price)}
                </StyledNewPrice>
                {renderOldPriceAndDiscount()}
              </StyledPriceSection>
            </StyledProductDetails>
            {renderAddToCartButton()}
            {renderImageChangeButtons()}
            {renderWriteToSellerButton()}
          </StyledWrapper>
        </StyledProductContainer>
      </StyledProductView>
      <ChangeImagesForm id={product.id} />
    </>
  );
};

export default ProductView;
