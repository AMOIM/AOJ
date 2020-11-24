<template>
  <div>
  <v-dialog
      v-model="show"
      max-width="500"
      persistent
  >
    <v-card
        class="mx-auto"
    >
  <v-date-picker
      v-model="picker"
      year-icon="mdi-calendar-blank"
      prev-icon="mdi-skip-previous"
      next-icon="mdi-skip-next"
      full-width
  ></v-date-picker>
      <v-icon @click="openTime" color="green" class="text-h3 margin">mdi-check</v-icon>
      <v-icon @click="cancel" color="red" class="text-h3 margin">mdi-close</v-icon>
    </v-card>
  </v-dialog>
  <TimePicker :timeShow="timeShow" @save="saveDate" @close="closeTime"/>
  </div>
</template>

<script>
export default {
    name: 'DatePicker.vue',
    props : ['show', 'mod'],
    components: {
        TimePicker: () => import('./TimePicker'),
    },
    data (){
        return {
            timeShow : false,
            picker : new Date().toISOString().substr(0,10)
        };
    },
    methods : {
        openTime(){
            this.$emit('close');
            this.timeShow = true;
        },
        saveDate(time){
            this.$emit('save', this.picker, time, this.mod);
        },
        cancel() {
            this.$emit('close');
        },
        closeTime(){
            this.timeShow = false;
        }
    }
};
</script>

<style scoped>
.margin {
  margin : 10px;
}
</style>