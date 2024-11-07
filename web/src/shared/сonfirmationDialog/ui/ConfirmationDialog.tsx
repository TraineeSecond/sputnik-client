import { useTranslation } from 'react-i18next';

import { StyledModal } from './ConfirmationDialog.styles';

interface ConfirmationDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  content: string;
}

const ConfirmationDialog = ({
  onConfirm,
  onCancel,
  title,
  content,
}: ConfirmationDialogProps) => {
  const { t } = useTranslation();

  return (
    <StyledModal
      title={title}
      visible={true}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={t('да')}
      cancelText={t('нет')}
    >
      {content}
    </StyledModal>
  );
};

export default ConfirmationDialog;
