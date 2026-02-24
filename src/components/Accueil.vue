<script setup>

</script>

<template>
  <nav>
    <ul>
      <li><h1>Accueil</h1></li>
      <li><h1>Vol</h1></li>
      <li><h1>Hotel</h1></li>
      <li><h1>Contact Support</h1></li>
      <li><h1>À Propos</h1></li>
    </ul>
  </nav>
</template>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  border: 1px solid #e7e7e7;
  background-color: #f3f3f3;
}

ul li {
  display: block;
  color: white;
  padding: 14px 16px;
  text-decoration: none;
}

h1{
  color: rgb(68, 193, 224);
}
ul li:hover{
  background-color: rgb(68, 193, 224);
}
h1:hover ~ li{
  color:rgb(193, 243, 255);
}
ul li h1.active {
  background-color: #04AA6D;
}
</style>
