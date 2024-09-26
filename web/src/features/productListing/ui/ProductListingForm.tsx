import { useEffect } from 'react';

import { useAuthStore } from 'features/auth/model/authStore';
import { useProductListingStore } from 'features/productListing/model/productListingStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { formatPrice, parsePrice } from 'shared';

import {
  StyledButton,
  StyledContainer,
  StyledForm,
  StyledFormItem,
  StyledInput,
  StyledInputNumber,
  StyledOption,
  StyledSelect,
  StyledSpace,
  StyledTextArea,
  StyledTitle,
} from './ProductListingForm.styles';

import { ProductListingFormValues } from './types';

//TODO:Добавить возможность добавления изображения, оповещения

const CURRENCY_SYMBOL = '₽';
const MAX_DESCRIPTION_LENGTH = 500;
const MIN_PRICE = 1;

const ProductListingForm = () => {
  const [form] = StyledForm.useForm();
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { categories, fetchCategories, createProduct } =
    useProductListingStore();
  const navigate = useNavigate();

  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  const isCategoryListEmpty = categories.length === 0;

  const nameRules = [{ required: true, message: t('Введите название товара') }];
  const descriptionRules = [
    { required: true, message: t('Введите описание товара') },
  ];
  const categoryRules = [{ required: true, message: t('Выберите категорию') }];
  const priceRules = [{ required: true, message: t('Введите цену товара') }];

  const handleSubmit = async (values: ProductListingFormValues) => {
    if (!user?.id) return;

    const { name, description, price, category } = values;

    const product = {
      name,
      description,
      price,
      category,
      userId: user.id,
    };

    try {
      await createProduct(product);
      form.resetFields();
    } catch (error) {
      console.error('Ошибка при создании товара:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    navigate('/');
  };

  const renderCategoryOptions = () =>
    categories.map((category) => (
      <StyledOption key={category} value={category}>
        {t(category)}
      </StyledOption>
    ));

  return (
    <StyledForm
      form={form}
      layout='vertical'
      onFinish={handleSubmit}
      size='large'
    >
      <StyledTitle level={2}>{t('Выставить товар')}</StyledTitle>
      <StyledFormItem name='name' rules={nameRules}>
        <StyledInput placeholder={t('Введите название товара')} />
      </StyledFormItem>

      <StyledFormItem name='description' rules={descriptionRules}>
        <StyledTextArea
          placeholder={t('Введите описание товара')}
          showCount
          maxLength={MAX_DESCRIPTION_LENGTH}
          autoSize={{
            minRows: 6,
            maxRows: 6,
          }}
        />
      </StyledFormItem>

      <StyledContainer>
        <StyledFormItem name='price' rules={priceRules}>
          <StyledInputNumber
            prefix={CURRENCY_SYMBOL}
            min={MIN_PRICE}
            controls={false}
            formatter={formatPrice}
            parser={parsePrice}
            placeholder={t('Введите цену товара')}
          />
        </StyledFormItem>

        <StyledFormItem name='category' rules={categoryRules}>
          <StyledSelect
            placeholder={t('Выберите категорию')}
            disabled={isCategoryListEmpty}
          >
            {renderCategoryOptions()}
          </StyledSelect>
        </StyledFormItem>
      </StyledContainer>

      <StyledFormItem>
        <StyledSpace>
          <StyledButton type='primary' htmlType='submit'>
            {t('Добавить объявление')}
          </StyledButton>
          <StyledButton type='default' onClick={handleCancel}>
            {t('Отменить')}
          </StyledButton>
        </StyledSpace>
      </StyledFormItem>
    </StyledForm>
  );
};

export default ProductListingForm;
