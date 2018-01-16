class ListItem extends React.Component{
  constructor(props){
   super(props)
  }
  
  render(){
    return(
      <li>
        <span>{this.props.text}</span>
        <button onClick={(event) => this.props.removeItem(event.target.value, this.props.index)}>
          <i className='fa fa-check'></i>
        </button>
      </li>
    )
  }
}

const List = (props) => {
  return(
    <ul>
      {props.data.map((text, i) => <ListItem removeItem={props.removeItem} index={i} key={i} text={text} />)}
    </ul>
  )
}

class Form extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      itemText: ''
    }
  }
  
  render(){
    return(
      <form onSubmit={this.props.addItem}>
        <input
          onChange={(event) => this.props.updateItem(event.target.value)}
          type='text' 
          placeholder='Works is coming'>
        </input>
        <button type="submit"><i className='fa fa-plus'></i></button>
      </form>
    )
  }
}

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      item: '',
      listItems: ['Landing page', 'Component remake'],
      completedItems: []
    }
    this.addItem = this.addItem.bind(this)
    this.updateItem = this.updateItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }
  
  updateItem(text){
    this.setState({item: text})
  }
  
  addItem(e){
    e.preventDefault()
    this.setState({listItems: this.state.listItems.concat(this.state.item)})
  }
  
  removeItem(e, item){
    var listItems = this.state.listItems
    listItems.splice(item, 1)
    this.setState({
      listItems: listItems,
      completedItems: this.state.completedItems.concat(this.state.listItems[item])
    })
    console.log(this.state.listItems)
  }
  
  render(){
    return(
      <div className='container'>
        <h1>Todo List</h1>
        <Form addItem={this.addItem} updateItem={this.updateItem}/>
        <List data={this.state.listItems} removeItem={this.removeItem}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, root)