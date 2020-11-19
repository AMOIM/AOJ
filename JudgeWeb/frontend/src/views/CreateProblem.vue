<template>
<v-card v-if="this.chk && this.isadmin" id="contest">
<v-container>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    class="ma-15"
  >
    <v-text-field
      v-model="problemTitle"
      :rules="titleRules"
      label="문제 제목"
      required
    ></v-text-field>

    <v-text-field
      v-model="problemTime"
      :rules="timeRules"
      label="시간 (초)"
      required
    ></v-text-field>

   <v-text-field
      v-model="problemMemory"
      :rules="memoryRules"
      label="메모리 (MB)"
      required
    ></v-text-field>

    <v-textarea
      rows="3"
      name="content"
      label="문제 내용"
      v-model="problemContent"
      :rules="contentRules"
    ></v-textarea>

    <v-card outlined>
      <v-card-subtitle class="d-flex">
        <v-icon>mdi-paperclip</v-icon>
        <span class="ml-2">입력 테스트케이스 파일 첨부</span>
      </v-card-subtitle>
      <v-card-text class="d-flex flex-wrap">
        <v-chip
          v-for="(fileinfo, idx) in inputFiles"
          :key="idx"
          @click:close="removeInputFile(idx)"
          close
          class="mr-2 mt-1"
        > {{ fileinfo.name }}
        </v-chip>
        <v-btn class="mt-1" small icon ref="inputFiles" @click="addInputFiles()">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <span>버튼을 눌러 파일을 첨부하세요.</span>
      </v-card-text>
      <input
        type="file"
        class="d-none"
        ref="inputFiles"
        accept=".txt"
        @change="uploadInputFile()"
        multiple
      />
    </v-card>

    <v-card outlined>
      <v-card-subtitle class="d-flex">
        <v-icon>mdi-paperclip</v-icon>
        <span class="ml-2">출력 테스트케이스 파일 첨부</span>
      </v-card-subtitle>
      <v-card-text class="d-flex flex-wrap">
        <v-chip
          v-for="(fileinfo, idx) in outputFiles"
          :key="idx"
          @click:close="removeOutputFile(idx)"
          close
          class="mr-2 mt-1"
        > {{ fileinfo.name }}
        </v-chip>
        <v-btn class="mt-1" small icon ref="outputFiles" @click="addOutputFiles()">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <span>버튼을 눌러 파일을 첨부하세요.</span>
      </v-card-text>
      <input
        type="file"
        class="d-none"
        ref="outputFiles"
        accept=".txt"
        @change="uploadOutputFile()"
        multiple
      />
    </v-card>

    <v-btn
      color="blue-grey"
      class="ma-2 white--text"
      @click="submitFiles()"
    >Upload
      <v-icon right dark>mdi-cloud-upload</v-icon>
    </v-btn>
  </v-form>
  <v-alert
      dense
      text
      v-if="msgFlag==true"
      type="success"
    >
      {{msg}}
    </v-alert>
</v-container>
</v-card>
</template>

<script>
import {checklogin} from '../components/mixins/checklogin.js';

export default {
    mixins:[checklogin],
    data: function(){
        return {
            isadmin: false,
            chk: false,
            problemTitle: '',
            valid: true,
            titleRules: [
                v => !!v || '문제 제목을 입력해주세요!',
            ],
            problemTime: '',
            timeRules: [
                v => !!v || '시간을 입력해주세요! 단위는 초입니다!'
            ],
            problemMemory: '',
            memoryRules: [
                v => !!v || '메모리를 입력해주세요! 단위는 MB입니다!'
            ],
            problemContent: '',
            contentRules: [
                v => !!v || '문제 내용을 입력해주세요!'
            ],
            inputFiles: [],
            inputFilesString: [],
            outputFiles: [],
            outputFilesString: [],
            msg: '',
            msgFlag: false
        };
    },
    async mounted() {
        this.chk = await this.check();
        if(this.chk && this.$store.state.name === 'admin') this.isadmin = true;
        if(this.chk && this.$store.state.name !== 'admin') {
            this.$router.push('/');
            alert('관리자만 접근이 가능합니다.');
        }
    },
    methods: {
        addInputFiles(){
            this.$refs.inputFiles.click();
        },
        addOutputFiles(){
            this.$refs.outputFiles.click();
        },
        uploadInputFile(){
            let uploadedInputFiles = this.$refs.inputFiles.files;
            for( let i = 0; i < uploadedInputFiles.length; i++ ){
                this.inputFiles.push( uploadedInputFiles[i] );
            }
        },
        uploadOutputFile(){
            let uploadedOutputFiles = this.$refs.outputFiles.files;
            for( let i = 0; i < uploadedOutputFiles.length; i++ ){
                this.outputFiles.push( uploadedOutputFiles[i] );
            }
        },
        removeInputFile( key ){
            this.inputFiles.splice( key, 1 );
        },
        removeOutputFile( key ){
            this.outputFiles.splice( key, 1 );
        },
        async submitFiles(){
            for(let fileInput of this.inputFiles){
                let reader = new FileReader();
                reader.readAsText(fileInput);
                const result = await new Promise((resolve) => {
                    reader.onload = function() {
                        resolve(reader.result);
                    };
                });
                this.inputFilesString.push({'txt' : result});
            }

            for(let fileInput of this.outputFiles){
                let reader = new FileReader();
                reader.readAsText(fileInput);
                const result = await new Promise((resolve) => {
                    reader.onload = function() {
                        resolve(reader.result);
                    };
                });
                this.outputFilesString.push({'txt' : result});
            }

            await this.$http.post('/api/problem/create', {
                problemTitle : this.problemTitle,
                problemContent : this.problemContent,
                problemTime : this.problemTime * 1000,
                problemMemory : this.problemMemory * 1000000,
                inputFilesString : this.inputFilesString,
                outputFilesString : this.outputFilesString
            }).then(res => {
                this.msg = res.data + '번 문제가 생성되었습니다!';
                this.msgFlag = true;
            });
        },
    },
};
</script>