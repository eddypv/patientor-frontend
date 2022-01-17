import React from 'react';
import { Modal } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';
interface Props{
  openModal:boolean,
  onClose:()=>void,
  patientId:string

}
const AddEntryPatientModal = ({openModal, onClose, patientId}:Props) => (
  <Modal open={openModal} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient</Modal.Header>
    <Modal.Content>
      <AddEntryForm  onCancel={onClose} patientId={patientId} />
    </Modal.Content>
  </Modal>
);
  
export default AddEntryPatientModal;