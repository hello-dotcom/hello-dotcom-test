import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {Component} from 'react';
import {FormGroup,FormLabel,FormControl, Form } from 'react-bootstrap'


class App extends Component
{
  constructor(props)
  {
    super(props);
    this.state={
      name:'',
      location:'',
      api:false,
      api_result:[],
      add:false,
    }
  }
  
  componentDidMount()
  {
    fetch(`https://jsonplaceholder.typicode.com/posts`,
        {
          method:'get',
          'Content-Type': 'application/json'
        })
        .then(res => res.json())
        .then(data=>{
            this.setState({
            ...this.state,
            api_result:data
          })
        })
        .catch(err=>console.log(err));
  }
  handleChange= (event)=>
  {
    this.setState({
      ...this.state,
      [event.target.name]:event.target.value
    })
  }
  checked=(evnet)=>
  {
    this.setState({
      ...this.state,
      api:!this.state.api,
    })
  }
  add = () =>
  {
    this.setState({
      ...this.state,
      add:true,
    })
  }
  displayOff= () =>
  {
    this.setState({
      ...this.state,
      add:false,
    })
  }
  
  render()
  {
    return (
      <div className="container">
        <div className="m-5 p-5 border border-2 bg-secondary ">
            <FormGroup className="form-inline">
                  <FormLabel className="text-white">Name</FormLabel>
                  <FormControl
                    type="text"
                    name="name"
                    placeholder="Name"
                   onChange={this.handleChange}
                    value={this.state.name}
                    className="input ml-5"
                    
                  />
                </FormGroup>
                <FormGroup className="form-inline">
                  <FormLabel className="text-white">Location</FormLabel>
                  <Form.Control
                    as="select"
                    name="location"
                    value={this.state.location}
                   onChange={this.handleChange}
                    placeholder="PlanName"
                    className="input ml-4"
                    custom
                   
                  >
                    <option value="RGUKT_Basar">RGUKT Basar</option>
                    <option value="RGUKT_Rkv">RGUKT Rkv </option>
                    <option value="RGUKT_Nz">RGUKT Nz</option>
                  </Form.Control>
                </FormGroup>
                <FormGroup className="form-inline">
                  <FormLabel className="text-white">Should I show the results of API Call</FormLabel>
                  <FormControl
                    type="checkbox"
                    name="api"
                    placeholder="PlanStart"
                    onChange={this.checked}
                    value={this.state.api}
                    className="input ml-5"
                  >
                  </FormControl>
                </FormGroup>
                <div className="text-center">
                  <button className="btn btn-primary border border-3 mr-2" onClick={()=>this.add()}>submit</button>
                  <button className="btn btn-primary border border-3" onClick={()=>this.displayOff()}>display off</button>
                  
                </div>
        </div>
        <div className="text-center">
            {this.state.add?<div>{this.state.name}:{this.state.location}</div>:<h1></h1>}

        </div>
        <div className="mt-4">
          {this.state.api?this.state.api_result.map(
            (item)=>{
              return (
                <div key={item.id} className="p-3 m-2 border border-2 text-white bg-secondary">
                  <h1>{item.id}</h1>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
              )
            }
          ):<h1></h1>}
          
        </div>
      </div>
    )
  }
}

export default App;
