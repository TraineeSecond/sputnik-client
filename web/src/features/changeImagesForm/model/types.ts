import { RcFile } from 'antd/es/upload';

export interface IChangeImageFormState {
  showChangeImageFormPopUp: boolean;
  imagePreview: string | null;
  imageFile: RcFile | null;
  toggleShowChangeImageFormPopUp: () => void;
  setImagePreview: (image: string | null) => void;
  setImageFile: (file: RcFile | null) => void;
}
