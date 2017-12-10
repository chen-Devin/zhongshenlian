import axios from 'axios';
import qs from 'qs';

const state = {
	user: {
		id: '',
		telephone: '',
		name: '',
		jobNumber: '',
		department: '',
        companyName: '',
		duties: '',
		authority: [],
		gender: '',
		wechatName: '',
		wechatHeadImg: '',
        shortcutArray: [],
        isPrincipal: 0,
        type: 0
	}
};

const getters = {
	getUser: state => state.user
};

const actions = {
	fetchUserInfo ({ commit, state }) {
        let pro = new Promise((resolve,reject) => {
            axios({
                method: 'get',
                url: '/service',
                params: {
                    data: (()=>{
                    var obj = {
                        command: 'getUserInfo',
                        platform: 'web'
                    }
                    return JSON.stringify(obj);
                    })()
                }
            }).then((rep)=>{
                if(rep.data.statusCode === '10001') {
                    commit('updateUserInfo',rep.data.data);
                    resolve('done');
                } else if (rep.data.statusCode === '10012') {
                    window.location.href = 'signIn.html';
                }
            },(rep)=>{});
        });
        return pro;
	}
};

const mutations = {
	updateUserInfo(state, user) {
		state.user.id = user.id;
		state.user.telephone = user.telephone;
		state.user.name = user.name;
		state.user.jobNumber = user.jobNumber;
        state.user.department = user.department;
		state.user.companyName = user.companyName;
		state.user.duties = user.duties;
		state.user.authority = user.authority;
		state.user.gender = user.gender;
		state.user.wechatName = user.wechatName;
        state.user.wechatHeadImg = user.wechatHeadImg;
		state.user.shortcutArray = user.shortcutArray;
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
