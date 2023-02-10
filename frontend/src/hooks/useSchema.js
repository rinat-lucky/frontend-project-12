import { useTranslation } from "react-i18next";
import * as yup from 'yup';

export const useSchemaNaming = (channels) => {
  const { t } = useTranslation();
  const channelsNames = channels.map((c) => c.name);

  return yup.object().shape({
    channelName: yup.mixed()
      .required(t('error.required'))
      .notOneOf(channelsNames, t('error.notUnique')),
  });
};

export const useSchemaSignup = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    username: yup.string()
      .min(3, t('error.tooShort_3'))
      .max(20, t('error.tooLong'))
      .required(t('error.required')),
    password: yup.string()
      .min(6, t('error.tooShort_6'))
      .required(t('error.required')),
    confirmPassword: yup.string()
      .required(t('error.required'))
      .oneOf([yup.ref('password')], t('error.mustMatch')),
  });
};

export const useSchemaLogin = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    username: yup.string()
      .min(3, t('error.tooShort_3'))
      .max(20, t('error.tooLong'))
      .required(t('error.required')),
    password: yup.string()
      .min(6, t('error.tooShort_6'))
      .required(t('error.required')),
  });
};
