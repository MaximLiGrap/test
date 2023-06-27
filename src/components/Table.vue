<template>
  <div class="table">
    <div class="table__btn">
      <button :class="activeBtn == btn.id ? 'active' : ''" v-for="btn in btns" :key="btn.id" @click="changaActive(btn)">{{ btn.title }}</button>
      <button @click="reset">Сброс</button>
    </div>
    <ag-grid-vue
    style="width: 100%; height: 917px"
    class="ag-theme-alpine"
    @rowClicked="selectedRoute"
    :allowContextMenuWithControlKey="true"
    :getContextMenuItems="activeBtn == 1 ? getContextMenuItems: ''"
    :columnDefs="activeBtn == 1 ? routTitle : stopsTitle"
    :rowData="activeBtn == 1 ? setRoutTable : setStopsTable"
  >
  </ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import 'ag-grid-enterprise';

export default {
  props: {
    points: Array,
    showStops: Boolean,
    selectedRouteId: Number,
    selectedStop: Number
  },
  name: "TableGrid",
  components: {
    AgGridVue,
  },
  data() {
    return {
      routTitle: [
        { field: 'make', headerName: 'Имя'  },
        { field: 'model', headerName: 'Кол-во остановок'  },
        ],
      stopsTitle: [
        { field: 'make', headerName: 'Имя'  },
        { field: 'model', headerName: 'Кол-во Маршрутов'  },
        { field: 'forward', headerName: 'Направление '  },
        ],
      columnDefs: null,
      rowData: null,
      activeBtn: 1,
      defaultColDef: {
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
      },
      btns:[{
        title: "Маршруты", id: 1, show: true
      },
      {
        title: "Остановки", id: 2, show: false
      },
    ]
    };
  },
  computed: {
    showPoints() {
      return this.selectedRouteId ? this.points.filter((item) => item.selectedRoute) : this.points
    },
    setRoutTable() {
      return this.showPoints.map((item) => {
      item.make = item?.Name;
      item.model= item?.Stops?.length
      return item
    })
    },
    setStopsTable() {
      let arr = []
      this.showPoints.map((item) => {
        this.selectedStop ? 

      item?.Stops?.filter((element) => element.selectedStop).forEach((el) => {
        el.make=el.Name;
        el.model = this.forvard(el)
        el.forward = el.Forward ? 'Пряпой' : 'Обратный'
        arr.push(el)
      }) : 
      item?.Stops?.forEach((el) => {
        el.make=el.Name;
        el.model = this.forvard(el)
        el.forward = el.Forward ? 'Пряпой' : 'Обратный'
        arr.push(el)
      })
    })
    return arr
    },
  },
  
  methods: {
    forvard(stop) {
      let make = 1
      this.points.forEach((item) => {
        item.Stops.forEach((el) => {
          if(el.Lap == stop.Lat && el.Lon == stop.Lon) {
            make++
          }
        })
      })
      return make
    },
    getContextMenuItems(params) {
      var result = [
        {
          // custom item
          name: 'Подробнее',
          action: () => {
            if(params?.node?.data) {
              this.$store.commit('updateRoute', params.node.data);
            this.$router.push({ name: 'rout', params: { id: params.node.data.ID } })
            }
          },
        },
      ];
      return result;
    },
    selectedRoute(params) {
    if(params.data.Lat && params.data.Lon) {
      params.data.selectedStop = true
      this.$emit("update:selectedStop", params?.data?.ID)
    } else {
      params.data.selectedRoute = true;
      this.$emit("update:selectedRouteId", params?.data?.ID)
    }
  },
    reset() {
      this.points.forEach((item) => {
        item.selectedRoute = false
        item.Stops.forEach((el) => {
          el.selectedStop = false
        })
      })
      this.$emit("update:selectedStop", null)
      this.$emit("update:selectedRouteId", null)
    },
    changaActive(btn) {
      this.$emit("update:showStops", btn.show)
      this.activeBtn = btn.id
    },
  },
  beforeMount() {
    this.columnDefs = this.routTitle
    this.rowData = this.setRoutTable
  },
  
};
</script>

<style lang="scss">
 @import "~ag-grid-community/styles/ag-grid.css";
 @import "~ag-grid-community/styles/ag-theme-alpine.css";
</style>
<style lang="scss">
.active {
  background-color: red;
}

.table {
  height: 100%;
  width: 25%;
  padding-top: 10px;

  &__btn {
    padding: 5px;
    display: flex;
    gap: 5px;
  }
}
</style>