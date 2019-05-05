import React from 'react';
import { DebounceInput } from 'react-debounce-input';

class Search extends React.Component {

	onQueryChange = (evt) => {
		this.props.updateQuery(evt.target.value);
	}

	render() {
		return (
			<div className="search">
				<DebounceInput
					type="text"
					placeholder="Search.."
					onChange={this.onQueryChange}
					debounceTimeout={500}
				/>
			</div>
		);
	}
}

export default Search;