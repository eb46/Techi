class App extends React.Component {
  state = {
    replies: [],
  }

  // CREATE
  createReply = (event) => {
    axios.post(
      '/reply',
      {
        name: this.state.newName,
        reply: this.state.newReply
      }
    ).then(
      (response) => {
        this.setState({
          replies: response.data
        })
      }
    )
  }

  changeNewName = (event) => {
    this.setState({
      newName: event.target.value
    })
  }

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

//edit name
  editName = (event) => {
    this.setState({
      updateName: event.target.value
    })
  }

//edit reply
  editReply = (event) => {
    this.setState({
      updateReply: event.target.value
    })
  }

//EDIT
  updateReply = (event) => {
    event.preventDefault();
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

  render = () => {
    return (<div>
      <h1>working!</h1>
      </div>

    )
  }
ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)
