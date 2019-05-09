import React from 'react';
import Row from './Row';
import { Table as SuiTable } from 'semantic-ui-react'

function Table(props) {

    let { fieldNames, rows } = props;

    // Set initial values for a new empty row's object
    let newRow = {};
    fieldNames.map((fieldName) => (
      newRow[fieldName]=""
    ))

    return (
      <SuiTable>
        <SuiTable.Header>
          <SuiTable.Row textAlign="center">
            <SuiTable.HeaderCell textAlign="left"> # </SuiTable.HeaderCell>

            {fieldNames.map((fieldName) =>
              <SuiTable.HeaderCell key={fieldName}>
                {fieldName}
              </SuiTable.HeaderCell>
            )}

            <SuiTable.HeaderCell></SuiTable.HeaderCell>
            <SuiTable.HeaderCell></SuiTable.HeaderCell>
          </SuiTable.Row>
        </SuiTable.Header>

        <SuiTable.Body>
          { rows.map((item, idx) =>
            <Row
              key={item.id}
              isNewRow = {false}
              item = {item}
              fieldNames = {fieldNames}
              idx= {idx+1}
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
        </SuiTable.Body>
      </SuiTable>
    );
}

export default Table;