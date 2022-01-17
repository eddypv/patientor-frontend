import React  from "react";
import { Container, Icon, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { apiBaseUrl } from "../constants";
import {   Patient } from "../types";
import { useStateValue } from "../state";
import axios from "axios";
import EntryList from "./EntryList";
import AddEntryPatientModal from "../AddEntryPatientModal";
import { useState } from "react"; 
const PatientPage = () =>{
    const [{patient}, dispatch] = useStateValue();
    const {patientId} = useParams<{patientId:string}>();
    const[openModal, setOpenModal] = useState<boolean>(false);
    

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
    const handleShowModal =() =>{
        setOpenModal(true);
    };
    const handleOnClose = () =>{
        setOpenModal(false);
    };
    
    
    return(
        <Container>
            <Container>
                <h2 title={patient?.gender}>{patient?.name} <Icon name={patient?.gender == "male" ? "mars":"venus"}  /></h2>
                <p>ssn:{patient?.ssn}</p>
                <p>occupation:{patient?.occupation}</p>
            </Container>
            <EntryList entries={patient?.entries} />
            <AddEntryPatientModal openModal={openModal} onClose={handleOnClose} patientId={patientId} />
            <Container>
                <Button onClick={handleShowModal} primary>Add Entry</Button>
            </Container>
        </Container>
    ) ;
};

export default PatientPage;