import React from "react";
import { DiagnosisListProps, EntryListProps} from '../types';
import { Container, List} from 'semantic-ui-react';

const DiagnosisList = ({diagnoses}: DiagnosisListProps) =>{
    return (
        <List>
            {diagnoses?.map((diagnose) => 
                <List.Item key={diagnose} >
                    <List.Icon name="circle"/>
                    <List.Content>{diagnose}</List.Content>
                </List.Item> 
                )}
        </List>
    );
};
const EntryList= ({entries}:EntryListProps) =>{
    return(
        <Container>
            <h3>Entries</h3>
            {entries?.map((entry)=> {
                return(
                    <Container key={entry.id}>
                        <p>{entry.date} {entry.description}</p>
                        <DiagnosisList  diagnoses={entry.diagnosisCodes} />
                    </Container>
                ) ;
            })}
        </Container>
    );
};
export default EntryList;