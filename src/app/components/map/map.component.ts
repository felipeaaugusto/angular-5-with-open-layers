import { Component, OnInit } from '@angular/core';

import OlMap from 'ol/map';
import OlOSM from 'ol/source/osm';
import OlTileLayer from 'ol/layer/tile';
import OlView from 'ol/view';
import OlProj from 'ol/proj';
import OlInteractionTile from 'ol/interaction/draw'
import OlSourceVector from 'ol/source/vector'
import OlLayerVector from 'ol/layer/vector'

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    map: OlMap;
    raster: OlTileLayer;
    view: OlView;
    draw: OlInteractionTile;
    source: OlSourceVector;
    vector: OlLayerVector;

    constructor() {}
    
    ngOnInit() {
        this.raster = new OlTileLayer({
          source: new OlOSM()
        });
        
        this.source = new OlSourceVector({wrapX: false});

        this.vector = new OlLayerVector({
            source: this.source
        });

        this.view = new OlView({
            center: OlProj.fromLonLat([6.661594, 50.433237]),
            zoom: 3,
            minResolution: 150,
            maxResolution: 20000,
            rotation: 0
        });

        this.map = new OlMap({
            target: 'map',
            layers: [this.raster, this.vector],
            view: this.view
        });

        this.addInteraction();
    }

    addInteraction(){
        this.draw = new OlInteractionTile({
            source: this.source,
            type: 'Polygon'
        });
        this.map.addInteraction(this.draw);
    };
}
