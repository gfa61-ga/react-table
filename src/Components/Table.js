import React from 'react';
import Row from './Row';

function Table(props) {

    let { fieldNames, rows } = props;
    let newRow = {};
    fieldNames.map((fieldName) => (
      newRow[fieldName]=""
    ))

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
              key={item.id}
              isNewRow = {false}
              item = {item}
              fieldNames = {fieldNames}
              idx= {idx}
              saveRow={props.saveRow}
              deleteRow={props.deleteRow}
            />
          ))}
          { props.addNewRow &&
            <Row
              key={'new_row'}
              newRow= {newRow}
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