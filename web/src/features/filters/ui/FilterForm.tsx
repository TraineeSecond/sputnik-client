import { useProductStore } from 'entities/product/model/productStore';
import { useFiltersStore } from 'features/filters/model/filtersStore';
import { useTranslation } from 'react-i18next';

import {
  StyledForm,
  StyledModal,
  StyledOption,
  StyledSelect,
} from './FilterForm.styles';

const FilterForm = () => {
  const { setSortCategory, categories } = useProductStore();
  const { showFilterPopUp, toggleShowFilterPopUp } = useFiltersStore();
  const { t } = useTranslation();
  const handleCategoryChange = (value: string) => {
    void setSortCategory(value);
    toggleShowFilterPopUp();
  };

  return (
    <StyledModal
      title={t('Фильтры')}
      open={showFilterPopUp}
      onCancel={toggleShowFilterPopUp}
      footer={null}
    >
      <StyledForm layout='vertical'>
        <StyledForm.Item label={t('Категория')} name='category'>
          <StyledSelect
            placeholder={t('Выберите категорию товара')}
            onChange={handleCategoryChange}
          >
            <StyledOption value={''}>{t('без фильтров')}</StyledOption>
            {categories.map((category) => (
              <StyledOption key={category} value={category}>
                {t(category)}
              </StyledOption>
            ))}
          </StyledSelect>
        </StyledForm.Item>
      </StyledForm>
    </StyledModal>
  );
};

export default FilterForm;
