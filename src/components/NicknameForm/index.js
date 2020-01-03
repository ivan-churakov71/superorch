import React from "react";
import useFormValidation from "../../hooks/useFormValidation";
import * as PrimaryForm from "../PrimaryForm";

const INITIAL_VALUES = {
   nickname: ""
};

function NicknameForm() {

  //const [login, { loading, error: backendError }] = useLoginQuery();

  function validate(values) {
    const errors = {};
    // Password errors
    if (!values.nickname) {
      errors.nickname = 'Required Nickname';
    }
    return errors;
  }
  
   function authenticate() {
      //login({ variables: { nickname: values.nickname } })
   }

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_VALUES, validate, authenticate);

  console.log(errors);

  return (
    <>
    <form onSubmit={handleSubmit} onBlur={handleBlur} onB>
      <PrimaryForm.Field>
        <PrimaryForm.Input
          type="text"
          name="nickname"
          onChange={handleChange}
          value={values.nickname}
        />
        {errors.nickname && <PrimaryForm.Error>{errors.nickname}</PrimaryForm.Error>}
      </PrimaryForm.Field>
      {/* {backendError && <PrimaryForm.Error>{backendError}</PrimaryForm.Error>} */}
      <PrimaryForm.Button disabled={isSubmitting} type="submit">
        Submit
      </PrimaryForm.Button>
    </form>
    {/* {loading && <span>Loading ...</span>} */}
    </>
  );
}

export default NicknameForm;
