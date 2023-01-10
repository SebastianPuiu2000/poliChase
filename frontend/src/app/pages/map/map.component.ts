import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { setDefaultOptions, loadModules } from 'esri-loader';
import esri = __esri;
import { WebsocketConnection } from "../../shared/websocket-connection";

@Component({
  selector: "app-esri-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit, OnDestroy {
  @Output() mapLoadedEvent = new EventEmitter<boolean>();

  // The <div> where we will place the map
  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;

  // register Dojo AMD dependencies
  _Map;
  _MapView;
  _FeatureLayer;
  _Graphic;
  _GraphicsLayer;
  _Route;
  _RouteParameters;
  _FeatureSet;
  _Point;
  _Locator;

  // Instances
  map: esri.Map;
  view: esri.MapView;
  pointGraphic: esri.Graphic;
  graphicsLayer: esri.GraphicsLayer;

  // Attributes
  zoom = 15;
  center: Array<number> = [26.049249, 44.439862];
  basemap = "streets-vector";
  loaded = false;
  interval = null;

  constructor() { }

  async initializeMap() {
    try {
      // configure esri-loader to use version x from the ArcGIS CDN
      // setDefaultOptions({ version: '3.3.0', css: true });
      setDefaultOptions({ css: true });

      // Load the modules for the ArcGIS API for JavaScript
      const [esriConfig,
        Map,
        MapView,
        FeatureLayer,
        Graphic,
        Point,
        GraphicsLayer,
        route,
        locator,
        RouteParameters,
        FeatureSet,
        Locate
      ] = await loadModules([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/Graphic",
        "esri/geometry/Point",
        "esri/layers/GraphicsLayer",
        "esri/rest/route",
        "esri/rest/locator",
        "esri/rest/support/RouteParameters",
        "esri/rest/support/FeatureSet",
        "esri/widgets/Locate"
      ]);

      esriConfig.apiKey = "AAPK46bb416835724250a82b5955f095e09blM-sJFMyEUHbmgp2WHVfrYIwY3LK7vKyx8JPanN_2lsCUSdlHwUUsRMLsSF-KZN7";

      this._Map = Map;
      this._MapView = MapView;
      this._FeatureLayer = FeatureLayer;
      this._Graphic = Graphic;
      this._GraphicsLayer = GraphicsLayer;
      this._Route = route;
      this._RouteParameters = RouteParameters;
      this._Locator = locator;
      this._FeatureSet = FeatureSet;
      this._Point = Point;

      // Configure the Map
      const mapProperties = {
        basemap: this.basemap
      };

      this.map = new Map(mapProperties);

      // Initialize the MapView
      const mapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this.center,
        zoom: this.zoom,
        map: this.map
      };

      this.view = new MapView(mapViewProperties);

      await this.view.when(); // wait for map to load
      console.log("ArcGIS map loaded");

      const locate = new Locate({
        view: this.view,
        useHeadingEnabled: false,
        goToOverride: function(view, options) {
          options.target.scale = 1500;
          return view.goTo(options.target);
        }
      });
      this.view.ui.add(locate, "top-left");

      return this.view;
    } catch (error) {
      console.log("EsriLoader: ", error);
    }
  }

  ngOnInit() {
    // Initialize MapView and return an instance of MapView
    this.initializeMap().then(async () => {
      // The map has been initialized
      console.log("mapView ready: ", this.view.ready);
      this.loaded = this.view.ready;
      this.mapLoadedEvent.emit(true);

      this.graphicsLayer = new this._GraphicsLayer();
      this.map.add(this.graphicsLayer);

      // this is for user to give location permissions
      await new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(() => resolve(null))
      })

      // send location to backend
      this.interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(res => {
          WebsocketConnection.sendLocation(res.coords.latitude, res.coords.longitude);
        });
      }, 500);

      // update map with active players
      WebsocketConnection.setActivePlayersHandler(players => {
        this.graphicsLayer.removeAll();

        players.forEach(player => {
          const point = {
            type: "point",
            longitude: player.lon,
            latitude: player.lat
          };

          const simpleMarkerSymbol = {
            type: "simple-marker",
            color: [0, 255, 0],  // Orange
            outline: {
              color: [255, 255, 255], // White
              width: 1
            }
          };

          this.pointGraphic = new this._Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol
          });

          this.graphicsLayer.add(this.pointGraphic);
        });
      })
    });
  }

  ngOnDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
      if (this.interval) {
        clearInterval(this.interval);
      }
    }
  }
}
