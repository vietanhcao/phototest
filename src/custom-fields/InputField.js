import React from 'react'
import PropTypes from 'prop-types'
import { Label, Input, FormFeedback } from 'reactstrap'
import { ErrorMessage } from 'formik'



InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
}

InputField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false
}

function InputField(props) {
  const {
    field, form, // fastField formik
    type, label, placeholder, disabled // optional 
  } = props;

  const {name, value, onChange, onBlur,} = field

  //handle error
  const {errors, touched } = form;
  const showError = errors[name] && touched[name] ;

  
  return (
    <div>
      {label && <Label for={name} >{label}</Label>}
      
      <Input 
        id={name} 
        // name={name}
        // value={value}
        // onChange={onChange}
        // onBlur={onBlur}
        {...field}

        type={type}
        disabled={disabled}
        placeholder={placeholder} 

        invalid={showError}// show form Feedback
        />

      {/* {showError && <FormFeedback>{errors[name]}</FormFeedback>} */}
      <ErrorMessage name={name} component={FormFeedback} />
    </div>
  )
}
export default InputField

