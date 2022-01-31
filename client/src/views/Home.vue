<template>
  <!--主页面布局-->
  <!-- 后续加 -->
  <!-- <header></header> -->
  <myMain></myMain>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import myMain from "@/views/main/main.vue";
export default defineComponent({
  name: "",
  components: {
    myMain,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
