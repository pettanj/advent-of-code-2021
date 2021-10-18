<template>
  <div class="home">
    <Calendar />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Calendar from '../components/calendar/Calendar.vue';
@Options({
  components: {
    Calendar
  },
})
export default class Home extends Vue {}
</script>
