import React from 'react';
import './App.css';



class BlogComponent extends React.Component {
  constructor(props) {
        super(props);
    }


  render() {



    return(
      <div className="flex book-content" key={this.props.data._id}>
        <div>{this.props.data.magazine}</div>
        <div>{this.props.data['schema:author']}</div>
        <div>{this.props.data['schema:headline']}</div>
          <div>{this.props.data['schema:articleBody']}</div>
      </div>
    )
    }

}

export default BlogComponent;
