import React from 'react';
import { Modal } from 'semantic-ui-react';
import { NewEntry } from '../types';
import AddEntryForm from './AddEntryForm';
interface Props{
  openModal:boolean,
  onClose:()=>void,
  onSubmit:(entry:NewEntry) => void

}
const AddEntryPatientModal = ({openModal, onClose, onSubmit}:Props) => (
  <Modal open={openModal} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient</Modal.Header>
    <Modal.Content>
      <AddEntryForm  onCancel={onClose} onSubmit={onSubmit} />
    </Modal.Content>
  </Modal>
);
  
export default AddEntryPatientModal;