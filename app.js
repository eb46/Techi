class App extends React.Component {
  state = {
    replies: [],
  }

  deletePost = (event) => {
    event.preventDefault();
    axios.delete('/reply/' + event.target.value).then(
      (response) => {
        this.setState(
          {
            replies: response.data
          }
        )
      }
    )
  }

  editName = (event) => {
    this.setState({
      updateName: event.target.value
    })
  }

  editReply = (event) => {
    this.setState({
      updateReply: event.target.value
    })
  }

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
}
ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)
