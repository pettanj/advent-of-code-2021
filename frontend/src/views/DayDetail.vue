<template>
  <div class="container mx-auto px-4 mt-2 p-3">
    <div class="">
      <div v-if="dayInfo" class="flex flex-col items-center">
        <div class="py-2 px-7 rounded border-2 border-gray-300 shadow-sm bg-opacity-70 divide-y divide-black" v-if="dayInfo.date">
          <h2 class="text-6xl p-3">
            {{format(dayInfo.date, 'd')}}
          </h2>
          <p class="text-xl p-2">
            {{format(dayInfo.date, 'yyy')}}
          </p>
        </div>
      </div>
      <div v-else>Loading ...</div>
    </div>
    <div class="pt-4">
      <div class="flex justify-center items-center mb-2 border-dashed border-4 border-blue-400"  :class="[dragging ? 'border-opacity-100' : 'border-opacity-50']" @dragover="dragging=true" @drop="dragging=false" @dragleave="dragging=false">
        <p v-if="customPuzzle" class="text-xl text-blue-400 absolute left-50 top-50">{{customPuzzle.name}}</p>
        <input type="file"
          v-on:change="uploadPuzzle($event)"
          class="p-5 opacity-0 flex-grow"
          
          accept=".txt"
          droppable />
      </div>
    </div>
    <button class="btn btn-blue" v-on:click="calculate()">Calculate</button>
    <div class="p-4 mt-4 rounded border-2 border-gray-300 shadow-sm bg-opacity-70" v-if="dayDetail && implemented && !loading">
      <div class="grid grid-cols-2 gap-4 divide-x">
        <div v-if="dayDetail.part1">
          <b>Part 1: </b>
          {{dayDetail.part1.value}}
          <div>
            <b>Duration: </b>
            {{dayDetail.part1.duration}}ms
          </div>
        </div>
        <div v-if="dayDetail.part2">
          <b>Part 2: </b>
          {{dayDetail.part2.value}}
          <div>
            <b>Duration: </b>
            {{dayDetail.part2.duration}}ms
          </div>
        </div>
      </div>
    </div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="!loading && !implemented">
      No peeking!
    </div>
    <div class="pt-3">
      <button class="btn" v-on:click="showPuzzle = !showPuzzle">
        Puzzle
      </button>
      <div v-if="showPuzzle">
        <pre class="">
          {{dayDetail.puzzle}}
        </pre>
        <div class="flex flex-row justify-end">
          <button class="btn">Copy</button>
        </div>
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