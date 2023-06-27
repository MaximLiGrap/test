<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
html, body, #app {
    height: 100%;
    width: 100%;
    margin: 0;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
}

button {
  justify-content: center;
  font-weight: 400;
  font-family: Roboto,sans-serif;
  border: none;
  border-radius: 44px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  height: 32px;
  padding: 0 20px;
  white-space: nowrap;
  background: #f7eb70;
  color: #000;
}
</style>
