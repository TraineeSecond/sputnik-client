import { useProductStore } from 'entities/product/model/productStore';
import { useFiltersStore } from 'features/filters/model/filtersStore';

import {
  StyledForm,
  StyledFormContainer,
  StyledOption,
  StyledSelect,
} from 'features/filters/ui/FilterForm.styles';

const FilterForm = () => {
  const { setSortCategory, categories } = useProductStore();
  const { showFilterPopUp, toggleShowFilterPopUp } = useFiltersStore();
  if (!showFilterPopUp) return null;

  const handleCategoryChange = async (value: string) => {
    await setSortCategory(value);
    toggleShowFilterPopUp();
  };

  return (
    <StyledFormContainer>
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
    </StyledFormContainer>
  );
};

export default FilterForm;
