<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="6">
        <v-subheader>문제</v-subheader>
      </v-col>

      <v-col cols="6">
        <v-select
          v-model="select"
          :hint="`${select.value}, ${select.ProblemName}`"
          :items="items"
          item-text="value"
          item-value="ProblemName"
          label="Select"
          persistent-hint
          return-object
          single-line
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    data () {
        return {
            select: { value: 'Florida', ProblemName: 'FL' },
            items: [
                { value: 'Florida', ProblemName: 'FL' },
                { value: 'Georgia', ProblemName: 'GA' },
                { value: 'Nebraska', ProblemName: 'NE' },
                { value: 'California', ProblemName: 'CA' },
                { value: 'New York', ProblemName: 'NY' },
            ],
        };
    },
};
</script>