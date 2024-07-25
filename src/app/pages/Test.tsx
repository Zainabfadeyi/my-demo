import React, { useState, Fragment } from 'react';
import data from '../../mock-data.json';
import ReadOnlyRow from '../component/tables/ReadOnlyRow';
import EditableRow from '../component/tables/EditableRow';

const Test: React.FC = () => {
  const [memos, setMemos] = useState(data);
  const [editFormData, setEditFormData] = useState({
    documentNo: '',
    dateCreated: '',
    subject: '',
    from: '',
    recipient: '',
    createdBy: '',
    status: '',
    approvalLink: '',
  });
  const [editMemoId, setEditMemoId] = useState<string | null>(null);
  const [selectedMemos, setSelectedMemos] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleEditFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (event: React.MouseEvent, memo: any) => {
    event.preventDefault();
    setEditMemoId(memo.id);
    setEditFormData(memo);
  };

  const handleCancelClick = () => {
    setEditMemoId(null);
  };

  const handleDeleteClick = (memoId: string) => {
    setMemos((prev) => prev.filter((memo) => memo.id !== memoId));
  };

  const handleEditFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (editMemoId === null) {
      return;
    }
    const editedMemo = { ...editFormData, id: editMemoId };
    setMemos((prev) => prev.map((memo) => (memo.id === editMemoId ? editedMemo : memo)));
    setEditMemoId(null);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedMemos([]);
    } else {
      const allMemoIds = memos.map((memo) => memo.id);
      setSelectedMemos(allMemoIds);
    }
    setSelectAll(!selectAll);
  };

  const handleSelectMemo = (id: string) => {
    if (selectedMemos.includes(id)) {
      setSelectedMemos(selectedMemos.filter((memoId) => memoId !== id));
    } else {
      setSelectedMemos([...selectedMemos, id]);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Document No</th>
              <th>Date Created</th>
              <th>Subject</th>
              <th>From</th>
              <th>Recipient</th>
              <th>Created By</th>
              <th>Status</th>
              <th>Approval Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {memos.map((memo) => (
              <Fragment key={memo.id}>
                {editMemoId === memo.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    memo={memo}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    handleSelectMemo={handleSelectMemo}
                    selected={selectedMemos.includes(memo.id)}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Test;
