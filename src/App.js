import React from 'react';
import Table from './Components/Table';
import Search from './Components/Search';
import './App.css';
import uuid from 'uuid/v4';

class App extends React.Component {
  state = {
    query: "",
    rows: [],
    addNewRow: false
  };

  fieldNames = ["name", "username"];

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        data = data.map((row, i) =>{ return {...row, idx: i} })
        this.setState({
          rows: data
        })
      }
    )
  }

  addRow = (editedRowValues) => {
    editedRowValues.id = uuid();
    if (!editedRowValues.name) {
      editedRowValues.name = ""
    }

    this.setState({
      rows: [...this.state.rows, editedRowValues],
      addNewRow: false
    });
  };

  showNewRow = () => {
    this.setState({
      addNewRow: true
    });
  }

  saveRow = (id, editedRowValues) => {
    let rows = [...this.state.rows];
    rows = rows.map((row)=> {

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

  deleteRow = (id) => () => {
    let rows = [...this.state.rows]
    rows = rows.filter((row)=>row.id!==id)
    this.setState({
      rows
    })
  }

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
          query={this.state.query}
          editedRowId={this.state.editedRowId}
          editedRowValues={this.state.editedRowValues}
          rows={this.state.rows.filter((row) =>
            row["name"].includes(this.state.query)
          )}
          handleRowChange ={this.handleRowChange}
          editRow={this.editRow}
          saveRow={this.saveRow}
          deleteRow={this.deleteRow}
          addRow={this.addRow}
        />
        { this.state.addNewRow !== true &&
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