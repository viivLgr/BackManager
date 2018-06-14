<template>
    <el-button icon="el-icon-back" class="back-right" size="small" circle @click="goPath"></el-button>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: "back"
    }
  },
  methods: {
    goPath() {
      const path = this.path;
      if (path === "back") {
        this.$router.go(-1);
      } else {
        this.$router.push({ path: path });
      }
    }
  }
};
</script>