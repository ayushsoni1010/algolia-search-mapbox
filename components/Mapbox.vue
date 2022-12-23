<template>
  <div class="py-8 pl-8">
    <div
      id="map"
      class="h-96 rounded-xl overflow-hidden transform w-96"
    ></div>
  </div>
</template>
<script lang="js">
// import { ref } from 'vue'
import Mapboxgl from 'mapbox-gl'
import peopleData from "../data/dataSource.json"
// import { mapState } from "vuex"

export default {
  name: 'MapBox',
  data() {
    return {
      map: null,
      markers: [],
      peopleData
    }
  },
  // computed: {
  //   ...mapState(["currentFeatures"]),
  // },
  // watch: {
  //   currentFeatures: {
  //     handler() {
  //       if (this.currentFeatures) {
  //         this.resetMarkers();
  //         this.updateMarkers()
  //         // eslint-disable-next-line no-console
  //         console.log(this.currentFeatures, 1010)
  //       }
  //     }
  //   }
  // },
  mounted() {
    this.initMapbox()
  },
  methods: {
    initMapbox() {
      Mapboxgl.accessToken =
        'pk.eyJ1IjoiYXl1c2hzb25pMTAxMCIsImEiOiJjbGJ6NXhndGEwOGYyM3VxcTlmNnFqeGJhIn0.DUgGqv3iikERePPs1GGz4A'
      this.map = new Mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [78.723631, 22.479781],
        zoom: 5,
        scrollToZoom: true,
      })
      this.map.on('load', () => {
        this.map.addControl(
          new Mapboxgl.NavigationControl({ showCompass: false }),
          'bottom-left',
        )
        this.map.addControl(
          new Mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
          }),
          'bottom-left',
        )
        this.map.addControl(
          new Mapboxgl.ScaleControl({
            maxWidth: 100,
            unit: 'metric',
          })
        )
        this.map.addControl(new Mapboxgl.FullscreenControl(), 'top-right')

        // if (this.markers.length > 0) {
        //   this.resetMarkers()
        // }
        // if (this.currentFeatures) {
        //   this.updateMarkers();
        // }
      })
    },
    resetMarkers() {
      this.markers.forEach((marker) => {
        marker.remove()
      })
      this.markers = []
    },
    updateMarkers() {
      this.markers = this.peopleData.map((item) => {
        const el = document.createElement('div')
        el.className = 'marker'

        // create the popup
        const popup = this.peoplePopup(item)
        return new Mapboxgl.Marker(el)
          .setLngLat([item.longitude, item.latitude])
          .setPopup(popup)
          .addTo(this.map)
      })
    },
    peoplePopup(item) {
      return new Mapboxgl.Popup({ offset: 10, maxWidth: '200px' })
        .setHTML(`    <div
      class="w-full h-auto rounded-xl overflow-hidden aspect-w-16 aspect-h-8 shadow-md bg-red-700"
    >
      <img
        :src=${item.image_url}
        :alt=${item.name}
        class="object-cover w-full h-full opacity-0 transition-opacity"
      />
    </div>

    <div class="text-sm font-medium mt-4">${item.name}</div>
    <div class="text-xs text-gray-400 mt-2">
      ${item.address}, ${item.city}
    </div>`)
    },
  },
}
</script>
<style scoped>
.map-container {
  position: relative;
  width: 80%;
  height: 75vh;
}

#map {
  width: 80%;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}

.marker:before {
  content: '';
  cursor: pointer;
  position: absolute;
  width: 25px;
  height: 25px;
  border: 1px solid #ccc;
  border-radius: 75% 45% 75% 0%;
  background: #3498db;
  bottom: 0;
  transform-origin: 0% 100%;
  transform: rotate(-45deg) scale(1);
}
</style>
