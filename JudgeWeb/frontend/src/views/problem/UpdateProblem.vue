<template>
<v-card elevation="0" v-if="this.isAdmin" id="contest">
<v-container>
  <div><h2>문제 수정</h2></div>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    class="ma-15"
  >
    <v-checkbox
        v-model="open"
        label="문제 공개"
    ></v-checkbox>
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

    <v-card outlined>
      <v-card-subtitle class="d-flex">
        <v-icon>mdi-paperclip</v-icon>
        <span class="ml-2">테스트케이스 파일 첨부</span>
      </v-card-subtitle>
      <v-card-text class="d-flex flex-wrap">
        <v-chip
          v-for="(fileInfo, idx) in files"
          :key="idx"
          @click:close="removeFile(idx)"
          close
          class="mr-2 mt-1"
        > {{ fileInfo.name }}
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
        @change="uploadFile()"
        multiple
      />
    </v-card>

    <div>
    <v-alert
      dense
      text
      v-if="msgFlag === true"
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
import {check} from '@/components/mixins/check';

export default {
    mixins:[check],
    data: function(){
        return {
            isAdmin: false,
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
            files: [],
            testFiles: [],
            sampleFiles: [],
            inputFilesString: [],
            outputFilesString: [],
            msg: '',
            msgFlag: false,
            fileFlag: false,
            fileModifyFlag: false,
            updateFlag: false,
            fileMsg: '',
            open : false
        };
    },
    async mounted() {
        this.isAdmin = await this.checkAdmin(true);

        if(!this.isAdmin) {
            await this.$router.push('/404');
        }
    },
    async created() {
        await this.$http.get(`/api/problem/id/${this.$route.params.id}`).
            then(res => {
                const problem = res.data;
                this.problemTitle = problem.title;
                this.problemTime = problem.timeLimit;
                this.problemMemory = problem.memoryLimit;
                this.problemContent = problem.description;
                this.inputDescription = problem.inputDescription;
                this.outputDescription = problem.outputDescription;
                this.open = problem.open;
            });
        this.problemTime /= 1000;
        this.problemMemory /= 1000000;
    },
    methods: {
        async updateProblem() {
            this.msgFlag = false;
            this.sampleFiles = [];
            this.testFiles = [];
            this.inputFilesString = [];
            this.outputFilesString = [];

            if(this.files.length !== 0){
                this.fileFlag = false;

                this.files.sort(function (a, b) {
                    if(a.name > b.name) return 1;
                    if(a.name < b.name) return -1;
                    return 0;
                });
                for (let file of this.files) {
                    if(file.name.includes('sample')) this.sampleFiles.push(file);
                    else this.testFiles.push(file);
                }
                if(this.sampleFiles.length % 2 !== 0 || this.testFiles.length % 2 !== 0) {
                    this.fileFlag = true;
                    this.fileMsg = '테스트케이스 개수가 맞는지 확인해주세요!';
                }
                else if(this.sampleFiles.length < 4) {
                    this.fileFlag = true;
                    this.fileMsg = '테스트 케이스는 2개 이상부터 등록할 수 있습니다!';
                }
                else {
                    this.fileFlag = false;
                    for (let file of this.sampleFiles) {
                        let reader = new FileReader();
                        reader.readAsText(file);
                        const result = await new Promise((resolve) => {
                            reader.onload = function() {
                                resolve(reader.result);
                            };
                        });
                        if(file.name.includes('.in')) this.inputFilesString.push({txt : result});
                        else this.outputFilesString.push({txt : result});
                    }
                    for (let file of this.testFiles) {
                        let reader = new FileReader();
                        reader.readAsText(file);
                        const result = await new Promise((resolve) => {
                            reader.onload = function() {
                                resolve(reader.result);
                            };
                        });
                        if(file.name.includes('.in')) this.inputFilesString.push({txt : result});
                        else this.outputFilesString.push({txt : result});
                    }

                    if(this.inputFilesString.length !== this.outputFilesString.length) {
                        this.fileFlag = true;
                        this.fileMsg = '테스트 케이스 개수가 맞지 않습니다. 확인해주세요!';
                    }
                    else {
                        await this.$http.put(`/api/problem/testcase/${this.$route.params.id}`,{
                            number : this.$route.params.id,
                            inputFilesString : this.inputFilesString,
                            outputFilesString : this.outputFilesString
                        });
                        this.updateFlag = true;
                    }
                }
            }
            if(this.files.length !== 0 && this.updateFlag === false) {
                this.fileFlag = true;
                this.fileMsg = '테스트 케이스 수정에 문제가 있습니다!';
            }
            else {
                this.fileFlag = false;
                await this.$http.patch(`/api/problem/update/${this.$route.params.id}`,{
                    problemTitle : this.problemTitle,
                    problemContent : this.problemContent,
                    problemTime : this.problemTime * 1000,
                    problemMemory : this.problemMemory * 1000000,
                    inputDescription : this.inputDescription,
                    outputDescription : this.outputDescription,
                    open : this.open
                }).then(res => {
                    this.msgFlag = true;
                    this.msg = res.data + '번 문제가 수정되었습니다!';
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
                        () => {
                            alert('문제가 삭제되었습니다.');
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
        addFiles(){
            this.$refs.files.click();
        },
        uploadFile(){
            let uploadedTestFiles = this.$refs.files.files;
            for( let i = 0; i < uploadedTestFiles.length; i++){
                this.files.push(uploadedTestFiles[i]);
            }
        },
        removeFile( key ){
            this.files.splice( key, 1 );
        },
    },
};
</script>