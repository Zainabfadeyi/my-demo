import React from 'react';

interface EditableRowProps {
  editFormData: any;
  handleEditFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancelClick: () => void;
}

const EditableRow: React.FC<EditableRowProps> = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
  return (
    <tr>
      <td><input type="text" name="documentNo" value={editFormData.documentNo} onChange={handleEditFormChange} /></td>
      <td><input type="date" name="dateCreated" value={editFormData.dateCreated} onChange={handleEditFormChange} /></td>
      <td><input type="text" name="subject" value={editFormData.subject} onChange={handleEditFormChange} /></td>
      <td><input type="text" name="from" value={editFormData.from} onChange={handleEditFormChange} /></td>
      <td><input type="text" name="recipient" value={editFormData.recipient} onChange={handleEditFormChange} /></td>
      <td><input type="text" name="createdBy" value={editFormData.createdBy} onChange={handleEditFormChange} /></td>
      <td><input type="text" name="status" value={editFormData.status} onChange={handleEditFormChange} /></td>
      <td><input type="text" name="approvalLink" value={editFormData.approvalLink} onChange={handleEditFormChange} /></td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </td>
    </tr>
  );
};

export default EditableRow;
