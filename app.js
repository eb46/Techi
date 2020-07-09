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
      <button onClick={this.toggleEditForm}>Edit</button>

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

    return (<div>
      <h1>Techi</h1>
      <button onClick={this.revealQuestion}>Question</button>
      { this.state.displayQues ? (<div className="question-div">{this.state.randQuestion}</div>) : ('')}

      <button onClick={this.toggleCreateForm}>Add Reply</button>

      { this.state.createForm ? (<form onSubmit={this.createReply}>
        <input type="text" placeholder="Name" onKeyUp={this.changeNewName}/><br/>
        <input type="text" placeholder="Reply" onKeyUp={this.changeNewReply}/><br/>

        <select value={this.state.optionSelected} onChange={this.dropDownSelect}>
          { this.state.topics.map((topic, index) => (
            <option value={topic}>{topic}</option>
          )) }
        </select>

        <input type="submit" value="Share"/><br/>
      </form>) : ('')}


      <button onClick={this.togglePastReplies}>Past Replies</button>
        { this.state.pastReplies ?  (<div>
          <ul>
            {this.state.replies.map(
              (blog) => {
                return <li>
                <h2>{blog.name}</h2>
                <em>{blog.topic}</em>
                <h3>{blog.reply}</h3>
                <button value={blog.id} onClick={this.deletePost}>Delete</button>

                <Edit blog={blog}></Edit>

                </li>
              }
            )}
          </ul>
        </div>) : ('') }
      </div>

    )
  }
}
ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)
