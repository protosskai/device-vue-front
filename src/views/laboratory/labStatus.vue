<template>
  <div class="labStatus">
    <div>
      <el-row>
        <span>请选择在线用户：</span>
        <el-select
          v-model="selectedUser"
          placeholder="请选择"
          @change="showUser"
        >
          <el-option
            v-for="item in queryUserList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button type="primary" @click="getCurrentUser()">刷新</el-button>
      </el-row>

      <div id="container" style="width: 1280px; height: 690px"></div>
    </div>
  </div>
</template>


<script>
import AMap from "AMap";
import { queryCurrentUser } from "@/api/lab";
var map;
export default {
  name: "LabStatus",
  data() {
    return {
      selectedUser: 0,
      queryUserList: [],
      currentUserList: [],
      mapObject: null,
      currentMarket: null,
    };
  },
  mounted: function () {
    this.init();
    this.getCurrentUser();
  },
  created: function () {},
  methods: {
    init: function () {
      map = new AMap.Map("container", {
        center: [126.681864, 45.775149],
        resizeEnable: true,
        zoom: 16,
      });
      this.mapObject = map;
      AMap.plugin(["AMap.ToolBar", "AMap.Scale"], function () {
        map.addControl(new AMap.ToolBar());
        map.addControl(new AMap.Scale());
      });
    },
    getCurrentUser: function () {
      this.queryUserList = []
      this.currentUserList = []
      queryCurrentUser().then((response) => {
        let data = response.data;
        for (let i = 0; i < data.length; i++) {
          let current = data[i];
          this.queryUserList.push({
            value: i,
            label: current.userName,
          });
          this.currentUserList.push({
            latitude: current.latitude,
            longitude: current.longitude,
          });
        }
        this.showUser();
      });
    },
    showUser: function () {
      if (this.currentMarket != null) {
        this.mapObject.remove(this.currentMarket);
      }
      let currentUser = this.currentUserList[this.selectedUser];
      let marker = new AMap.Marker({
        position: [currentUser.longitude, currentUser.latitude], //位置
      });
      this.currentMarket = marker;
      this.mapObject.add(marker); //添加到地图
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
