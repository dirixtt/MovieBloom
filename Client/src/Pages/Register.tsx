import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const initialValues= {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Некорректный email').required('Обязательное поле'),
    password: Yup.string()
    .required('Обязательное поле')
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Пароль должен содержать минимум одну строчную букву, одну заглавную букву, одну цифру и один специальный символ'
    ),
  
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Пароли должны совпадать').required('Обязательное поле'),
  });

  const handleSubmit = (values) => {
    // Обработка отправки формы, например, отправка данных на сервер
  };

  return (
    <div className='border bg-slate-500 w-1/3 m-auto gap-5 h-screen items-center flex justify-center flex-col text-white' >
      <h1>Регистрация</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label htmlFor="password">Пароль:</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>

          <div>
            <label htmlFor="confirmPassword">Подтвердите пароль:</label>
            <Field type="password" id="confirmPassword" name="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" />
          </div>

          <button type="submit">Зарегистрироваться</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
