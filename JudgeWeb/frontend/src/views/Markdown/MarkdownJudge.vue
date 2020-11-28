<template>
<v-container>
    <markdown-editor
        mode="viewer"
        :outline="true"
        v-model="judgeText"
        style="text-align: left;"
        />
</v-container>
</template>

<script>
import {Editor} from 'vuetify-markdown-editor';
import 'vuetify-markdown-editor/dist/vuetify-markdown-editor.css';

export default {
    components: {
        'markdown-editor' : Editor
    },
    data() {
        return {
            judgeText: '',
        };
    },
    async created() {
        const res = await this.$http.get('/api/markdown/get');
        this.judgeText = res.data.judgeMarkdown;
    }
};
</script>