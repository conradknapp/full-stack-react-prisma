import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const ADD_POST = gql`
  mutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

class CreateLink extends Component {
  state = {
    description: "",
    url: ""
  };

  handleChange = ({ target }) => this.setState({ [target.name]: target.value });

  render() {
    const { description, url } = this.state;
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            name="description"
            value={description}
            onChange={this.handleChange}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={url}
            name="url"
            onChange={this.handleChange}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <Mutation
          mutation={ADD_POST}
          variables={{ description, url }}
          onCompleted={() => this.props.history.push("/")}
        >
          {post => <button onClick={post}>Submit</button>}
        </Mutation>
      </div>
    );
  }
}

export default CreateLink;
