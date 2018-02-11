<template>
  <div>You have selected {{$route.params.id}}</div>
</template>

<script>
export default {
  created() {},
  validate(data) {
    return /^\d+$/.test(data.params.id);
  }
};
</script>

<style>

</style>
