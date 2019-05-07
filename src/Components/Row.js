import React from 'react';
import Cell from './Cell';

function Row(props) {
  let { item, isNewRow, editedRowValues, editedRowId } = props;
  return (
    <tr key={item.id}>
      <td>
        {props.idx}
      </td>

      {props.fieldNames.map((fieldName) => (
        <Cell
          handleRowChange ={props.handleRowChange }
          isEdited={editedRowId === item.id}
          fieldName={fieldName}
          value={editedRowId !== item.id ? item[fieldName] : editedRowValues[fieldName]}
        />
      ))}

      <td>
        { editedRowId !== item.id ? (
          <button
            onClick={props.editRow(item.id)}
            className="buttons"
          >
            <i className="far fa-edit edit-button"></i>
          </button>
        ) : (
          <button
            onClick={props.saveRow(item.id)}
            className="buttons save-button"
          >
            <i className="fa fa-save"></i>
          </button>
        )}
      </td>

      <td>
        <button
          onClick={props.deleteRow(item.id)}
          className="buttons delete-button"
        >
          <i className="far fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  );
}

export default Row;