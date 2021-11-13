<template>
  <div class="container flex flex-col mx-auto px-4 mt-2 p-3">
    <div class="flex content-start">
      <router-link to="/" class="btn btn-tertiary" tag="a">
        <img src="../assets/back_arrow.svg" width="40" height="40"/>
      </router-link>
    </div>
    <div class="">
      <div v-if="dayInfo" class="flex flex-col items-center">
        <div class="py-4 px-8 rounded border-2 border-gray-300 shadow-sm bg-opacity-70 divide-y divide-black" v-if="dayInfo.date">
          <h2 class="text-9xl p-3">
            {{format(dayInfo.date, 'd')}}
          </h2>
          <p class="text-6xl p-2">
            {{format(dayInfo.date, 'yyy')}}
          </p>
        </div>
      </div>
      <div v-else>Loading ...</div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 grid-gap-5 mt-9">
      <div>
        <div class="px-6 shadow-sm bg-opacity-70" v-if="implemented && !loading">
          <div class="grid px-9 grid-cols-1 gap-4 divide-y-2 divide-black">
            <div class="text-left text-2xl py-6 grid grid-cols-1 grid-gap-3">
              <div class="grid grid-cols-2 grid-gap-3">
                <b class="mb-3">Part 1: </b>
                <p class="m-0" v-if="dayDetail && dayDetail.part1">{{dayDetail.part1.value}}</p>
              </div>
              <div class="grid grid-cols-2 grid-gap-3">
                <b>Duration: </b>
                 <p class="m-0" v-if="dayDetail && dayDetail.part1">{{dayDetail.part1.duration}}ms</p>
              </div>
            </div>
            <div class="text-left text-2xl py-6 grid grid-cols-1 grid-gap-3">
              <div class="grid grid-cols-2 grid-gap-3">
                <b class="mb-3">Part 2: </b>
                <p class="m-0" v-if="dayDetail && dayDetail.part2">{{dayDetail.part2.value}}</p>
              </div>
              <div class="grid grid-cols-2 grid-gap-3">
                <b>Duration: </b>
                <p class="m-0" v-if="dayDetail && dayDetail.part2">{{dayDetail.part2.duration}}ms</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="loading">
          Loading...
        </div>
      </div>
      <div v-if="implemented">
        <div class="px-6 mx-8 h-96">
          <div class="flex justify-center cursor-pointer items-center mb-2 border-dashed border-4 border-blue-400 h-full w-halv"  :class="[dragging ? 'border-opacity-100' : 'border-opacity-50']" @dragover="dragging=true" @drop="dragging=false" @dragleave="dragging=false">
            <p v-if="customPuzzle" class="text-xl text-blue-400 absolute left-50 top-50">{{customPuzzle.name}}</p>
            <p v-if="!customPuzzle" class="text-xl text-blue-400 absolute left-50 top-50">* Drop input here *</p>
            <input type="file"
              v-on:change="uploadPuzzle($event)"
              class="p-5 opacity-0 flex-grow"
              accept=".txt"
              droppable />
          </div>
        </div>
        <button class="btn btn-blue mt-4" v-on:click="calculate()">Calculate</button>
      </div>
    </div>
    <div class="text-xl pt-4" v-if="!loading && !implemented">
      No peeking!
    </div>
    <div class="pt-3" v-if="implemented && dayDetail">
      <button class="btn" v-on:click="showPuzzle = !showPuzzle">
        {{showPuzzle ? 'Hide Puzzle' : 'Show puzzle'}}
      </button>
      <div v-if="showPuzzle">
        <div class="flex flex-row justify-end">
          <button class="btn">Copy</button>
        </div>
        <pre class="">
          {{dayDetail.puzzle}}
        </pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {format} from 'date-fns';
import { defineComponent, ref } from "vue";
import CalendarService from "../components/calendar/CalendarService";
import DayDetail from '../types/DayDetail';
import Day from '../types/Day';
import { useRoute } from 'vue-router';

interface CustomPuzzle {
  value: string | ArrayBuffer | null;
  name: string;
}

export default defineComponent({
  setup: () => {
    const showPuzzle = ref<boolean>(false);
    const customPuzzle = ref<CustomPuzzle | null>(null);
    const route = useRoute();
    const dayDetail = ref<DayDetail>();
    const dayInfo = ref<Day>();
    const implemented = ref<boolean>(true);
    const loading = ref<boolean>(false);
    const dragging = ref<boolean>(false);
      CalendarService.getDay(route.params.id.toString()).then(resp => {
        dayInfo.value = resp;
    })
    return {dayDetail, format, showPuzzle, route, loading, implemented, customPuzzle, dragging, dayInfo};
  },
  methods: {
    async uploadPuzzle(event: any) {
      const reader = new FileReader()
      reader.onload = () => {
        this.customPuzzle = {value: reader.result, name: event.target.files.item(0).name};
        }
       reader.readAsText(event.target.files.item(0));
    },
    async calculate() {
      this.loading = true;
      try {
        this.dayDetail = await CalendarService.calculateDay(this.route.params.id.toString(), this.customPuzzle != null ? this.customPuzzle.value : undefined);
        this.loading = false;
        this.implemented = true;
      } catch (error) {
        this.dayDetail = undefined;
        this.implemented = false;
        this.loading = false;
      }
    },
  }
});
</script>
<style scoped>

</style>