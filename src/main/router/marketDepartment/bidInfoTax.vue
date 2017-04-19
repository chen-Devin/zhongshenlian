<template>
	<bid-info-list-body :office="office" :bidArray="bidArray" @input="input"></bid-info-list-body>
</template>

<script>
import bidInfoListBody from './bidInfoListBody.vue';

export default {
	data() {
		return {
			office: "税务所"
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
			this.$router.push('/bid-info-input-sws');
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