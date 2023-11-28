import React from 'react';

function Transaction() {
  
  const receiptContent = {
    id: "1000",
    name: "Sofia",
    itemsBorrowed: "glass",
    status: "Complete",
    date: "10/14/23",
    // Add other properties as needed
  };

  let backgroundColor = '';
  let buttons = null;

  switch (receiptContent.status) {
    case 'Pending':
      backgroundColor = 'yellow';
      buttons = (
        <>
          <button>Done view</button>
          <button>Cancel request</button>
        </>
      );
      break;

    case 'On Borrow':
      backgroundColor = 'green';
      buttons = <button>Return</button>;
      break;

    case 'Pending Return':
      backgroundColor = 'yellow';
      // No button for Pending Return
      break;

    case 'Completed':
      backgroundColor = 'green';
      buttons = <button>Done view</button>;
      break;

    default:
      break;
  }


  return (
    <div style={{ backgroundColor }}>
      <div>
        <p>ID: {receiptContent.id}</p>
        <p>Name: {receiptContent.name}</p>
        <p>Items Borrowed: {receiptContent.itemsBorrowed}</p>
        <p>Date: {receiptContent.date}</p>
        {/* Add other receipt content properties as needed */}
      </div>
      {buttons && <div>{buttons}</div>}
    </div>
  );
}

export default Transaction;
