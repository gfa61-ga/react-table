import React from 'react';
import Table from './Components/Table';
import Search from './Components/Search';
import './App.css';
import uuid from 'uuid/v4';

class App extends React.Component {
  state = {
    query: "",
    rows: [],
    addNewRow: false // When addNewRow is true,
                     // the Table shows an extra empty row
  };

  fieldNames = ["name", "username"]; // Defines the fieldnames of rows,
                                     // that we want to be displayed in Table

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        this.setState({
          rows: data
        })
      }
    )
  }

  // Show a new empty row in Table component
  showNewRow = () => {
    this.setState({
      addNewRow: true
    });
  }

  // Add to rows table, the values that are entered into the new empty row of Table component
  addRow = (newRowValues) => () => {
    newRowValues.id = uuid();
    this.setState({
      rows: [...this.state.rows, newRowValues],
      addNewRow: false
    });
  };

  deleteRow = (id) => () => {
    let rows = this.state.rows.filter(row =>
      row.id!==id
    )
    this.setState({
      rows
    })
  }

  // This function is called from saveThisRow() funtion of the Row component
  saveRow = (id, editedRowValues) => {
    let rows = this.state.rows.map((row)=> {
      if (row.id!==id) {
        return row
      } else {
        return {...row, ...editedRowValues}
      }
    })
    this.setState({
      rows
    });
  };

  updateQuery = (userQuery) => {
    const validateQuery =
      userQuery.replace(/[^a-zA-Z ]+|^\s/g, '').replace(/\s+/g, ' ');

    this.setState({
      query: validateQuery
    });
  }

  render() {
    return (
      <div className="app-container">
        <Search
          updateQuery={this.updateQuery}
        />

        <Table
          fieldNames={this.fieldNames}
          addNewRow={this.state.addNewRow}
          rows={this.state.rows.filter(row =>
            row["name"].includes(this.state.query)
          )}
          saveRow={this.saveRow}
          deleteRow={this.deleteRow}
          addRow={this.addRow}
        />

        { this.state.addNewRow !== true && /* Hide "Add" button, while adding a new row */
          <button
            className="buttons add-button"
            onClick={this.showNewRow}
          >
            Add <i className="fas fa-plus"></i>
          </button>
        }
      </div>
    );
  }
}

export default App;