<template>
  <div class="container">
    <div class="flex flex-col items-center">
      <h2>
        {{format(new Date(day.date), 'd')}}
      </h2>
      <p>
        {{format(new Date(day.date), 'yyy')}}
      </p>
    </div>
    <div>
      <div>
        <b>Answer: </b>
        {{day.answer}}
      </div>
      <div>
        <b>Duration: </b>
        {{day.duration}}
      </div>
      <div class="pt-3">
        <button class="btn" v-on:click="showPuzzle = !showPuzzle">
          Puzzle
        </button>
        <div v-if="showPuzzle">
          <pre class="">
            {{day.puzzle}}
          </pre>
          <div class="flex flex-row justify-end">
            <button class="btn">Copy</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {format} from 'date-fns';
import { defineComponent, ref, watch } from "vue";
import CalendarService from "../components/calendar/CalendarService";
import DayDetail from '../types/DayDetail';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup: () => {
    const showPuzzle = ref<boolean>(false);
    const route = useRoute();
    const day = ref<DayDetail>()
    CalendarService.getDay(route.params.id.toString()).then(res => {
      day.value = res;
    })
     watch(
      () => route.params.id,
        async newId => {
          return day.value = await CalendarService.getDay(newId.toString());
        }
    );
    return {day, format, showPuzzle, route};
  },
  methods: {
    async calculate() {
      return this.day = await CalendarService.getDay(this.route.params.id.toString());
    }
  }
});
</script>
