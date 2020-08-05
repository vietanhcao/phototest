import { PHOTO_CATEGORY_OPTIONS } from 'constants/global';
import DatePickerField from 'custom-fields/DatePickerField';
import InputField from 'custom-fields/InputField';
import InputFieldAntd from 'custom-fields/InputFieldAntd';
import RandomPhotoField from 'custom-fields/RandomPhotoField';
import SelectField from 'custom-fields/SelectField';
import { addPhoto, updatePhoto } from 'features/Photo/photoSlice';
import { FastField, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';

function PhotoForm(props) {

  const validationSchema = Yup.object().shape({
    title: Yup.string().trim().required('This field is required'),

    categoryId: Yup.number().required('This field is required').nullable(),

    password: Yup.string().required('This field is required'),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match the same')
      .required('This field is required'),

    photo: Yup.string().when('categoryId', {
      is: 1,
      then: Yup.string().required('This field is required'),
      // otherwise: Yup.string().notRequired()
    }),
    datePicker: Yup.object().required('This field is required').nullable(),

    titleAntd: Yup.string().required('This field is required'),
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch();

  const onHandleSubmit = (values, formHelper) => {
    if(props.isAddMode){
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(values);
          const action = addPhoto({ ...values, _id: new Date().getTime(), datePicker: values.datePicker.toISOString() });
          dispatch(action);
          formHelper.resetForm();
          history.push(`/photos/list`);
          resolve(true);
        }, 2000);
      });
    }else{
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const action = updatePhoto({ ...values, datePicker: values.datePicker.toISOString() });
          dispatch(action);
          formHelper.resetForm();
          history.push(`/photos/list`);
          resolve(true);
        }, 2000);
      });
    }

  };

  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={validationSchema}
      onSubmit={onHandleSubmit}
      enableReinitialize // get default from api
    >
      {(formikProps) => {
        const { values, errors, touched, isSubmitting } = formikProps;
        console.log('PhotoForm -> values, errors, touched', values, errors, touched);

        return (
          <Form>
            <FastField name="title" component={InputField} label="Title" placeholder="wow" />

            <FastField
              name="password"
              type="password"
              component={InputField}
              label="Password"
              placeholder="wow1"
            />

            <FastField
              name="confirmPassword"
              type="password"
              component={InputField}
              label="confirmPassword"
              placeholder="wow2"
            />

            <FastField
              name="categoryId"
              component={SelectField}
              label="Category"
              placeholder="What's your photo category?"
              options={PHOTO_CATEGORY_OPTIONS}
            />

            <FastField
              name="titleAntd"
              component={InputFieldAntd}
              label="TitleAntd"
              placeholder="wow..."
            />

            <FastField name="datePicker" component={DatePickerField} label="datePicker" />

            <FastField name="photo" component={RandomPhotoField} label="Photo" />

            <FormGroup>
              <Button type="submit" color="primary">
                {isSubmitting && <Spinner size="sm" />}Add to album
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
}

PhotoForm.propTypes = {};

export default PhotoForm;
