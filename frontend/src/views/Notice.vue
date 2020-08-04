<template>
  <v-container fluid>
     <v-row justify="center">
       <v-col sm="5" md="5">
         <v-select
           :items="items"
           label="문제"
         ></v-select>
       </v-col>
      </v-row>
      <v-row justify="center">
       <v-col sm="5" md="5">
         <v-textarea
          rows="3"
           name="content"
           label="내용"
        ></v-textarea>
       </v-col>
      </v-row>
      <v-row justify="center">
       <v-col sm="5" md="5" class="text-end">
        <v-btn class="ma-2" outlined large fab color="indigo">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
       </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    data: () => ({
        items: ['전체', 'A', 'B', 'C', 'D', 'E', 'F'],
    }),
};
</script>