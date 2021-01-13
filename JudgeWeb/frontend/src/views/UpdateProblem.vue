<template>
<v-card elevation="0" v-if="this.chk && this.isadmin" id="contest">
<v-container>
  <div><h2>문제 수정</h2></div>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    class="ma-15"
  >
    <v-text-field
      v-model="problemTitle"
      :rules="titleRules"
      :counter="30"
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
      rows="10"
      name="content"
      label="문제 내용"
      v-model="problemContent"
      :rules="contentRules"
    ></v-textarea>

    <v-textarea
      rows="5"
      name="inputDescription"
      label="문제 입력"
      v-model="inputDescription"
      :rules="inputDescriptionRules"
    ></v-textarea>

    <v-textarea
      rows="5"
      name="outputDescription"
      label="문제 출력"
      v-model="outputDescription"
      :rules="outputDescriptionRules"
    ></v-textarea>

    <v-card v-if="fileModifyFlag==true">
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
        @change="uploadOutputFile()"
        multiple
      />
      </v-card>
    </v-card>
    <div>
    <v-alert
      dense
      text
      v-if="msgFlag==true"
      type="success"
    >
      {{msg}}
    </v-alert>
    </div>
    <div>
    <v-alert
      v-model="fileFlag"
      border="left"
      close-text="Close Alert"
      color="deep-purple accent-4"
      dark
      dismissible
    >
      {{fileMsg}}
    </v-alert>
    </div>
    <v-container>
     <v-row style="justify-content: center;">
       <v-btn text v-if="fileModifyFlag==false" v-on:click="fileModifyFlag=true">
        입출력 파일을 수정하려면 클릭하세요. 단, 모든 입출력파일을 다시 수정해야합니다!
       </v-btn>
     </v-row>
     <v-row style="max-height: 200px">
     <v-col class="text-right">
      <v-btn color="deep-purple darken-2" dark @click="updateProblem()">
        문제 수정<i class="mdi mdi-pencil"></i>
      </v-btn>
     </v-col>
     <v-col class="text-left">
      <v-btn color="red accent-3" dark @click="deleteProblem()">
        문제 삭제<i class="mdi mdi-delete"></i>
      </v-btn>
     </v-col>
    </v-row>
    </v-container>
  </v-form>
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
                v => v && v.length <= 30 || '제목을 30글자 이내로 작성해주세요!'
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
            inputDescription: '',
            inputDescriptionRules: [
                v => !!v || '문제 입력에 대한 설명을 작성해주세요!'
            ],
            outputDescription: '',
            outputDescriptionRules: [
                v => !!v || '문제 출력에 대한 설명을 작성해주세요!'
            ],
            inputFiles: [],
            inputFilesString: [],
            outputFiles: [],
            outputFilesString: [],
            msg: '',
            msgFlag: false,
            fileFlag: false,
            fileModifyFlag: false,
            updateFlag: false,
            fileMsg: ''
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
    async created() {
        await this.$http.post('/api/problem', {
            id : this.$route.params.id
        }).then(res => {
            this.problemTitle = res.data.title;
            this.problemTime = res.data.timeLimit;
            this.problemMemory = res.data.memoryLimit;
            this.problemContent = res.data.description;
            this.inputDescription = res.data.inputDescription;
            this.outputDescription = res.data.outputDescription;
        });
        this.problemTime /= 1000;
        this.problemMemory /= 1000000;
    },
    methods: {
        async updateProblem() {
            if(this.fileModifyFlag) {
                if(this.inputFiles.length !== this.outputFiles.length) {
                    this.fileFlag = true;
                    this.fileMsg = '테스트 케이스 개수가 맞지 않습니다!';
                }
                else if(this.inputFiles.length < 2){
                    this.fileFlag = true;
                    this.fileMsg = '테스트 케이스는 2개 이상부터 등록할 수 있습니다!';
                }
                else {
                    for(let fileInput of this.inputFiles){
                        let reader = new FileReader();
                        reader.readAsText(fileInput);
                        const result = await new Promise((resolve) => {
                            reader.onload = function() {
                                resolve(reader.result);
                            };
                        });
                        const number = Number(fileInput.name.slice(0, -3));
                        this.inputFilesString.push({
                            'key' : number,
                            'txt' : result
                        });
                        this.inputFilesString.sort(function (a, b) {
                            if(a.key > b.key) return 1;
                            if(a.key < b.key) return -1;
                            return 0;
                        });
                    }

                    for(let fileOutput of this.outputFiles){
                        let reader = new FileReader();
                        reader.readAsText(fileOutput);
                        const result = await new Promise((resolve) => {
                            reader.onload = function() {
                                resolve(reader.result);
                            };
                        });
                        const number = Number(fileOutput.name.slice(0, -4));
                        this.$log.info(number);
                        this.outputFilesString.push({
                            'key' : number,
                            'txt' : result
                        });
                        this.outputFilesString.sort(function (a, b) {
                            if(a.key > b.key) return 1;
                            if(a.key < b.key) return -1;
                            return 0;
                        });
                    }
                    await this.$http.put(`/api/problem/testcase/${this.$route.params.id}`,{
                        number : this.$route.params.id,
                        inputFilesString : this.inputFilesString,
                        outputFilesString : this.outputFilesString
                    });
                    this.updateFlag = true;
                }
            }
            else this.updateFlag = true;
            if(this.updateFlag) {
                this.fileFlag = false;
                await this.$http.patch(`/api/problem/update/${this.$route.params.id}`,{
                    problemTitle : this.problemTitle,
                    problemContent : this.problemContent,
                    problemTime : this.problemTime * 1000,
                    problemMemory : this.problemMemory * 1000000,
                    inputDescription : this.inputDescription,
                    outputDescription : this.outputDescription,
                }).then(res => {
                    this.msg = res.data + '번 문제가 수정되었습니다!';
                    this.msgFlag = true;
                    window.location.reload(true);
                });
            }
        },
        async deleteProblem() {
            this.msgFlag = false;
            const result = await this.$http.delete(`/api/problem/testcase/${this.$route.params.id}`);
            if(result){
                await this.$http.delete(`/api/problem/delete/${this.$route.params.id}`)
                    .then(
                        (response) => {
                            alert('문제가 삭제되었습니다.');
                            this.$log.info(response.data);
                            this.$router.push('/problem/list');
                        }
                    )
                    .catch(error => {
                        this.$log.info(error);
                    });
            }
            else {
                this.msg = '문제 수정에 실패하였습니다.';
                this.msgFlag = true;
                window.location.reload(true);
            }
        },
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
        }
    },
};
</script>