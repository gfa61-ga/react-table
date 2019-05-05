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
          { (props.query === "") ? (
              rows.map((item, idx) => (
            <tr key={idx}>
              <td>
                {idx}
              </td>

              {fieldNames.map((fieldName, i) => (
                <td key={i}>
                  { editedRowId === idx ? (
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
                { editedRowId !== idx ? (
                  <button
                    onClick={props.editRow(idx)}
                    className="buttons"
                  >
                    <i className="far fa-edit edit-button"></i>
                  </button>
                ) : (
                  <button
                    onClick={props.saveRow(idx)}
                    className="buttons save-button"
                  >
                    <i className="fa fa-save"></i>
                  </button>
                )}
              </td>

              <td>
                <button
                  onClick={props.deleteRow(idx)}
                  className="buttons delete-button"
                >
                  <i className="far fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))
          ) : (
            rows.filter( (row) => row["name"].includes(props.query) ).map((item, idx) => (
            <tr key={idx}>
              <td>
                {idx}
              </td>

              {fieldNames.map((fieldName, i) => (
                <td key={i}>
                  { editedRowId === item.idx ? (
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
                      value={item[fieldName]} // value={rows[idx][fieldName]}
                    />
                  )}
                </td>
              ))}

              <td>
                { editedRowId !== item.idx ? (
                  <button
                    onClick={props.editRow(item.idx)}
                    className="buttons"
                  >
                    <i className="far fa-edit edit-button"></i>
                  </button>
                ) : (
                  <button
                    onClick={props.saveRow(item.idx)}
                    className="buttons save-button"
                  >
                    <i className="fa fa-save"></i>
                  </button>
                )}
              </td>

              <td>
                <button
                  onClick={props.deleteRow(item.idx)}
                  className="buttons delete-button"
                >
                  <i className="far fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))

          )}

        </tbody>
      </table>
    );

}

export default Table;