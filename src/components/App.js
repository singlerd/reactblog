import React, { Component } from 'react';
import {database} from '../firebase';
import _ from 'lodash';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import renderHTML from 'react-render-html';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      body: '',
      posts: {}
    };
    //bind
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
 
  };

  //lifecycle
  componentDidMount(){
    database.on('value', snapshot => {
      this.setState({
        posts: snapshot.val()
      })

    });
  }

    // render posts from firebase
    renderPosts(){
      return _.map(this.state.posts, (post, key)=> {
        return (
                  <div key={key}>
                    <h2>{post.title}</h2>
                    <p>{renderHTML(post.body)}</p>
                  </div>
                )
      });
    }
    

  onHandleChange(e){
   this.setState({body: e});
   console.log(this.state.body)
  }

  onHandleSubmit(e){
    e.preventDefault();
    const post = {
      title: this.state.title,
      body: this.state.body
    };
    database.push(post);
    this.setState({
      title: '',
      body: ''
    });
  }

  render() {
    return (
      <div className="container">
      <form onSubmit={this.onHandleSubmit}>
        <div className="form-group">
          <input value={this.state.title} className="form-control" type="text" name="title" placeholder="Title" onChange={(e) =>{this.setState({title: e.target.value})}} ref="title" />
        </div>
        <div className="form-group">
          <ReactQuill modules={App.modules} formats={App.formats} value={this.state.body} placeholder="Body" onChange={this.onHandleChange} /> 
        </div>
        <button className="btn btn-primary">Post</button>
      </form>
      <br />

      {this.renderPosts()}


     
      </div>
    );
  }
}

App.modules = {
  toolbar: [ 
    [{ header: '1'}, { header: '2'}, { font:[] }], 
    [{size:[]}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['link','image','video'],
    ['clean'],
    ['code-block']
  ]
};

App.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet',
  'link', 'image', 'video', 'code-block'
]

export default App;
