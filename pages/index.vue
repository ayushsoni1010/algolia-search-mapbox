<template>
  <div>
    <AlgoliaSearch />
    <MapBox />
  </div>
</template>

<script lang="js">
// import algoliasearch from "algoliasearch";
// import algoliasearchHelper from "algoliasearch-helper";
import MapBox from "../components/Mapbox.vue";
import AlgoliaSearch from "../components/AlgoliaSearch.vue";

export default {
  name:'IndexPage',
  components: {
    MapBox,
    AlgoliaSearch,
  },
};
</script>

<style>
body {
  font-family: sans-serif;
  padding: 1em;
}
</style>
