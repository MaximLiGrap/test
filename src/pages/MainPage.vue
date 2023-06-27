<template>
  <div v-if="mounted" class="main">
    <Table :showStops.sync="showStops" :points="points" :selectedRouteId.sync="selectedRouteId" :selectedStop.sync="selectedStop"/>
    <Map :showStops="showStops" :points="points" :selectedRouteId.sync="selectedRouteId" :selectedStop.sync="selectedStop"/>
  </div>
  <appLoader v-else/>
</template>

<script>
import appLoader from '@/components/app-loader.vue'
import Map from '@/components/Map.vue'
import Table from '@/components/Table.vue'

export default {
  name: 'MainPage',
  components: {
    Map,
    Table,
    appLoader
  },
  data() {
    return {
      mounted: false,
      points: null,
      showStops: true,
      selectedRouteId: null,
      selectedStop: null,
    }
  },
  methods: {
    async getPoints() {
        await this.axios
          .get("https://220.transflow.ru/api/public/v1/routes_data?key=012345678abc")
          .then((response) => {
            this.mounted=true
            this.points = response.data
          })
          .catch((e) => {
            console.log(e)
          })
          .finally(() => {
          });
    },
  },
  created() {
    this.getPoints();
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.main {
  height: 100vh;
  justify-content: space-between;
  display: flex;
}
</style>