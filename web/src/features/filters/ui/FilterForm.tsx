import { Select } from 'antd';
import styled from 'styled-components';
import { useFiltersStore } from '../model/filtersStore';
import { useProductStore } from 'entities/product/model/productStore';
import { StyledForm } from 'features/productListing/ui/ProductListingForm.styles';

const { Option } = Select;

const FormContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255);
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    width: 300px;
`;

const FilterForm = () => {
    const { setSortCategory, categories } = useProductStore();
    const { showFilterPopUp, toggleShowFilterPopUp } = useFiltersStore()
    if (!showFilterPopUp) return null

    const handleCategoryChange = (value: string) => {
        setSortCategory(value);
        toggleShowFilterPopUp();
    };

    return (
        <FormContainer>
            <StyledForm layout="vertical">
                <StyledForm.Item label="Категория" name="category">
                    <Select
                        placeholder="выберите категорию товара"
                        onChange={handleCategoryChange}
                    >
                        <Option value={""}>без фильтров</Option>
                        {categories.map((category) => (
                            <Option key={category} value={category}>
                                {category}
                            </Option>
                        ))}
                    </Select>
                </StyledForm.Item>
            </StyledForm>
        </FormContainer>
    );
};

export default FilterForm;
