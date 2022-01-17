import React, { useState } from "react";
import { Container, Form,Select } from "semantic-ui-react";

import {EntryTypes, NewEntry} from '../types';
import AddHealthCheckForm from "./AddHealthCheckForm";
import AddHospitalForm from "./AddHospitalForm";
import AddOccupationalForm from "./AddOccupationalForm";

interface Props{
    onSubmit :(entry:NewEntry)=>void,
    onCancel:()=>void
}
const entryOptions  =[
    { key:EntryTypes.HealthCheck, value:EntryTypes.HealthCheck, label:"Health Check"},
    { key:EntryTypes.Hospital,value:EntryTypes.Hospital, label:"Hospital"},
    { key:EntryTypes.OccupationalHealthcare, value:EntryTypes.OccupationalHealthcare, label:"Occupational Healthcare"}
];


const AddEntryForm = ({onSubmit, onCancel}:Props) =>{
  const [entryType, setEntryType] = useState<string>(EntryTypes.HealthCheck);

  const selectEntryTypeComponent = (entryType:string) =>{
    switch(entryType){
      case EntryTypes.HealthCheck:
        return <AddHealthCheckForm onSubmit={onSubmit} onCancel={onCancel}/>;
      case EntryTypes.Hospital:
        return <AddHospitalForm onSubmit={onSubmit} onCancel={onCancel} />;
      case EntryTypes.OccupationalHealthcare: 
        return <AddOccupationalForm onSubmit={onSubmit} onCancel={onCancel}/>;
    }
  };
    return(
      <Container>
        <Form.Field>
            <label>Types</label>
            <Select className="ui dropdown" 
                options={entryOptions}
                value = {entryType}
                onChange={(event, data) =>{setEntryType(data.value as string);}}
                placeholder="Type"
              />
        </Form.Field>
        {selectEntryTypeComponent(entryType)}
      </Container>    
    ) ;
};
export default AddEntryForm;