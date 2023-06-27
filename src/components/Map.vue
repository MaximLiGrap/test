<template>
  <div style="width: 100%;height: 100%;">
    <l-map ref="map" v-if="mounted" style="width: 100%;height: 100%;" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-layer-group v-for="(route, index) in setRout" :key="route.ID">
    <l-polyline v-if="showStops"  ref="track" @click="selectedRoute(index, route)"
    :lat-lngs="getPolyline(route.Points)"
    @mouseover="setTool(index, route?.Name)"
    >
  </l-polyline>
  <l-marker ref="point" :data="point.ID" @click="selectPoint(point)" v-for="(point, index) in setPoint(route?.Stops)"
      :key="point?.Lat + point?.Lon + index"
      :latLng="[ point?.Lat, point?.Lon ]"
       >
       <l-icon
        :iconUrl=" point?.Forward ? 
           require(`@/assets/marker.svg`) : require(`@/assets/red-marker.svg`)
        "
        :iconSize="[32, 32]"
        :iconAnchor="[16, 16]"
        :popupAnchor="[0, -26]"
      >
      </l-icon>
      <l-tooltip>{{point?.Name}}</l-tooltip>
    </l-marker>
</l-layer-group>
<l-marker v-if="selectPoint"
      :latLng="[ selectPoint?.Lat, selectPoint?.Lon ]"
       >
       <l-icon
        :iconUrl=" selectPoint?.Forward ? 
           require(`@/assets/marker.svg`) : require(`@/assets/red-marker.svg`)
        "
        :iconSize="[32, 32]"
        :iconAnchor="[16, 16]"
        :popupAnchor="[0, -26]"
      >
      </l-icon>
      <l-tooltip>{{selectPoint?.Name}}</l-tooltip>
    </l-marker>
  </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon, LPolyline, LLayerGroup, LTooltip } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
export default {
  props: {
    points: Array,
    selectPoint: Object,
    showStops: Boolean,
    selectedRouteId: Number,
    selectedStop: Number
  },
  data () {
    return {
      mounted: false,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 10,
      track: null,
      stop: null,
      map: null,
      center: [60.06667751060329, 30.333370726326077],
    };
  },
  computed: {
    setRout() {
      return this.selectedRouteId ? this.points.filter((item) => item.selectedRoute) : this.points
    },
  },
  methods: {
    setPoint(route) {
     return this.selectedStop ? route.filter((item) => item.selectedStop) : route
    },
    getPolyline(router) {
    return router?.map((item) => {
      let arr =[];
      arr.push(item.Lat)
      arr.push(item.Lon)
      return arr
    })
  },
  selectedRoute(index, route) {
    route.selectedRoute = true;
    this.$emit("update:selectedRouteId", route.ID)
    this.map = this.$refs.map.mapObject;
    this.track = this.$refs.track[index].mapObject;
    this.map.fitBounds(this.track.getBounds());
  },
  selectedRouteinTable() {
    let index = this.points.findIndex((el)=> el.ID == this.selectedRouteId)
    this.map = this.$refs.map.mapObject;
    this.track = this.$refs.track[index].mapObject;
    this.map.fitBounds(this.track.getBounds());
  },
  selectedPointinTable() {
    this.map = this.$refs.map.mapObject;
    this.stop = this.$refs.point.find((elem) => elem.$attrs.data == this.selectedStop).mapObject;
    var latLngs = [ this.stop.getLatLng() ];
    this.map.fitBounds(latLngs);
  },
  setTool(index, name) {
    this.track = this.$refs.track[index].mapObject;
    this.track.bindTooltip(name)
  },
  getPoint(point) {
    let arr =[];
      arr.push(point.Lat)
      arr.push(point.Lon)
      return arr
  },
  },
  components: {LMap, LTileLayer, LMarker, LIcon, LPolyline, LLayerGroup, LTooltip},
  name: 'LeafletMap',
  mounted() {
    this.mounted = true;
  },
  watch: {
    selectedRouteId() {
      if(this.selectedRouteId) {
        this.selectedRouteinTable()
      }
    },
    selectedStop() {
      if(this.selectedStop) {
        this.selectedPointinTable()
      }
    }
  }
}
</script>





  
