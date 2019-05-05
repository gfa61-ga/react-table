import React from 'react';

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
            <tr key={item.id}>
              <td>
                {idx}
              </td>

              {fieldNames.map((fieldName, i) => (
                <td key={fieldName}>
                  { editedRowId === item.id ? (
                    <input
                      type="text"
                      name={fieldName}
                      value={editedRowValues[fieldName]}
                      onChange={props.handleRowChange()}
                      className="input-enabled"
                    />
                  ) : (
                    <input
                      disabled
                      value={rows[idx][fieldName]}
                    />
                  )}
                </td>
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
          ))}

        </tbody>
      </table>
    );

}

export default Table;