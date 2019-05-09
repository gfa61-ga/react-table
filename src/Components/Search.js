import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import { Input } from 'semantic-ui-react'

class Search extends React.Component {

	onQueryChange = (evt) => {
		this.props.updateQuery(evt.target.value);
	}

	render() {
		return (
			<Input
			  fluid
			  type="text"
				icon="search"
				placeholder="Search.."
				onChange={this.onQueryChange}
			/>
		);
	}
}

export default Search;