<template>
  <v-container>
      <v-card outlined>
            <v-card-subtitle class="d-flex">
                <v-icon>mdi-paperclip</v-icon>
                <span class="ml-2">파일 첨부</span>
            </v-card-subtitle>
            <v-card-text class="d-flex flex-wrap">
                <v-chip
                    v-for="(fileinfo, idx) in files"
                    :key="idx"
                    @click:close="removeFile(idx)"
                    close
                    class="mr-2 mt-1"
                > {{ fileinfo.name }}
                </v-chip>
                <v-btn class="mt-1" small icon ref="files" @click="addFiles()">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <span>버튼을 눌러 파일을 첨부하세요.</span>
            </v-card-text>
            <input
                type="file"
                class="d-none"
                 ref="files"
                @change="filesUpload()"
                multiple
            />
        </v-card>
        <v-btn
            color="blue-grey"
            class="ma-2 white--text"
            @click="submitFiles()"
        >
        Upload
      <v-icon right dark>mdi-cloud-upload</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
    data(){
        return {
            files: [],
            text: '안됌?',
        };
    },
    methods: {
        addFiles(){
            this.$refs.files.click();
        },
        submitFiles(){
            this.$log.info(this.files);
            for( let i = 0; i < this.files.length; i++ ){
                let file = this.files[i];
                this.$log.info(file);
            }
        },
        filesUpload(){
            let uploadedFiles = this.$refs.files.files;
            for( let i = 0; i < uploadedFiles.length; i++ ){
                this.files.push( uploadedFiles[i] );
            }
        },
        removeFile( key ){
            this.files.splice( key, 1 );
        }
    }
};
</script>