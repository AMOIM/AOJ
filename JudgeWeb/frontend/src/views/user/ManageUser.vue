<template>
    <v-container fluid v-if="this.isAdmin">
        <v-row align="center" justify="center">
            <v-card elevation="0" style="width: 80%;">
                <v-card-title class="mb-0 pb-0">대회 참가자 관리
                    <v-spacer></v-spacer>
                    <v-text-field
                        style="width: 100px;"
                        v-model="contestId"
                        append-icon="mdi-magnify"
                        label="대회번호 입력"
                        single-line
                        hide-details
                        v-on:keyup.enter="contestDelete=true"
                        @click:append="contestDelete=true"
                    ></v-text-field>
                </v-card-title>
                <v-card-title class="mt-0 pt-0">
                    <h6 style="color: grey;">특정 대회의 참가자들을 탈퇴시킬 수 있습니다.</h6>
                </v-card-title>
            </v-card>
        </v-row>
        <v-row align="center" justify="center">
            <v-card elevation="0" class="ma-4" style="width: 80%;">
                <v-card-title>
                    회원 관리
                <v-spacer></v-spacer>
                <v-text-field
                    style="width: 47px;"
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="아이디 / 닉네임 검색"
                    single-line
                    hide-details
                ></v-text-field>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="users"
                    :search="search"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                >
                <template v-slot:item.isApprove="{item}">
                    <v-btn
                        class="ma-1"
                        color="purple lighten-4"
                        v-if="item.isApprove===false"
                        v-on:click="approve(item)"
                        small
                    >승인
                        <v-icon
                            small
                        >
                        mdi-account-check
                        </v-icon>
                    </v-btn>
                    <v-btn
                        class="ma-2"
                        color="purple lighten-4"
                        small
                        v-if="item.isApprove===false"
                        v-on:click="secession(item)"
                    >거절
                        <v-icon
                            small
                        >
                        mdi-account-cancel-outline
                        </v-icon>
                    </v-btn>
                    <v-btn
                        class="ma-2"
                        color="purple lighten-4"
                        small
                        v-if="item.isApprove===true"
                        v-on:click="secession(item)"
                    >탈퇴
                        <v-icon
                            small
                        >
                        mdi-account-cancel-outline
                        </v-icon>
                    </v-btn>
                </template>
                </v-data-table>
            </v-card>
        </v-row>
        <v-dialog v-model="userApprove" max-width="500px">
            <v-card>
                <v-card-title class="justify-center">사용자를 승인하시겠습니까?</v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="purple darken-2" text @click="close()">취소</v-btn>
                <v-btn color="purple darken-2" text @click="approveConfirm()">승인</v-btn>
                <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="userDelete" max-width="500px">
            <v-card>
                <v-card-title class="justify-center">사용자를 삭제하시겠습니까?</v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="purple darken-2" text @click="close()">취소</v-btn>
                <v-btn color="purple darken-2" text @click="secessionConfirm()">삭제</v-btn>
                <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="contestDelete" max-width="500px">
            <v-card>
                <v-card-title class="justify-center">대회 참가자들을 삭제하시겠습니까?</v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="purple darken-2" text @click="close()">취소</v-btn>
                <v-btn color="purple darken-2" text @click="removeContestUser()">삭제</v-btn>
                <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar
				v-model="snackbar.show"
				:timeout="2000"
				:color="snackbar.color"
			>
				{{ snackbar.text }}
				<v-btn justify="center" text v-on:click="snackbar.show = false">
					close
				</v-btn>
			</v-snackbar>
    </v-container>
</template>

<script>
import {check} from '@/components/mixins/check';

export default {
    mixins:[check],
    data () {
        return {
            isAdmin : false,
            snackbar: {
                show: false,
                text: '',
                color: '',
            },
            contestId: '',
            contestDelete: false,
            sortBy: 'isApprove',
            sortDesc: false,
            search: '',
            headers: [
                { text: '아이디', align: 'center', value: 'id',},
                { text: '닉네임', align: 'center', value: 'name' },
                { text: '관리', align: 'center', value: 'isApprove'},
            ],
            users: [],
            user: '',
            userApprove: false,
            userDelete: false,
            userDeletedIndex: '',
        };
    },
    async mounted() {
        this.isAdmin = await this.checkAdmin(true);

        if(!this.isAdmin) {
            await this.$router.push('/404');
        }
    },
    async created() {
        try {
            const result = await this.$http.get('/api/user/all');
            this.users = result.data;
        } catch (err) {
            this.$log.error(err);
        }
    },
    methods: {
        close() {
            this.userApprove = false;
            this.userDelete = false;
            this.contestDelete = false;
        },
        async removeContestUser(){
            try{
                const result = await this.$http.delete('/api/user/delete/contest', {
                    data : {
                        id : this.contestId
                    }
                });
                if(result.data) {
                    this.contestDelete = false;
                    this.snackbar.color = 'success';
                    this.snackbar.text = '대회 참가자들이 삭제되었습니다.';
                    this.snackbar.show = true;
                }
                else {
                    this.contestDelete = false;
                    this.snackbar.color = 'error';
                    this.snackbar.text = '대회 번호를 다시 한번 확인해주세요.';
                    this.snackbar.show = true;
                }
            } catch(err) {
                this.contestDelete = false;
                this.snackbar.color = 'error';
                this.snackbar.text = '서버 에러입니다. 개발자에게 문의해주세요.';
                this.snackbar.show = true;
                this.$log.error(err);
            }
        },
        async approve(user) {
            this.user = user;
            this.userApprove = true;
        },
        async approveConfirm() {
            try {
                const result = await this.$http.patch('/api/user/approve', {
                    id : this.user.id
                });
                if(result.data) {
                    this.userApprove = false;
                    this.user.isApprove = true;
                    await Object.assign(this.users, this.user);
                    this.user = '';
                    this.snackbar.color = 'success';
                    this.snackbar.text = '사용자 승인처리가 완료되었습니다.';
                    this.snackbar.show = true;
                }
            } catch (err) {
                this.userApprove = false;
                this.snackbar.color = 'error';
                this.snackbar.text = '사용자 승인처리에 실패하였습니다.';
                this.snackbar.show = true;
                this.$log.error(err);
            }
        },
        async secession(user) {
            this.user = user;
            this.userDelete = true;
            this.userDeletedIndex = this.users.indexOf(user);
        },
        async secessionConfirm() {
            try {
                const result = await this.$http.delete('/api/user/delete', {
                    data : {
                        id : this.user.id
                    }
                });
                if(result.data) {
                    this.userDelete = false;
                    this.users.splice(this.userDeletedIndex, 1);
                    this.userDeletedIndex = '';
                    this.user = '';
                    this.snackbar.color = 'success';
                    this.snackbar.text = '사용자 탈퇴처리가 완료되었습니다.';
                    this.snackbar.show = true;
                }
            } catch (err) {
                this.userDelete = false;
                this.snackbar.color = 'error';
                this.snackbar.text = '사용자 탈퇴처리에 실패하였습니다.';
                this.snackbar.show = true;
                this.$log.error(err);
            }
        }
    }
};
</script>