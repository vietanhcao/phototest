import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, FastField } from 'formik';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import InputField from 'custom-fields/InputField';
import { PHOTO_CATEGORY_OPTIONS } from 'constants/global';
import SelectField from 'custom-fields/SelectField';
import RandomPhotoField from 'custom-fields/RandomPhotoField';
import * as Yup from 'yup';
import DatePickerField from 'custom-fields/DatePickerField';
import InputFieldAntd from 'custom-fields/InputFieldAntd';


function PhotoForm(props) {
  const initialValues = {
    title: '',
    categoryId: null,
    photo: '',
    datePicker: null,
    titleAntd: '',
    password: '',
    confirmPassword: '',
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().trim().required('This field is required'),

    categoryId: Yup.number()
      .required('This field is required')
      .nullable(),
    
    password: Yup.string().required('This field is required'),

    confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match the same').required('This field is required'),

    photo: Yup.string().when('categoryId', {
      is: 1,
      then: Yup.string().required('This field is required'),
      // otherwise: Yup.string().notRequired()
    }),
    datePicker: Yup.object().required('This field is required').nullable(),

    titleAntd: Yup.string().required('This field is required'),
  })

  return (
    <Formik 
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={ () => { console.log('okkkk')}}
      enableReinitialize // get default from api
    >
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        console.log('PhotoForm -> values, errors, touched', values, errors, touched);

        return (
          <Form>
            <FastField name="title" component={InputField} label="Title" placeholder="wow" />

            <FastField name="password" type="password" component={InputField} label="Password" placeholder="wow1" />

            <FastField name="confirmPassword" type="password" component={InputField} label="confirmPassword" placeholder="wow2" />

            <FastField
              name="categoryId"
              component={SelectField}
              label="Category"
              placeholder="What's your photo category?"
              options={PHOTO_CATEGORY_OPTIONS}
            />

            <FastField name="titleAntd" component={InputFieldAntd} label="TitleAntd" placeholder="wow..." />

            <FastField
              name="datePicker"
              component={DatePickerField}
              label="datePicker"
            />

            <FastField
              name="photo"
              component={RandomPhotoField}
              label="Photo"
            />


            <FormGroup>
              <Button type="submit" color="primary">Add to album</Button>
            </FormGroup>
            
          </Form>
        );
      }}
    </Formik>
  );
}

PhotoForm.propTypes = {};

export default PhotoForm;
