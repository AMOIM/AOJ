<template>
  <v-dialog
      v-model="myCode.show"
      max-width="1000"
  >
  <v-card
      class="mx-auto"
      dark
  >
    <v-card-title>
      <v-icon
          large
          left
      >
        mdi-code-tags
      </v-icon>
      <span class="title font-weight-light">My Code</span>
    </v-card-title>
    <v-card-text>
      <prism-editor class="my-editor" v-model="myCode.view" :highlight="highlighter" line-numbers readonly></prism-editor>
    </v-card-text>
  </v-card>
  </v-dialog>
</template>

<script>
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles

export default {
    name: 'CodeView.vue',
    props: ['myCode'],
    components: {
        PrismEditor,
    },
    methods: {
        highlighter(code) {
            return highlight(code, languages.js); //returns html
        },
    }
};
</script>

<style lang="scss">
// required class
.my-editor {
  background: #2d2d2d;
  color: #ccc;

  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

// optional
.prism-editor__textarea:focus {
  outline: none;
}
</style>