<template>
  <q-layout view="hHh LpR lFr">
    <transition name="fade">
      <div v-if="intro" class="intro">
        <img src="~/assets/logo-vkjh.png" alt="logo" />
      </div>
    </transition>
    <q-footer>
      <q-toolbar class="bg-white text-dark footer__navigation row no-wrap">
        <q-btn
          stretch
          flat
          no-caps
          no-wrap
          icon="fal fa-question-circle"
          label="Vem kan jag hjälpa?"
          @click="helpSomeone()"
        />
        <q-btn
          stretch
          flat
          no-caps
          no-wrap
          icon="fal fa-exclamation-circle"
          label="Jag behöver hjälp!"
          @click="helpMe()"
        />
        <q-btn
          @click="settings()"
          stretch
          flat
          no-caps
          icon-right="fal fa-cog"
        />
      </q-toolbar>
    </q-footer>

    <transition name="fade">
      <div v-if="windowState" @click="closeItemWindow()" class="backdrop"></div>
    </transition>
    <transition name="fade">
      <q-card v-if="windowState" class="map__card" elevated>
        <div v-if="currentWindow === 'helpSomeone'">
          <q-header>
            <q-bar class="bg-green text-white">
              <div>
                <p>
                  Jag kan tänka mig hjälpa...
                </p>
              </div>
              <q-space />
              <q-btn
                @click="closeItemWindow()"
                dense
                flat
                icon="fal fa-times"
              />
            </q-bar>
          </q-header>
          <q-card-section horizontal>
            <div class="map__card--text">
              <p>
                Here's some text. Lorem ipsum dolor sit amet.
              </p>
            </div>
            <q-card-actions class="justify-around q-px-md">
              <q-btn flat round icon="fal fa-reply" />
            </q-card-actions>
          </q-card-section>
        </div>

        <div v-if="currentWindow === 'helpMe'">
          <q-header>
            <q-bar class="bg-orange text-white">
              <div>
                <p>
                  Jag behöver...
                </p>
              </div>
              <q-space />
              <q-btn
                @click="closeItemWindow()"
                dense
                flat
                icon="fal fa-times"
              />
            </q-bar>
          </q-header>
          <q-card-section>
            <div class="q-gutter-md q-pb-sm">
              <q-input
                color="orange"
                v-model="input.user"
                label="Ditt namn"
                dense
              />

              <q-select color="orange" :options="options" v-model="input.icon">
                <template v-slot:selected>
                  Jag behöver
                  <q-chip
                    dense
                    size="24px"
                    color="white"
                    text-color="dark"
                    class="q-my-none q-ml-xs q-mr-none"
                  >
                    <q-avatar
                      color="white"
                      text-color="dark"
                      :icon="`fal fa-${input.icon.icon}`"
                    />
                    <span class="option__icon--text">
                      {{ input.icon.label }}
                    </span>
                  </q-chip>
                </template>
              </q-select>

              <q-input
                color="orange"
                v-model="input.message"
                label="Meddelande"
                dense
              />
            </div>
            <q-card-actions class="row justify-end q-px-md">
              <q-btn
                @click="postData()"
                type="submit"
                :loading="submitting"
                label="Skicka"
                class="q-mt-md"
                color="orange"
              >
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
            </q-card-actions>
          </q-card-section>
        </div>

        <div v-if="currentWindow === 'settings'">
          <q-header>
            <q-bar class="bg-dark text-white">
              <div>
                <p>
                  Inställningar
                </p>
              </div>
              <q-space />
              <q-btn
                @click="closeItemWindow()"
                dense
                flat
                icon="fal fa-times"
              />
            </q-bar>
          </q-header>
          <q-card-section>
            <div class="map__card--text">
              <p>
                Here's some text. Lorem ipsum dolor sit amet.
              </p>
            </div>
          </q-card-section>
        </div>
      </q-card>
    </transition>

    <q-page-container>
      <router-view @geo="newGeoPos($event)" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { store } from '../store/store';
/*
“Asking for help with shame says:
You have the power over me.
Asking with condescension says:
I have the power over you.
But asking for help with gratitude says:
We have the power to help each other.”
― Amanda Palmer, The Art of Asking; or, How I Learned to Stop Worrying and Let People Help
*/
export default {
  name: 'MainLayout',
  components: {},
  created() {
    setTimeout(() => {
      this.intro = false;
    }, 2500);
  },
  methods: {
    newGeoPos(__ev) {
      console.log('new geo pos emitted', __ev);
      this.geolocPosition = __ev;
    },
    itemStateChange() {
      console.log('item state change');
    },
    postData() {
      this.submitting = true;
      setTimeout(() => {
        this.submitting = false;
        this.windowState = false;
        const newItem = {
          id: `xxyyzz-xyz-${Math.round(Math.random() * 1000)}`,
          user: this.input.user,
          time: new Date().getTime(),
          icon: this.input.icon.icon,
          message: this.input.message,
          need: this.input.need,
          type: this.input.icon.value,
          longlat: this.geolocPosition,
        };
        store.addItem(newItem);
        console.log('post data', newItem);
      }, 3000);
    },
    closeItemWindow() {
      this.windowState = false;
    },
    helpSomeone() {
      console.log('help someone');
      this.windowState = true;
      this.currentWindow = 'helpSomeone';
    },
    helpMe() {
      console.log('help me');
      this.windowState = true;
      this.currentWindow = 'helpMe';
    },
    settings() {
      console.log('settings');
      console.log('store', store.state.items);

      // this.debug = !this.debug;
      // console.log('debug: ', !this.debug);
    },
  },
  /*
    TO DO:
      - store, push items/pins
      - app icon, icon genie
  */
  data() {
    return {
      windowState: false,
      currentWindow: '',
      debug: false,
      submitting: false,
      intro: true,
      geolocPosition: undefined,
      options: [
        {
          label: 'Mat (vegetariskt)',
          value: 'food_veg',
          icon: 'carrot',
        },
        {
          label: 'Mat',
          value: 'food',
          icon: 'drumstick',
        },
        {
          label: 'Toalettpapper',
          value: 'toiletpaper',
          icon: 'toilet-paper',
        },
        {
          label: 'Tjänst',
          value: 'service',
          icon: 'question',
        },
        {
          label: 'Hjälp',
          value: 'help',
          icon: 'exclamation',
        },
        {
          label: 'Råvaror',
          value: 'commodities',
          icon: 'egg',
        },
      ],
      input: {
        id: '',
        user: '',
        time: new Date().getTime(),
        need: true,
        message: '',
        icon: {
          label: '',
          value: '',
          icon: '',
        },
      },
    };
  },
};
</script>

<style lang="scss">
@mixin lg {
  @media (min-width: $tablet-max-width) {
    @content;
  }
}

.intro {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $green;
  z-index: 4001;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 95%;
    display: block;
    margin: 0 auto;
  }
}

.option__icon--text {
  font-size: 0.9rem;
}

footer {
  max-width: 600px;
  margin: 0 auto;
  @include lg() {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  h1 {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    display: inline-block;
    vertical-align: middle;
    margin: 0 0.5rem;
  }

  .footer__navigation {
    padding: 0;
    justify-content: stretch;

    > button {
      padding: 0.35rem 0 0.25rem 0;
      flex: 3;

      .q-btn__wrapper {
        padding: 0.5rem;
      }

      &:last-of-type {
        flex: 1;
      }
    }
  }

  .q-toolbar__title {
    display: none;
    /* @include lg() {
      display: block;
    } */
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
