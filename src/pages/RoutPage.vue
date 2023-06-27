<template>
  <div class="rout__page">
    <div>
      <button @click="goBack">Назад</button>
      <div>Маршрут -- {{ rout.Name }}</div>
      <div>Кол-во остановок в прямом направлении -- {{ routForvard ? routForvard?.length : '' }}</div>
      <div>Кол-во остановок в обратном направлении --{{ routForvardOut ? routForvardOut?.length : '' }}</div>
    </div>
    <div>
      <ul style="color: blue;">
        <li v-for="item of routForvard" :key="item.ID">{{ item.Name }}</li>
      </ul>
      <ul style="color: red;">
        <li v-for="item of routForvardOut" :key="item.ID">{{ item.Name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      id: null,
    };
  },
  computed: {
    ...mapState({
      rout: (state) => state.rout,
    }),
    routForvard() {
      return this.rout?.Stops.filter((item) => item.Forward)
    },
    routForvardOut() {
      return this.rout?.Stops.filter((item) => !item.Forward)
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'MainPage' })
    }
  },
  created() {
    this.id = +this.$route.params.id;
  },
};
</script>

<style>
.rout__page {
  border: 1px solid #f5f5f5;
  padding: 20px;
  display: flex;
  gap: 50px;
}
</style>