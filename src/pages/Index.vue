<template>
  <div id="map">
    <div v-if="currentState" @click="closeItemWindow()" class="backdrop"></div>
    <q-card v-if="currentState" class="map__card" elevated>
      <q-header>
        <q-bar :class="`bg-${current.need ? 'orange' : 'green'} text-white`">
          <div>
            <p>
              {{
                `${current.need ? 'Behöver ' : 'Behöver någon '}${typeLabel(
                  current.type,
                )}${current.need ? '!' : '?'}`
              }}
            </p>
          </div>
          <q-space />
          <q-btn @click="closeItemWindow()" dense flat icon="fal fa-times" />
        </q-bar>
      </q-header>

      <q-card-section v-if="!isReplying" horizontal>
        <div class="map__card--text">
          <p>
            {{ current.message }}
          </p>
        </div>
        <q-card-actions vertical class="justify-around q-px-md">
          <q-btn @click="reply(current)" flat round icon="fal fa-reply" />
        </q-card-actions>
      </q-card-section>
      <q-card-section v-else>
        <div class="q-pa-md row justify-center">
          <div style="width: 100%; max-width: 400px;">
            <q-chat-message :text="userTextSent" sent bg-color="green">
            </q-chat-message>

            <q-chat-message :text="userTextReplies" bg-color="orange">
              <q-spinner-dots v-if="userTextRepliesIsReplying" size="2rem" />
            </q-chat-message>
          </div>
        </div>
        <q-input
          color="orange"
          v-model="userTextCurrent"
          label="Meddelande"
          dense
        >
          <template v-slot:after>
            <q-btn @click="sendReply()" round dense flat icon="fal fa-reply" />
          </template>
        </q-input>
      </q-card-section>
    </q-card>

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

      <vl-overlay v-for="item in items" :key="item.id" :position="item.longlat">
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
import { store } from '../store/store';
import devData from '../devData/data.json';

export default {
  props: {},
  watch: {
    geolocPosition(__longlat) {
      if (__longlat !== this.center) {
        this.center = __longlat;
        this.zoom = 12;
        console.log('new center', this.center);
        console.log('new zoom', this.zoom);
        console.log('new geo', this.geolocPosition);
        this.$emit('geo', this.geolocPosition);
      }
    },
    center(__longlat) {
      console.log(`[${__longlat[0]}, ${__longlat[1]}]`);
    },
  },
  methods: {
    sendReply() {
      this.userTextSent.push(this.userTextCurrent);
      this.userTextCurrent = '';
      this.userTextRepliesIsReplying = true;

      setTimeout(() => {
        this.userTextRepliesIsReplying = false;
        this.userTextReplies.push('Oj, vad snällt!');
      }, 2500);
    },
    reply(current) {
      console.log('replying to', current);
      this.isReplying = true;
    },
    typeLabel(__type) {
      switch (__type) {
        case 'food_veg':
          return 'mat (vegetarisk)';
        case 'food':
          return 'mat';
        case 'service':
          return 'hjälp med en tjänst';
        case 'help':
          return 'hjälp';
        case 'commodities':
          return 'råvaror';
        case 'toiletpaper':
          return 'toalettpapper';
        default:
          return 'hjälp';
      }
    },
    closeItemWindow() {
      this.currentState = false;
    },
    getOtherPlaces() {
      console.log('devData', devData);
      const data = devData.items;
      data.forEach((item) => {
        store.addItem(item);
      });
    },
    itemClicked(__item) {
      console.log(__item);
      this.currentState = true;
      this.current = __item;
      // console.log(this.$route);
      // this.$route.push();
    },
  },
  created() {
    this.getOtherPlaces();
  },
  mounted() {
    console.log('center', this.center);
    console.log('zoom', this.zoom);
    console.log('geo', this.geolocPosition);
  },
  data() {
    return {
      userTextSent: [],
      userTextSentIsReplying: false,
      userTextReplies: [],
      userTextRepliesIsReplying: false,
      userTextCurrent: '',
      isReplying: false,
      zoom: 5,
      center: [17.27169173840924, 62.39192228016543],
      rotation: 0,
      geolocPosition: undefined,
      currentState: false,
      current: {},
      items: store.state.items,
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
.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($text-color, 0.2);
  z-index: 3001;
}

.map__card {
  width: 100%;
  max-width: 350px;
  position: absolute;
  z-index: 2010;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3020;

  header {
    position: relative;

    p {
      margin: 0;
    }
  }

  &--text {
    padding: 1rem;
  }
}
</style>
