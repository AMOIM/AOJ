<template>
  <v-dialog
      v-model="timeShow"
      max-width="300"
      max-height="300"
      persistent
  >
    <v-card
        class="mx-auto"
    >
      <v-time-picker
          v-model="picker"
          format="24hr"
          full-width
          scrollable
      ></v-time-picker>
      <v-icon @click="saveTime" color="green" class="text-h3 margin">mdi-check</v-icon>
      <v-icon @click="cancel" color="red" class="text-h3 margin">mdi-close</v-icon>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
    name: 'TimePicker.vue',
    props : ['timeShow'],
    data (){
        return {
            picker : ''
        };
    },
    methods : {
        saveTime(){
            this.$emit('save', this.picker);
            this.$emit('close');
        },
        cancel(){
            this.$emit('close');
        }
    }
};
</script>

<style scoped>
.margin {
  margin : 10px;
}
</style>