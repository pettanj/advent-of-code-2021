<template>
  <div class="p-3 flex items-start justify-center">
    <h3>
      {{day.date}}
    </h3>
    <p v-if="result != null">
      {{result.value}}&nbsp;{{result.time}}ms
    </p>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Day from '../../types/Day';
import Result from '../../types/Result';

export default defineComponent({
  name: 'DayCard',
  props: {
    day:  Object as PropType<Day>,
    result:  Object as PropType<Result | null>,
  }
});
</script>
