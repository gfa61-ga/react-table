import React from 'react';
import { Input } from 'semantic-ui-react'
import _ from 'lodash'

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
				onChange={_.debounce(
					this.onQueryChange,
					500,
					{
            leading: true,
          }
        )}
			/>
		);
	}
}

export default Search;