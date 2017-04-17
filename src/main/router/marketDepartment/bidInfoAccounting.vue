<template>
	<bid-info-list-body :office="office" :bidArray="bidArray" @input="input"></bid-info-list-body>
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
			
		}
	},
	components: {
		bidInfoListBody
	},
	created() {
		this.$emit('tellOffice',this.office);
	}
}
</script>

<style>
	
</style>