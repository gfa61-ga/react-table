import React from 'react';
import Row from './Row';

function Table(props) {

    let { fieldNames, rows } = props;

    // Set initial values for a new empty row's object
    let newRow = {};
    fieldNames.map((fieldName) => (
      newRow[fieldName]=""
    ))

    return (
      <table>
        <thead>
          <tr>
            <th> # </th>

            {fieldNames.map((fieldName) =>
              <th key={fieldName}>
                {fieldName}
              </th>
            )}

            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          { rows.map((item, idx) =>
            <Row
              key={item.id}
              isNewRow = {false}
              item = {item}
              fieldNames = {fieldNames}
              idx= {idx + 1}
              saveRow={props.saveRow}
              deleteRow={props.deleteRow}
            />
          )}

          { props.addNewRow &&
            <Row
              key={'new_row'}
              isNewRow = {true}
              item = {newRow}
              fieldNames = {fieldNames}
              idx= {"new"}
              addRow={props.addRow}
              deleteRow={props.deleteRow}
            />
          }
        </tbody>
      </table>
    );
}

export default Table;