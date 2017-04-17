<template>
	<bid-info-list-body :office="office" :bidArray="bidArray"></bid-info-list-body>
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