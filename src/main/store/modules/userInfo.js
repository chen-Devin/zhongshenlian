import axios from 'axios';
import qs from 'qs';

const state = {
	user: {
		id: '',
		telephone: '',
		name: '',
		jobNumber: '',
		department: '',
		duties: '',
		authority: [],
		gender: '',
		wechatName: '',
		wechatHeadImg: ''	
	}
};

const getters = {
	getUser: state => state.user 
};

const actions = {
	fetchUserInfo ({ commit, state }) {
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
		        	commit('updateUserInfo',rep.data.data)
		        }
		    },(rep)=>{});
	}
};

const mutations = {
	updateUserInfo(state, user) {
		state.user.id = user.id;
		state.user.telephone = user.telephone;
		state.user.name = user.name;
		state.user.jobNumber = user.jobNumber;
		state.user.department = user.department;
		state.user.duties = user.duties;
		state.user.authority = user.authority;
		state.user.gender = user.gender;
		state.user.wechatName = user.wechatName;
		state.user.wechatHeadImg = user.wechatHeadImg;
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};