import React from 'react';
import './../App.css';



class NewComponent extends React.Component {
  constructor(props) {
        super(props);
    }


  render() {



    return(
      <div key={this.props.data._id} className="new">
        <img src={this.props.data['schema:thumbnailUrl']} className="col-xs-12 col-md-6"></img>
        <div className="headline col-xs-12 col-md-6"><strong>{this.props.data['schema:headline']}</strong></div>

        <div className="text-new col-xs-12 col-md-12">{this.props.data['schema:articleBody']}</div>

      </div>
    )
    }

}

export default NewComponent;
