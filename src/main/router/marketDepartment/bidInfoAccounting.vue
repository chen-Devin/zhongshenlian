<template>
	<bid-info-list-body :office="office" :bidArray="bidArray" @input="input" @checkMessage="checkMessage"></bid-info-list-body>
</template>

<script>
import bidInfoListBody from './bidInfoListBody.vue';

export default {
	data() {
		return {
			office: "会计所"
		}
	},
	props: {
		bidArray: {
			type: Array,
			default: []
		}
	},
	methods: {
		input() {
			console.log('input');
			this.$router.push('/bid-info-input-kjs');
		},
		checkMessage(project) {
			this.$emit('checkMessage',project,this.office);
		}
	},
	components: {
		bidInfoListBody
	},
	created() {
		this.$emit('tellOffice',this.office);
		this.$emit('queryList',this.office);
	}
}
</script>

<style>
	
</style>