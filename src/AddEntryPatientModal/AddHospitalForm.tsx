import React from "react";
import { Field, Formik, Form } from "formik";
import { Grid, Button } from "semantic-ui-react";
import { TextField } from "../AddPatientModal/FormField";
import {DiagnosisSelection} from '../AddPatientModal/FormField';
import { useStateValue } from "../state";
import {EntryTypes, NewEntry, NewHospital} from '../types';

interface Props{
    onSubmit :(entry:NewEntry)=>void,
    onCancel:()=>void,
}

const getInitial = ():NewHospital=>{
  return {
    date: "",
    type:EntryTypes.Hospital,
    description: "",
    specialist: "",
    discharge:{
      date:"",
      criteria:""
    }
  };
};

const AddHospitalForm = ({onSubmit, onCancel}:Props) =>{
    const[{diagnoses}, ] = useStateValue();
    return(
        <Formik
      initialValues={getInitial()}
      onSubmit={onSubmit}
      validate={values => {
        console.log(values);
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.discharge.date) {
          errors["discharge.date"]= requiredError;
        }
        if (!values.discharge.criteria) {
          errors["discharge.criteria"] = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
              
            />
            <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
            /> 
            <Field
              label="Date Discharge"
              placeholder="Date Discharge"
              name="discharge.date"
              component={TextField}
              
            />
            <Field
              label="criteria Discharge"
              placeholder="criteria Discharge"
              name="discharge.criteria"
              component={TextField}
              
            />
          
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
    ) ;
};
export default AddHospitalForm;