//////////////////
//     Edit      //
//////////////////
const topics = ['Big O', 'API'];

class Edit extends React.Component {
  state = {
    editForm: false
  }

  //edit name
    editName = (event) => {
      this.setState({
        updateName: event.target.value
      })
    }

  //edit topic
  // editTopic = (event) => {
  //   this.setState({
  //     updateTopic: event.target.value
  //   })
  // }

  //edit reply
    editReply = (event) => {
      this.setState({
        updateReply: event.target.value
      })
    }

  //EDIT
    updateReply = (event) => {
      // event.preventDefault();
      const id = event.target.getAttribute('id');
      axios.put(
        '/reply/' + id,
        {
          name: this.state.updateName,
          reply: this.state.updateReply,
        }
      ).then((response) => {
        this.setState({
          replies: response.data
        })
      })
    }

    //toggle edit form
    toggleEditForm = () => {
      this.setState({
        editForm: !this.state.editForm
      })
    }

  render = () => {
    const {blog} = this.props;
    return ( <div>
      <button
      id="edit-del-btn"
      onClick={this.toggleEditForm}>
      <img id="edit-icon" src="https://img.icons8.com/material-sharp/24/000000/edit.png"/>
      </button>

      { this.state.editForm ? (<form id={blog.id} onSubmit={this.updateReply}>
        <input type="text" placeholder="Name" onKeyUp={this.editName}/><br/>
        <input type="text" placeholder="Reply" onKeyUp={this.editReply}/><br/>
        <input type="submit" value="Update"/><br/>
        </form>) : ('')}
      </div>
    )
  }
}

// ===> Global Variables
const questions = ['Please explain Big O Notation in the simiplest terms.', 'How would you explain APIs to my non-technical mother?']
// const randQuestion = questions[Math.floor(Math.random() * questions.length)];


//////////////////
//     App      //
//////////////////

class App extends React.Component {
  state = {
    replies: [],
    createForm: false,
    pastReplies: false,
    displayQues: false,
    topics: ['Big O', 'API', 'Data Structures'],
    optionSelected: '',
  }

  // CREATE
  createReply = (event) => {
    // event.preventDefault()
    axios.post(
      '/reply',
      {
        name: this.state.newName,
        topic: this.state.optionSelected,
        reply: this.state.newReply,
      }
    ).then(
      (response) => {
        this.setState({
          replies: response.data,
        })
      }
    )
  }

  changeNewName = (event) => {
    this.setState({
      newName: event.target.value
    })
  }

  // changeNewTopic = (event) => {
  //   this.setState({
  //     newTopic: event.target.value
  //   })
  // }

  changeNewReply = (event) => {
    this.setState({
      newReply: event.target.value
    })
  }

  // READ
  componentDidMount = () => {
    axios.get('/reply').then(
      (response) => {
        this.setState({
          replies: response.data
        })
      }
    )
  }

// DELETE
  deletePost = (event) => {
    event.preventDefault();
    axios.delete('/reply/' + event.target.value).then(
      (response) => {
        this.setState(
          {
            replies: response.data
          })
        }
      )
    }

  //toggle create form
  toggleCreateForm = () => {
    this.setState({
      createForm: !this.state.createForm,
      pastReplies: false
    })
  }

  //toggle past replies
  togglePastReplies = () => {
    this.setState({
      pastReplies: !this.state.pastReplies,
      createForm: false
    })
  }
  //toggle question
  revealQuestion = () => {
    const randQuestion = questions[Math.floor(Math.random() * questions.length)];
    this.setState({
      displayQues: !this.state.displayQues,
      randQuestion: randQuestion
    })
  }

  dropDownSelect = (event) => {
    this.setState({
      optionSelected: event.target.value
    })
  }

  render = () => {

    return (<div className="body-div">
      <div className="header-section">
        <h1 className="techi-title">Techi</h1>
      </div>
      <div className="grid-container">
        <nav>
          <h2 className="nav-title">Navigation</h2>
          <button id="nav-btn" onClick={this.revealQuestion}>Question</button><br/>
          <button id="nav-btn" onClick={this.toggleCreateForm}>Add Reply</button><br/>
          <button id="nav-btn" onClick={this.togglePastReplies}>Past Replies</button>
        </nav>

      <div className="container">

        { this.state.displayQues ? (<div className="question-div">
        <em id="question-em">Question: </em><br/>
        <h3 id="question-txt">
        {this.state.randQuestion}</h3></div>) : ('')}


      { this.state.createForm ? (<div className="create-form-div"><form className="create-form" onSubmit={this.createReply}>
        <div className="name-topic-form">
          <div>
            <label>Name</label><br/>
            <input id="name-input" type="text" placeholder="add your name" onKeyUp={this.changeNewName}/>
          </div>

          <div id="topic-div">
            <label id="topic-label">Topic</label>
            <select value={this.state.optionSelected} onChange={this.dropDownSelect}>
              { this.state.topics.map((topic, index) => (
                <option value={topic}>{topic}</option>
              )) }
            </select><br/>
          </div>
        </div>

          <div>
          <label>Reply</label><br/>
          <textarea id="reply-textbox" type="text" placeholder="write your answer" onKeyUp={this.changeNewReply}/><br/>
          </div>

          <input type="submit" value="Share"/><br/>
        </form></div>) : ('')}


        { this.state.pastReplies ?  (<div>
          <ul>
            {this.state.replies.map(
              (blog) => {
                return <li>
                <h2>{blog.name} <em id="topic-em">Topic: {blog.topic}</em></h2>
                <p>{blog.reply}</p>

                <button
                id="edit-del-btn"
                value={blog.id} onClick={this.deletePost}><img src="https://img.icons8.com/ios-glyphs/30/000000/delete-forever.png"/></button>

                <Edit blog={blog}></Edit>

                </li>
              }
            )}
            </ul>
          </div>) : ('') }
        </div>
      </div>
    </div>

    )
  }
}
ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)
