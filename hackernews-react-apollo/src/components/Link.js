import React, { Component } from "react";
import { AUTH_TOKEN } from "../constants";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const VOTE = gql`
  mutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

const GET_FEED = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
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

// const Link = ({ link }) => (
//   <div>
//     {link.description} ({link.url})
//   </div>
// );
class Link extends Component {
  handleUpdate = (store, createVote, linkId) => {
    const data = store.readQuery({ query: GET_FEED });

    const votedLink = data.feed.links.find(link => link.id === linkId);
    votedLink.votes = createVote.link.votes;

    store.writeQuery({ query: GET_FEED, data });
  };

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const { link, index } = this.props;

    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{index + 1}.</span>
          {authToken && (
            <Mutation
              mutation={VOTE}
              variables={{ linkId: link.id }}
              update={(cache, { data: { vote } }) =>
                this.handleUpdate(cache, vote, link.id)
              }
            >
              {vote => (
                <div className="ml1 gray f11" onClick={vote}>
                  ▲
                </div>
              )}
            </Mutation>
          )}
        </div>
        <div className="ml1">
          <div>
            {link.description} ({link.url})
          </div>
          <div className="f6 lh-copy gray">
            {link.votes.length} votes | by{" "}
            {link.postedBy ? link.postedBy.name : "Unknown"} {link.createdAt}
          </div>
        </div>
      </div>
    );
  }
}

export default Link;
