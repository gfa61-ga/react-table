import React from 'react';
import Table from './Components/Table';
import Search from './Components/Search';
import './App.css';
import {apiData} from './initialData.js';

class App extends React.Component {
  state = {
    query: "",
    editedRowId: "",
    editedRowValues: {},
    rows: [{
      name: "",
      username: ""
    }],
  };

  fieldNames = Object.keys(this.state.rows[0]);

  componentDidMount() {


    let data = apiData.map((row, i) =>{ return {...row, idx: i} })
    this.setState({
      rows: data
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
    const item = {};
    this.fieldNames.map((fieldName) => (
      item[fieldName]=""
    ))
    this.setState({
      rows: [...this.state.rows, item],
      editedRowId: this.state.rows.length,
      editedRowValues: item
    });
  };

  editRow = (idx) => () => {
    const editedRowId = idx
    this.setState({
      editedRowId,
      editedRowValues: this.state.rows[idx]
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

  saveRow = idx => e => {
    const rows = [...this.state.rows];
    rows[idx] = {...this.state.editedRowValues};
    this.setState({
      rows,
      editedRowId: "",
      editedRowValues: {}
    });
  };

  deleteRow = (idx) => () => {
    const rows = [...this.state.rows]
    rows.splice(idx, 1)
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
          rows={this.state.rows}
          handleRowChange ={this.handleRowChange }
          editRow={this.editRow}
          saveRow={this.saveRow}
          deleteRow={this.deleteRow}
        />
        <button className="buttons add-button" onClick={this.addRow}>Add <i className="fas fa-plus"></i></button>
      </div>
    );
  }
}

export default App;