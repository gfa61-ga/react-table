import React from 'react';
import Cell from './Cell';

class Row extends React.Component {

  state = {
    isEdited: this.props.isNewRow ? true : false,
    editedRowValues: this.props.newRow
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

  editRow = (id) => () => {
    this.setState({
      isEdited: true,
      editedRowValues: this.props.item
    })
  }

  saveRow = id => {
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

        {props.fieldNames.map((fieldName) => (
          <Cell
            key={fieldName}
            handleRowChange ={this.handleRowChange }
            isEdited={this.state.isEdited}
            fieldName={fieldName}
            value={!this.state.isEdited
              ? item[fieldName]
              : this.state.editedRowValues[fieldName]
            }
          />
        ))}

        <td>
          { !this.state.isEdited ? (
            <button
              onClick={this.editRow(item.id)}
              className="buttons"
            >
              <i className="far fa-edit edit-button"></i>
            </button>
          ) : (
            <button
              onClick={isNewRow
                ? () => {this.props.addRow(this.state.editedRowValues)}
                : () => {this.saveRow(item.id)}
              }
              className="buttons save-button"
            >
              <i className="fa fa-save"></i>
            </button>
          )}
        </td>
        { !isNewRow &&
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