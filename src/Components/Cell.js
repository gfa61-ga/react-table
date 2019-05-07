import React from 'react';

function Cell(props) {
  let { fieldName, value, isEdited } = props;
  return (
    <td key={fieldName}>
        <input
          type="text"
          name={fieldName}
          value={value}
          onChange={props.handleRowChange()}
          disabled={isEdited ? false : true}
          className={isEdited ? "input-enabled" : ""}
        />
    </td>
  );
}

export default Cell;