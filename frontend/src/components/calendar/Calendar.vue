<template>
  <div>
    <h2>Calendar</h2>
    <div class="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-gap-4">
      <p>{{ this.loading ? "Loading ..." : "" }}</p>
      <div v-for="day of days" :key="day.id">
        <day-card :day="day"></day-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Day from "../../types/Day";
import DayCard from "../dayCard/DayCard.vue";
import CalendarService from './CalendarService';

interface RespType {
  data: Day;
}

export default defineComponent({
  components: { DayCard },
  name: 'calendar',
  data() {
    return {
      days: [] as Day[],
    };
  },
  mounted() {
    CalendarService.getDays().then(days => {
      this.days = days;
    })
  },
});
</script>
