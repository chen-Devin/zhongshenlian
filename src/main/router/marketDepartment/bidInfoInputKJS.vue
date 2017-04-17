<template>
	<div class="main">
		<crumbs v-bind:paths="paths"></crumbs>
		<card>
			<bid-info-edit :iniProject="project"></bid-info-edit>
		</card>
	</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import bidInfoEdit from './component/bidInfoEdit.vue';

export default {
    name: 'bidInfoInputKJS',
    data() {
    	return {
			paths: [
	    		{name: '招投标信息看板', url: '/bid-infor-list-market', present: false},
	    		{name: '招投标详情', url: '/bid-infor-detail', present: true}
	  		],
	  		project: {}
    	}
    },
    components: {
    	crumbs,
    	card,
    	bidInfoEdit
    }
}
</script>

<style lang="sass" scoped>

</style>