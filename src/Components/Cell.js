import React from 'react';
import { Table as SuiTable, Input } from 'semantic-ui-react'

function Cell(props) {
  let { fieldName, value, isEdited } = props;
  return (
    <SuiTable.Cell textAlign="center">
        <Input
          type="text"
          name={fieldName}
          value={value}
          onChange={props.handleRowChange()}
          disabled={isEdited ? false : true}
        />
    </SuiTable.Cell>
  );
}

export default Cell;