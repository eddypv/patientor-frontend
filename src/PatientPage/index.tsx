import React  from "react";
import { Container, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue } from "../state";
import axios from "axios";
import EntryList from "./EntryList";

const PatientPage = () =>{
    const [{patient}, dispatch] = useStateValue();
    const {patientId} = useParams<{patientId:string}>();
    useEffect(()=>{
        const getPatient = async (id:string) =>{
            const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            
            if(response.status == 200){
                dispatch({"type":"GET_PATIENT", payload:response.data});
            }else{
                dispatch({"type":"GET_PATIENT", payload:undefined});
            }
        };
        
        void getPatient(patientId);
        
    }, []);
    console.log(patient);
    return(
        <Container>
            <Container>
                <h2 title={patient?.gender}>{patient?.name} <Icon name={patient?.gender == "male" ? "mars":"venus"}  /></h2>
                <p>ssn:{patient?.ssn}</p>
                <p>occupation:{patient?.occupation}</p>
            </Container>
            <EntryList entries={patient?.entries} />
        </Container>
    ) ;
};

export default PatientPage;