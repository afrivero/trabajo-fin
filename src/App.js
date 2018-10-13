import React, { Component } from 'react';
import './App.css';

import { ReactiveBase, SingleList, TagCloud, MultiList, MultiDropdownList, ResultCard, ToggleButton, SelectedFilters, ReactiveList, DateRange, DataController } from '@appbaseio/reactivesearch';

import ArticleComponent from "./ArticleComponent.js";
import BlogComponent from "./BlogComponent.js";
import NewsComponent from "./NewsComponent.js";
import MapaComponent from "./MapaComponent.js";


import { ReactiveMap } from '@appbaseio/reactivemaps';

import GoogleMapReact from 'google-map-react';

import Chip from '@material-ui/core/Chip';

class App extends Component {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 0
  };

  constructor(props){
      super(props);
      this.resultCard = this.resultCard.bind(this);
      this.prueba = this.prueba.bind(this);
      this.state = {
        itemPulsado: 'schema:NewsArticle',
        markers: []
      };
    }



  prueba(value){
    if(value.length > 0 ){
      //console.log(value);
      this.setState({itemPulsado:value[0].value});
    }

  }

  resultCard(data) {
    //console.log(data);

    const locations = data.entities.filter(entitie => entitie['@type'] === "schema:Place");
    if(locations.length > 0){
      for(var i = 0; i<locations.length; i++){
        this.state.markers.push(locations[i]);

      }
    }

    //console.log(this.state.markers);

    const itemSelected = this.state.itemPulsado;
    let resultItem = null;
    if(itemSelected === 'schema:Article'){
      resultItem = <ArticleComponent data={data}/>;
    }else if (itemSelected === 'schema:BlogPosting'){
      resultItem = <BlogComponent data={data}/>;
    }else if(itemSelected === 'schema:NewsArticle'){
      resultItem = <NewsComponent data={data}/>;
    }
		return (
      <div>{resultItem}</div>


		);
	}


  render() {
    return (
      <div className="App">
        <section className="container-fluid">

        <ReactiveBase
          app="gsicrawler"
          url="http://sefarad-elasticsearch.cluster.gsi.dit.upm.es/"
          mapKey="AIzaSyCfk9hXv1fWt6DS0kgJXs7Ny0RuD772E0g"
        >


          <ToggleButton
            componentId="General"
            dataField="@type.keyword"
            data={
              [{"label": "Articulos",   "value": "schema:Article"},
               {"label": "Blog-Posting",   "value": "schema:BlogPosting"},
               {"label": "NewsArticle", "value": "schema:NewsArticle"}]
            }
            title="Apartados"
            multiSelect={false}
            showFilter={true}
            URLParams={false}
            onValueChange={(value) => this.prueba(value)}

            />

          <div className="col-xs-12 col-md-4 components-news">
            <div className="header">
              Organizations/Locations
            </div>
            <SingleList
              componentId="headlineSensor"
              dataField="entities.schema:name.keyword"
              react={{
                and: ["headlineSensor", "typeSensor", "typeSensor2", "TagCloud", "General", "DateSensor", "BookSensor"],
              }}
            />
            <div className="header">
              Headlines
            </div>
            <MultiDropdownList
              componentId="typeSensor"
              dataField="schema:headline.keyword"
              react={{
                and: ["headlineSensor", "typeSensor", "typeSensor2", "TagCloud", "General", "DateSensor", "BookSensor"],
              }}
            />
          <div className="header">
              <p className="title-header">Newspaper</p>
            </div>

            <TagCloud
              componentId="TagCloud"
              dataField="schema:author.keyword"
              react={{
                and: ["headlineSensor", "typeSensor", "typeSensor2", "TagCloud", "General", "DateSensor", "BookSensor"],
              }}
            />
            <div className="header">
              Date filter
            </div>

            <DateRange
              componentId="DateSensor"
              dataField="schema:datePublished.keyword"
              queryFormat="date_time_no_millis"
              react={{
                and: ["headlineSensor", "typeSensor", "typeSensor2", "TagCloud", "General", "DateSensor", "BookSensor"],
              }}
            />

            <DataController
    							title="DataController"
    							componentId="BookSensor"
                  customQuery={
                    function(value, props) {
                      return {
                        match: {
                          '@type': "schema:NewsArticle"
                        }
                      }
                    }
                  }
    							size={20}
    						>
    						<div></div>
    				</DataController>


              <MapaComponent data={this.state.markers} />
          </div>




        <div className="col-md-8 col-xs-12">
            <SelectedFilters />
              <div className="components-news">
                <div className="header">
                  News
                </div>
    						<ReactiveList
    							componentId="results"
    							dataField="original_title.raw"
    							className="result-list-container"
    							size={12}
    							onData={this.resultCard}
    							pagination
    							URLParams
    							react={{
    								and: ["headlineSensor", "typeSensor", "typeSensor2", "TagCloud", "General", "DateSensor", "BookSensor"],
    							}}
    						/>
            </div>
        </div>



        </ReactiveBase>
      </section>



      </div>
    );
  }
}

export default App;
