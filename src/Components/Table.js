import React from 'react';
import Row from './Row';

function Table(props) {

    let { fieldNames, editedRowId, editedRowValues, rows } = props;
    return (
      <table>
        <thead>
          <tr>
            <th> # </th>
            {fieldNames.map((fieldName, i) => (
              <th key={i}>
                {fieldName}
              </th>
            ))}
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>

          { rows.map((item, idx) => (
            <Row
              isNewRow = {false}
              item = {item}
              fieldNames = {fieldNames}
              editedRowValues = {editedRowValues}
              editedRowId = {editedRowId}
              idx= {idx}
              handleRowChange ={props.handleRowChange }
              editRow={props.editRow}
              saveRow={props.saveRow}
              deleteRow={props.deleteRow}
            />
          ))}

        </tbody>
      </table>
    );

}

export default Table;