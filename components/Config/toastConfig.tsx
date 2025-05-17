import React from 'react';
import { SuccessToast, ErrorToast, WarningToast } from '../Reusable-Components/CustomToast'; // Adjust path

const toastConfig = {
  custom_success: (props: any) => <SuccessToast {...props} />,
  custom_error: (props: any) => <ErrorToast {...props} />,
  custom_warning: (props: any) => <WarningToast {...props} />,
};

export default toastConfig;
