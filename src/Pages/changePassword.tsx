import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Label from "../ComposantsCommun/Label.tsx";
import { changePassword } from "../Helpers/apiHelper.ts";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../ComposantsCommun/Layout.tsx";
import CardContent from '../ComposantsCommun/CardContent.tsx';
import Card from '../ComposantsCommun/Card.tsx';
import { useTranslation } from "react-i18next";
import Button from "../ComposantsCommun/Button.tsx";
import { LoginForm } from "../Interface/Interface.ts";
import Notification from "../ComposantsCommun/Notification.tsx";
import { SectionIntro } from '../ComposantsCommun/SectionIntro.tsx';
import ButtonVisible from '../ComposantsCommun/buttonVisible.tsx';

// Interface pour définir la structure des données du formulaire
interface SignUpFormValues {
  password: string;
  confirmePassword: string;
  errorPassword: string;
}

// Composant fonctionnel ChangePassword
const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showPasswordFirst, setShowPasswordFirst] = useState(false);
  const [showPasswordSecond, setshowPasswordSecond] = useState(false);
  
  // Récupérez les paramètres de la query string
  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const userName = params.get('userName');

  const toggleShowPassword = () => {
    setShowPasswordFirst((prevShowPassword) => !prevShowPassword);
  };

  const toggleShowSecondPassword = () => {
    setshowPasswordSecond((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (values: SignUpFormValues) => {
    const data: LoginForm = {
      token: token ?? "",
      userName: userName ?? "",
      password: values.password
    };

    const response = await changePassword('auth/changePassword', data);
    if (response.status === 201) {
      setNotificationMessage(t('passwordChange'));
      setNotificationType('success');
      setShowNotification(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      setNotificationMessage(t('tokenchangePasswordExpired'));
      setNotificationType('error');
      setShowNotification(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  return (
    <Layout>
      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}
      <div className="flex flex-row justify-center mt-32">
        <div className="flex items-center ">
          <div>
            <Card className="w-96">
              <CardContent className="bg-tertiari text-secondary w-96 pb-6 pt-6">
                <div className="mt-2 mb-2">
                  <div className="flex flex-col mb-5 text-center font-bold">
                    <SectionIntro
                      title={t('forgotPasswordTitle')}
                      className="text-secondary text-left"
                    />
                  </div>
                  <Formik
                    initialValues={{ password: '', confirmePassword: '', errorPassword: '' }}
                    validate={(values) => {
                      const errors: Partial<SignUpFormValues> = {};
                      if (!values.password || !values.confirmePassword) {
                        if (!values.password) {
                          errors.password = 'Ce champ est requis';
                        }
                        if (!values.confirmePassword) {
                          errors.confirmePassword = 'Ce champ est requis';
                        }
                      } else if (values.password !== values.confirmePassword) {
                        errors.errorPassword = 'Les mots de passes ne sont pas identiques';
                      }

                      return errors;
                    }}
                    onSubmit={handleSubmit}
                  >
                    <Form className="pr-10 pl-10">
                      <Label htmlFor="password" id={"password"}>{t('password')}</Label>
                      <div className='relative'>
                        <Field
                          type={showPasswordFirst ? 'text' : 'password'}
                          id="password"
                          name="password"
                          className={"h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full text-primary"}
                        />
                        <ButtonVisible
                          isVisible={showPasswordFirst}
                          onToggle={toggleShowPassword}
                          ariaLabel={showPasswordFirst ? t('Hide password') : t('Show password')}
                        />
                        <ErrorMessage name="password" component="div" className="text-error" />
                      </div>
                      <div>
                        <Label htmlFor="confirmePassword" id={"confirmePassword"}>{t('confirmePassword')}</Label>
                        <div className='relative'>
                          <Field
                            type={showPasswordSecond ? 'text' : 'password'}
                            id="confirmePassword"
                            name="confirmePassword"
                            className={"h-14 shadow-2xl rounded-md p-2 mt-2 border-gray-300 border-2 placeholder-gray-300 w-full text-primary"}
                          />
                          <ButtonVisible
                            isVisible={showPasswordSecond}
                            onToggle={toggleShowSecondPassword}
                            ariaLabel={showPasswordSecond ? t('Hide password') : t('Show password')}
                          />
                          <ErrorMessage name="confirmePassword" component="div" className="text-error" />
                        </div>
                      </div>
                      <div className="mt-5">
                        <Button type="submit" id={"submitRequest"} className="bg-secondary text-tertiari  w-full h-12 rounded-md uppercase">
                          {t('submitRequest')}
                        </Button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChangePassword;
