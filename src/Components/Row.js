import React from 'react';
import Cell from './Cell';
import { Table as SuiTable, Button } from 'semantic-ui-react'

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
      <SuiTable.Row>
        <SuiTable.Cell>
          {props.idx}
        </SuiTable.Cell>

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

        <SuiTable.Cell>
          { this.state.isEdited
            ?     /* If this row is edited, show "Save" Button */
              <Button
                circular
                onClick={isNewRow
                  ? this.props.addRow(this.state.editedRowValues)
                  : this.saveThisRow(item.id)
                }
              >
                <i className="fa fa-save"></i>
              </Button>
            :     /* else show "Edit" Button */
              <Button
                circular
                onClick={this.editRow()}
              >
                <i className="far fa-edit edit-Button"></i>
              </Button>
          }
        </SuiTable.Cell>

        {/* If this is a new row, don't show any Button */}
        { !isNewRow && this.state.isEdited && /* else if this row is edited show "Undo" Button */
          <SuiTable.Cell>
            <Button
              basic
              color='red'
              circular
              onClick={this.undoEditRow()}
            >
              <i className="fa fa-undo"></i>
            </Button>
          </SuiTable.Cell>
        }
        { !isNewRow && !this.state.isEdited && /* else show "Delete" Button */
          <SuiTable.Cell>
            <Button
              basic
              color='red'
              circular
              onClick={props.deleteRow(item.id)}
            >
              <i className="far fa-trash-alt"></i>
            </Button>
          </SuiTable.Cell>
        }
      </SuiTable.Row>
    );
  }
}

export default Row;