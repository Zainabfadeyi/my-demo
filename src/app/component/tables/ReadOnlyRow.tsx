import React from 'react';

interface ReadOnlyRowProps {
  memo: {
    id: string;
    documentNo: string;
    dateCreated: string;
    subject: string;
    from: string;
    recipient: string;
    createdBy: string;
    status: string;
    approvalLink: string;
  };
  handleEditClick: (event: React.MouseEvent, memo: any) => void;
  handleDeleteClick: (memoId: string) => void;
  handleSelectMemo: (id: string) => void;
  selected: boolean;
}

const ReadOnlyRow: React.FC<ReadOnlyRowProps> = ({
  memo,
  handleEditClick,
  handleDeleteClick,
  handleSelectMemo,
  selected,
}) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={selected}
          onChange={() => handleSelectMemo(memo.id)}
        />
      </td>
      <td>{memo.documentNo}</td>
      <td>{memo.dateCreated}</td>
      <td>{memo.subject}</td>
      <td>{memo.from}</td>
      <td>{memo.recipient}</td>
      <td>{memo.createdBy}</td>
      <td>{memo.status}</td>
      <td>{memo.approvalLink}</td>
      <td>
        <button type="button" onClick={(event) => handleEditClick(event, memo)}>
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(memo.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
