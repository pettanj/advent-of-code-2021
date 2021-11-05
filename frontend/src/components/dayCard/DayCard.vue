<template>
  <router-link tag="a" :to="'/detail/' + day.id" class="p-3 flex flex-col items-center justify-center rounded shadow-sm bg-opacity-70 hover:bg-opacity-80 h-52" :class="colors[parseInt(day.id, 10) % 5]">
    <h3 class="text-4xl block w-full cursor-pointer">
      {{format(day.date, 'd')}}
    </h3>
    <p v-if="result != null">
      {{result.value}}&nbsp;{{result.time}}ms
    </p>
  </router-link>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { format } from 'date-fns';
import Day from '../../types/Day';
import Result from '../../types/Result';

export default defineComponent({
  name: 'DayCard',
  props: {
    day:  Object as PropType<Day>,
    result:  Object as PropType<Result | null>,
  },
  setup: () => {
    const colors = ref<string[]>([
      'bg-red-500 hover:bg-red-400',
      'bg-green-500 hover:bg-green-400',
      'bg-blue-500 hover:bg-blue-400',
      'bg-purple-500 hover:bg-purple-400',
      'bg-yellow-500 hover:bg-yellow-400',
    ]);
    return {format, colors}
  }
});
</script>
