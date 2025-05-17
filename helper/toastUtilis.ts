import Toast from 'react-native-toast-message';

export const showToast = (
  toastType: 'success' | 'error' | 'warning',
  toastHeading: string,
  toastMessage: string
) => {
  let type = '';

  switch (toastType) {
    case 'success':
      type = 'custom_success';
      break;
    case 'error':
      type = 'custom_error';
      break;
    case 'warning':
      type = 'custom_warning';
      break;
    default:
      type = 'custom_success';
  }

  Toast.show({
    type,
    text1: toastHeading,
    text2: toastMessage,
  });
};
