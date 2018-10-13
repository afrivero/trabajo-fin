import React from 'react';
import './../App.css';
import GoogleMapReact from 'google-map-react';

import Chip from '@material-ui/core/Chip';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';


class AnalysisComponent extends React.Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 0
  };


  render() {

    const organizations = this.props.data.filter(entitie => entitie['@type'] === "schema:Organization");
    const places = this.props.data.filter(entitie => entitie['@type'] === "schema:Place");
    const people = this.props.data.filter(entitie => entitie['@type'] === "schema:Person");


    return(
      <div key={this.props.data._id}>
        <div className="col-md-6 col-xs-6">
          <div key={this.props.data._id} className="people">
            <div className="people-root">
              <GridList cellHeight={180} className="people-gridlist">
                {people.map(person => (
                  <GridListTile key={person['schema:name']} className="people-text">
                    <img src={person["schema:image"]} alt={person['schema:name']} />
                    <GridListTileBar className="people-text"
                      title={<p className="people-text">{person['schema:name']}</p>}
                      subtitle={<a href={person["@id"]} className="people-text">Learn more</a>}
                      actionIcon={
                        <IconButton className="people-icon">
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
          </div>

          </div>
        </div>
        <div className="col-md-6 col-xs-6">
          <div style={{ height: '450px', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyCfk9hXv1fWt6DS0kgJXs7Ny0RuD772E0g' }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
            >

              {places.map(function(entitie, index){
                  return <Chip
                    lat={entitie['schema:geo']['schema:latitude']}
                    lng={entitie['schema:geo']['schema:longitude']}
                    label={entitie['schema:name']}
                    href={entitie['@id']}
                  />;
                })}


            </GoogleMapReact>
          </div>
        </div>

      </div>
    )
    }

}

export default AnalysisComponent;
