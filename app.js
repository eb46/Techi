class App extends React.Component {
  state = {
    replies: []
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

  render = () => {
    return (<div>
      <h1>working!</h1>
      </div>

    )
  }
}
ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)
