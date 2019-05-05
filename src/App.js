import React from 'react';
import Table from './Components/Table';
import Search from './Components/Search';
import './App.css';
import {apiData} from './initialData.js';
import uuid from 'uuid/v4';


class App extends React.Component {
  state = {
    query: "",
    editedRowId: "",
    editedRowValues: {},
    rows: []
  };

  fieldNames = ["name", "username"];

  componentDidMount() {
    this.setState({
      rows: apiData
    })

  /*
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        data = data.map((row, i) =>{ return {...row, idx: i} })
        this.setState({
          rows: data
        })
      }
    )
    */
  }

  addRow = () => {
    const item = {id: uuid()};
    this.fieldNames.map((fieldName) => (
      item[fieldName]=""
    ))
    this.setState({
      rows: [...this.state.rows, item],
      editedRowId: item.id,
      editedRowValues: item
    });
  };

  editRow = (id) => () => {
    const editedRowId = id
    this.setState({
      editedRowId,
      editedRowValues: (this.state.rows.filter((row)=>row.id===id))[0]
    })
  }

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

  saveRow = id => e => {
    let rows = [...this.state.rows];
    rows = rows.map((row)=> {

      if (row.id!==id) {
        return row
      } else {
        return {...row, ...this.state.editedRowValues}
      }
    })
    this.setState({
      rows,
      editedRowId: "",
      editedRowValues: {}
    });
  };

  deleteRow = (id) => () => {
    let rows = [...this.state.rows]
    rows = rows.filter((row)=>row.id!==id)
    this.setState({
      rows,
      editedRowId: ""
    })
  }

  updateQuery = (userQuery) => {
    const validateQuery = userQuery.replace(/[^a-zA-Z ]+|^\s/g, '').replace(/\s+/g, ' ');
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
          query={this.state.query}
          editedRowId={this.state.editedRowId}
          editedRowValues={this.state.editedRowValues}
          rows={this.state.rows.filter( (row) => row["name"].includes(this.state.query) )}
          handleRowChange ={this.handleRowChange }
          editRow={this.editRow}
          saveRow={this.saveRow}
          deleteRow={this.deleteRow}
        />
        { this.state.query === "" &&
          <button className="buttons add-button" onClick={this.addRow}>Add <i className="fas fa-plus"></i></button>
        }
      </div>
    );
  }
}

export default App;