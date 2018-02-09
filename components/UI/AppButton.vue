<template>
  <button
    class="button"
    :class="btnStyle"
    v-bind="$attrs"
    v-on="$listeners"><slot /></button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    btnStyle: {
      type: String,
      default: ''
    }
  }
};
</script>


<style scoped>
.button1 {
  font: inherit;
  background-color: black;
  color: white;
  padding: 5px;
  cursor: pointer;
  border: 1px solid black;
}

.button:hover,
.button:active {
  background-color: rgb(51, 51, 51);
  border: 1px solid black;
}

.inverted {
  background-color: white;
  color: black;
  border: 1px solid transparent;
}

.inverted:hover,
.inverted:active {
  color: #ccc;
  background-color: white;
  border: 1px solid transparent;
}

.cancel {
  background-color: red;
  color: white;
  border: 1px solid transparent;
}

.cancel:hover,
.cancel:active {
  background-color: salmon;
  border: 1px solid transparent;
  color: white;
}

.button {
  font-family: Roboto;
  color: rgb(255, 255, 255);
  background-color: rgb(3, 155, 229);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  padding-left: 16px;
  padding-right: 16px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  min-height: 36px;
  min-width: 88px;
  line-height: 36px;
  vertical-align: middle;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -webkit-align-items: center;
  align-items: center;
  text-align: center;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
  border: 0;
  padding: 0 6px;
  margin: 6px 8px;
  color: white;
  white-space: nowrap;
  text-transform: uppercase;
  font-size: 14px;
  text-decoration: none;
  overflow: hidden;
}
</style>
