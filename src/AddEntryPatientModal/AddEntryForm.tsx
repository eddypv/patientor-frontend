import React, { useState } from "react";
import { Container, Form,Segment,Select } from "semantic-ui-react";

import {EntryTypes, NewEntry, Entry} from '../types';
import AddHealthCheckForm from "./AddHealthCheckForm";
import AddHospitalForm from "./AddHospitalForm";
import AddOccupationalForm from "./AddOccupationalForm";
import axios from 'axios';
import { apiBaseUrl } from "../constants";

interface Props{
    onCancel:()=>void,
    patientId:string
}
const entryOptions  =[
    { key:EntryTypes.HealthCheck, value:EntryTypes.HealthCheck, text:"Health Check"},
    { key:EntryTypes.Hospital,value:EntryTypes.Hospital, text:"Hospital"},
    { key:EntryTypes.OccupationalHealthcare, value:EntryTypes.OccupationalHealthcare, text:"Occupational Healthcare"}
];


const AddEntryForm = ({patientId, onCancel}:Props) =>{
  const [entryType, setEntryType] = useState<string>(EntryTypes.HealthCheck);
  const [messageError, setMessageError]  = useState<string|undefined>(undefined);
  const handleAddEntry = async(entry:NewEntry)=>{
    try{
        const {data:newEntry}= await axios.post<Entry>(`${apiBaseUrl}/patients/${patientId}/entries`, entry);
        setMessageError(undefined);
        console.log(newEntry);
    }catch(error:any){
        
        setMessageError(error?.response?.data?.error);
    }
    
  };
  const selectEntryTypeComponent = (entryType:string) =>{
    switch(entryType){
      case EntryTypes.HealthCheck:
        return <AddHealthCheckForm onSubmit={handleAddEntry} onCancel={onCancel}/>;
      case EntryTypes.Hospital:
        return <AddHospitalForm onSubmit={handleAddEntry} onCancel={onCancel} />;
      case EntryTypes.OccupationalHealthcare: 
        return <AddOccupationalForm onSubmit={handleAddEntry} onCancel={onCancel}/>;
    }
  };
    return(
      <Container>
        {messageError && <Segment inverted color="red">{`Error: ${messageError}`}</Segment>}
        <Form>
          <Form.Field>
              <label>Types</label>
              <Select className="ui dropdown" 
                  options={entryOptions}
                  value = {entryType}
                  onChange={(event, data) =>{
                    setEntryType(data.value as string);
                  }}
                  placeholder="Type"
                />
          </Form.Field>
        </Form>
        
        {selectEntryTypeComponent(entryType)}
      </Container>    
    ) ;
};
export default AddEntryForm;