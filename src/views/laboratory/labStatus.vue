<template>
  <div class="labStatus">
    <div>
      <div id="container" style="width: 1280px; height: 690px"></div>
    </div>
  </div>
</template>


<script>
import AMap from "AMap";
var map;
export default {
  name: "LabStatus",
  data() {
    return {};
  },
  mounted: function () {
    this.init();
  },
  methods: {
    init: function () {
      map = new AMap.Map("container", {
        center: [126.681864, 45.775149],
        resizeEnable: true,
        zoom: 16,
      });
      var marker = new AMap.Marker({
        position: [126.681864, 45.775149], //位置
      });
      map.add(marker);//添加到地图
      AMap.plugin(["AMap.ToolBar", "AMap.Scale"], function () {
        map.addControl(new AMap.ToolBar());
        map.addControl(new AMap.Scale());
      });
    },
  },
};
</script>

<style scoped>
.labStatus {
  margin-left: 10px;
  margin-top: 10px;
}
</style>
