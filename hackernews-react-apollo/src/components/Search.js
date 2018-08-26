import React, { Component } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import Link from "./Link";

const SEARCH_FEED = gql`
  query($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

class Search extends Component {
  state = {
    links: [],
    filter: ""
  };

  handleSearch = async () => {
    const { filter } = this.state;
    const result = await this.props.client.query({
      query: SEARCH_FEED,
      variables: { filter }
    });
    const links = result.data.feed.links;
    this.setState({ links });
  };

  handleChange = ({ target }) => this.setState({ filter: target.value });

  render() {
    return (
      <div>
        <div>
          Search
          <input name="filter" type="text" onChange={this.handleChange} />
          <button onClick={() => this.handleSearch()}>OK</button>
        </div>
        {this.state.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
      </div>
    );
  }
}

export default withApollo(Search);
