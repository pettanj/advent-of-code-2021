<template>
  <div class="mt-2 p-4">
    <div class="flex flex-col">
      <label class="p-3 self-end">
        <input type="checkbox" v-model="useRandomSort" @change="toggleRandomSort(useRandomSort)" class="random-sort-checkbox" />
        Use random sort
      </label>
    </div>
    <p v-if="this.loading">Loading ...</p>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-gap-4 gap-1 lg:gap-2 xl:gap-3">
      <div v-for="day of filteredDays" :key="day.id">
        <day-card :day="day"></day-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ref } from "vue";
import Day from "../../types/Day";
import DayCard from "../dayCard/DayCard.vue";
import CalendarService from './CalendarService';

interface RespType {
  data: Day;
}

export default defineComponent({
  components: { DayCard },
  name: 'calendar',
  setup() {
    const days = ref<Day[]>();
    const filteredDays = ref<Day[]>();
    const useRandomSort = ref<boolean>(true);
    CalendarService.getDays().then(daysFromServer => {
      days.value = daysFromServer;
      filteredDays.value = CalendarService.randomSort(days.value);
    })
    return { days, filteredDays, useRandomSort }
  },
  methods: {
    toggleRandomSort(val: boolean): void {
      if(val) {
        this.filteredDays = CalendarService.randomSort(this.days);
      } else {
        this.filteredDays = this.days;
      }
    }
  },
});
</script>
