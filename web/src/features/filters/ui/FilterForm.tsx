import { useProductStore } from 'entities/product/model/productStore';
import { useFiltersStore } from 'features/filters/model/filtersStore';

import {
  StyledForm,
  StyledModal,
  StyledOption,
  StyledSelect,
} from './FilterForm.styles';

const FilterForm = () => {
  const { setSortCategory, categories } = useProductStore();
  const { showFilterPopUp, toggleShowFilterPopUp } = useFiltersStore();

  const handleCategoryChange = (value: string) => {
    void setSortCategory(value);
    toggleShowFilterPopUp();
  };

  return (
    <StyledModal
      title='Фильтры'
      open={showFilterPopUp}
      onCancel={toggleShowFilterPopUp}
      footer={null}
    >
      <StyledForm layout='vertical'>
        <StyledForm.Item label='Категория' name='category'>
          <StyledSelect
            placeholder='выберите категорию товара'
            onChange={handleCategoryChange}
          >
            <StyledOption value={''}>без фильтров</StyledOption>
            {categories.map((category) => (
              <StyledOption key={category} value={category}>
                {category}
              </StyledOption>
            ))}
          </StyledSelect>
        </StyledForm.Item>
      </StyledForm>
    </StyledModal>
  );
};

export default FilterForm;
