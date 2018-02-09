<template>
  <header class="header">
    <ul class="nav-items">
      <li>
         <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li>
       
        <nuxt-link to="/users">Users</nuxt-link>
      </li>
    </ul>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
  font-family: Raleway;
  display: flex;
  justify-content: flex-center;
  align-items: center;
  height: 60px;
  font-weight: 200;
  font-size: 24px;
  background-color: rgb(43, 144, 226);

  color: white;
}
li {
  margin: 10px;
}
.nav-items {
  list-style: none;

  padding: 10px;
  margin: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
}

.nav-items a {
  text-decoration: none;
  color: white;
}
.nav-items a:hover {
  color: black;
}
</style>
