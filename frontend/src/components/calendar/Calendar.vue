<template>
  <div class="mt-2 p-4">
    <p>{{ this.loading ? "Loading ..." : "" }}</p>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-gap-4 gap-1 lg:gap-2 xl:gap-3">
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
