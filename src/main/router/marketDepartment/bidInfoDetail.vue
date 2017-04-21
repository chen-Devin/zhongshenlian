<template>
	<div class="main">
		<crumbs :paths="paths"></crumbs>
		<card>
			<bid-info-check></bid-info-check>
		</card>
	</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

import crumbs from '../../component/crumbs.vue';
import card from '../../component/card.vue';
import bidInfoCheck from './component/bidInfoCheck.vue';

export default {
    name: 'bidInfoDetail',
    data() {
    	return {
			paths: [
	    		{name: '招投标信息看板', url: '/bid-info-list', present: false},
	    		{name: '招投标详情', url: '/bid-info-detail', present: true}
	  		],
	  		project: {}
    	}
    },
    components: {
    	crumbs,
    	card,
    	bidInfoCheck
    }
}
</script>

<style lang="sass" scoped>

</style>