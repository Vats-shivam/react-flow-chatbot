// src/DynamicForm.js
import React from 'react';

const DynamicForm = ({ nodes }) => {
  return (
    <form>
      {nodes.map((node) => (
        <div key={node.id}>
          <label>{node.data.label}</label>
          {node.data.questionType === 'text' && <input type="text" />}
          {node.data.questionType === 'textarea' && <textarea />}
          {/* Add more input types as needed */}
        </div>
      ))}
      <button type="submit" className='bg-black'>Submit</button>
    </form>
  );
};

export default DynamicForm;
