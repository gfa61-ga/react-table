import React from 'react';
import Cell from './Cell';

class Row extends React.Component {

  state = {
    isEdited: this.props.isNewRow,
    editedRowValues: this.props.item
  };

  handleRowChange = () => e => {
    const { name, value } = e.target;
    let editedRowValues = {
      ...this.state.editedRowValues,
      [name]: value
    };
    this.setState({
      editedRowValues
    });
  };

  editRow = () => () => {
    this.setState({
      isEdited: true
    })
  }

  undoEditRow = () => () => {
    this.setState({
      isEdited: false
    })
  }

  saveThisRow = id => () => {
    this.setState({
      isEdited: false
    });
    this.props.saveRow(id, this.state.editedRowValues)
  };

  render() {
    let props = this.props
    let { item, isNewRow } = props;
    return (
      <tr >
        <td>
          {props.idx}
        </td>

        {props.fieldNames.map((fieldName) =>
          <Cell
            key={fieldName}
            handleRowChange ={this.handleRowChange }
            isEdited={this.state.isEdited}
            fieldName={fieldName}
            value={this.state.isEdited
              ? this.state.editedRowValues[fieldName]
              : item[fieldName]
            }
          />
        )}

        <td>
          { this.state.isEdited
            ?     /* If this row is edited, show "Save" button */
              <button
                onClick={isNewRow
                  ? this.props.addRow(this.state.editedRowValues)
                  : this.saveThisRow(item.id)
                }
                className="buttons save-button"
              >
                <i className="fa fa-save"></i>
              </button>
            :     /* else show "Edit" button */
              <button
                onClick={this.editRow()}
                className="buttons"
              >
                <i className="far fa-edit edit-button"></i>
              </button>
          }
        </td>

        {/* If this is a new row, don't show any button */}
        { !isNewRow && this.state.isEdited && /* else if this row is edited show "Undo" button */
          <td>
            <button
              onClick={this.undoEditRow()}
              className="buttons delete-button"
            >
              <i className="fa fa-undo"></i>
            </button>
          </td>
        }
        { !isNewRow && !this.state.isEdited && /* else show "Delete" button */
          <td>
            <button
              onClick={props.deleteRow(item.id)}
              className="buttons delete-button"
            >
              <i className="far fa-trash-alt"></i>
            </button>
          </td>
        }
      </tr>
    );
  }
}

export default Row;