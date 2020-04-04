<template>
  <div id="map">
    <vl-map
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      data-projection="EPSG:4326"
      style="height: 100%;"
    >
      <vl-view
        :zoom.sync="zoom"
        :center.sync="center"
        :rotation.sync="rotation"
      ></vl-view>

      <vl-overlay
        v-for="item in items"
        :key="item.name"
        :position="item.longlat"
      >
        <div class="item__marker" @click="itemClicked(item)">
          <q-icon
            name="fas fa-map-marker"
            :color="item.need ? 'orange' : 'green'"
            class="item__maker--icon"
          ></q-icon>
          <div class="item__marker--icon--type" v-if="item.icon">
            <q-icon :name="`fas fa-${item.icon}`" color="white"></q-icon>
          </div>
        </div>
      </vl-overlay>

      <vl-geoloc @update:position="geolocPosition = $event"></vl-geoloc>

      <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>
    </vl-map>
  </div>
</template>

<script>
export default {
  watch: {
    geolocPosition(__longlat) {
      if (__longlat !== this.center) {
        this.center = __longlat;
        this.zoom = 12;
        console.log('new center', this.center);
        console.log('new zoom', this.zoom);
        console.log('new geo', this.geolocPosition);
      }
    },
  },
  methods: {
    itemClicked(__item) {
      console.log(__item);
    },
  },
  mounted() {
    console.log('center', this.center);
    console.log('zoom', this.zoom);
    console.log('geo', this.geolocPosition);
  },
  data() {
    return {
      zoom: 5,
      center: [8.397111748677801, 64.01244428998672],
      rotation: 0,
      geolocPosition: this.$event,
      items: [
        {
          name: 'test',
          icon: 'toilet-paper',
          message: 'Behöver toalettpapper!',
          need: true,
          longlat: [15.653283901281203, 62.519064483876406],
        },
        {
          name: 'test2',
          icon: 'carrot',
          message: 'Behöver grönsaker!',
          need: true,
          longlat: [15.694290759935752, 62.52940206072094],
        },
        {
          name: 'test3',
          icon: 'question',
          message: 'Behöver någon handla?',
          need: false,
          longlat: [15.63196481944923, 62.53190842767643],
        },
      ],
    };
  },
};
</script>

<style lang="scss">
#map {
  height: 100vh;
  overflow: hidden;

  .item__marker {
    position: absolute;
    font-size: 4rem;
    top: -4rem;
    left: -4rem;
    z-index: 1001;
    height: 6rem;
    width: 4rem;

    &--icon {
      color: $blue;

      &--type {
        position: absolute;
        // width: 100%;
        // height: 100%;
        // top: -1.2rem;
        // left: -0.8rem;
        top: -7.5%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1010;
        i {
          font-size: 1.5rem;
        }
      }
    }

    &--text {
      font-size: 0.75rem;
      position: absolute;
    }
  }
}
</style>
