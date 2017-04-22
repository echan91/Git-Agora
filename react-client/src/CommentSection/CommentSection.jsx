import React from 'react';
import { connect } from 'react-redux';

import CommentEntry from './CommentEntry.jsx';
import { insertComment, fetchComments, updateCommentText } from './commentActions';

export class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { getComments, topic_id, type } = this.props;
    getComments(topic_id, type);
  }


  handleSubmit(e) {
    e.preventDefault();
    const { addComment, type, topic_id, content, user } = this.props;
    const { username, avatar } = user;
    let date_created = new Date().toDateString();
    addComment(topic_id, type, username, date_created, content, avatar);
  }

  render () {
    const { comments, updateCommentText, user } = this.props;

    return (
      <div>
        <div>
          {comments && comments.map(comment => <div><CommentEntry comment={comment} user={user}/></div>)}
        </div>
        <form>
          <input onChange={(e) => {updateCommentText(e.target.value); }}type="textbox"></input>
          <button onClick={this.handleSubmit}>Add Comment</button>
        </form>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    comments: state.comments.comments,
    content: state.comments.content,
    user: state.navBar.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getComments: (topic_id, type) => dispatch(fetchComments(topic_id, type)),
    addComment: (topic_id, type, username, date_created, content, avatar) => dispatch(insertComment(topic_id, type, username, date_created, content, avatar)),
    updateCommentText: (text) => dispatch(updateCommentText(text))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(CommentSection);
