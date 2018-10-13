import React from 'react';
import './App.css';


import NewComponent from "./newsComponents/NewComponent.js";
import AnalysisComponent from "./newsComponents/AnalysisComponent.js";


import cnn from "./images/cnn3.svg";
import aljazeera from "./images/aljazeera3.svg";
import tnytimes from "./images/tnytimes3.svg";
import magazine from "./images/magazine.svg";

import Chip from '@material-ui/core/Chip';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListIcon from '@material-ui/icons/List';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import RecentActors from '@material-ui/icons/RecentActors';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: '33.33%',
    flexShrink: 0,
    fontWeight: 'bold',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(20),
    color: theme.palette.text.secondary,
  },
});

class NewsComponent extends React.Component {
  constructor(props) {
        super(props);
    }

  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
      value: 0
    });
  };

  menuChange = (event, value) => {
     this.setState({ value });
     console.log(this.state.value);
   };


  render() {


    const { classes } = this.props;
    const { expanded } = this.state;
    const { value } = this.state;

    const itemPulsado = this.state.value;
    let itemGeneral = null;

    if (itemPulsado === 0) {
      itemGeneral = <NewComponent data={this.props.data}/>;
    } else if (itemPulsado === 1){
      itemGeneral = <AnalysisComponent data={this.props.data.entities}/>;
    }

    console.log(this.props.data.sentiments);

    const source = this.props.data['schema:author'];
    let clase = "";
    let image = null;

    if (source === "Al Jazeera") {
      image = <img className="image-prueba" src={aljazeera} alt="Al Jazeera" />;
    } else if (source === "The New York Times"){
      image = <img className="image-prueba" src={tnytimes} alt="The New York Times"  />;
    }else if (source === "cnn"){
      image = <img className="image-prueba" src={cnn} alt="CNN"/>;
    }else {
      image = <img className="image-prueba" src={magazine} alt="Magazine"/>;
    }

    const organizations = this.props.data.entities.filter(entitie => entitie['@type'] === "schema:Organization");

    return(



        <div className={classes.root}>
          <ExpansionPanel expanded={expanded === this.props.data._id} onChange={this.handleChange(this.props.data._id)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div className="col-xs-12 col-lg-12">
                <div className="col-xs-2 col-lg-2 image-new">
                  {image}
                </div>
                <div className="col-xs-8 col-lg-8">
                  <Typography className="titular">{this.props.data["schema:headline"]}</Typography>
                  <div></div>
                  {organizations.map(function(entitie, index){
                      return   <Chip label={entitie['schema:name']} className="news-chip" href="https://www.marca.com" clickable />;
                    })}
                </div>

                <Typography className="col-md-2">{this.props.data["schema:author"]}</Typography>
              </div>


            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div className="noticias">
                  <BottomNavigation
                    value={value}
                    onChange={this.menuChange}
                    showLabels
                    className="noticias"
                  >
                    <BottomNavigationAction label="Report" icon={<ListIcon />} />
                    <BottomNavigationAction label="Analysis" icon={<FavoriteIcon />} />
                  </BottomNavigation>
                  {itemGeneral}
                </div>



            </ExpansionPanelDetails>
          </ExpansionPanel>
      </div>


    )
    }

}
NewsComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewsComponent);
