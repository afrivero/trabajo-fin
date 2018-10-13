import React from 'react';
import './App.css';
import GoogleMapReact from 'google-map-react';

import Chip from '@material-ui/core/Chip';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

class MapaComponent extends React.Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 0
  };


  render() {

    //console.log(this.props.data);


    return(
      <div style={{ height: '500px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCfk9hXv1fWt6DS0kgJXs7Ny0RuD772E0g' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >

          {this.props.data.map( (entitie, index) => {
              console.log(entitie);
              console.log(index);
              return <Chip
                lat={entitie['schema:geo']['schema:latitude']}
                lng={entitie['schema:geo']['schema:longitude']}
                label={entitie['schema:name']}
              />;
            })}


        </GoogleMapReact>
      </div>
    )
    }

}

export default MapaComponent;
