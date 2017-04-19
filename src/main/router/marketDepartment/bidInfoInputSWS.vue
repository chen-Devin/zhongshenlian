<template>
	<div class="main">
		<crumbs :paths="paths"></crumbs>
		<card>
			<bid-info-edit :iniProject="project" :office="office"></bid-info-edit>
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
    name: 'bidInfoInputSWS',
    data() {
    	return {
			paths: [
	    		{name: '招投标信息看板', url: '/bid-info-list/tax', present: false},
	    		{name: '税务所招投标信息录入', url: '/bid-info-input-sws', present: true}
	  		],
	  		project: {},
	  		office: "税务所"
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