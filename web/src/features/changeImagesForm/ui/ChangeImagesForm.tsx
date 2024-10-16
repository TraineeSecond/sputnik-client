import { MouseEventHandler } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload';
import { useProductStore } from 'entities/product/model/productStore';
import { useTranslation } from 'react-i18next';

import { useChangeImageFormStore } from '../model/changeImageForm';
import {
  StyledButton,
  StyledForm,
  StyledImg,
  StyledModal,
  StyledUpload,
} from './ChangeImagesForm.style';

type ChangeImagesFormProps = {
  id: number;
};

const ChangeImagesForm = ({ id }: ChangeImagesFormProps) => {
  const {
    showChangeImageFormPopUp,
    toggleShowChangeImageFormPopUp,
    imagePreview,
    setImagePreview,
    imageFile,
    setImageFile,
  } = useChangeImageFormStore();

  const { addImageToProduct, loadProductById } = useProductStore();

  const { t } = useTranslation();

  const handleBeforeUpload = (file: RcFile) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
    return false;
  };
  const handleCancel = () => {
    setImageFile(null);
    setImagePreview(null);
    toggleShowChangeImageFormPopUp();
  };

  const handleFinish: MouseEventHandler<HTMLElement> = async (e) => {
    e.stopPropagation();
    if (imageFile) {
      setImageFile(null);
      setImagePreview(null);
      toggleShowChangeImageFormPopUp();
      await addImageToProduct(id, imageFile);
      await loadProductById(id);
    }
  };

  return (
    <StyledModal
      title={t('добавление изображения')}
      open={showChangeImageFormPopUp}
      onCancel={handleCancel}
      footer={null}
    >
      <StyledForm layout='vertical'>
        <StyledUpload
          accept='image/*'
          showUploadList={false}
          beforeUpload={handleBeforeUpload}
        >
          <StyledButton icon={<PlusOutlined />}>
            {t('Загрузить изображение')}
          </StyledButton>
          <StyledButton onClick={handleFinish}>{t('Подтвердить')}</StyledButton>
        </StyledUpload>
        {imagePreview && (
          <StyledImg
            src={imagePreview}
            alt='Предварительный просмотр'
            style={{ width: '100%', marginTop: '10px' }}
          />
        )}
      </StyledForm>
    </StyledModal>
  );
};

export default ChangeImagesForm;
