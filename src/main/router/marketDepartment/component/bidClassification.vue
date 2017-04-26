<template>
	<ul class="nav nav-pills nav-justified">
	  <li role="presentation"  :class="{ active: isAccounting }"><router-link to="/bid-info-list/kjs">会计所</router-link></li>
	  <li role="presentation" :class="{ active: isAssessment }"><router-link to="/bid-info-list/pgs">评估所</router-link></li>
	  <li role="presentation" :class="{ active: isTax }"><router-link to="/bid-info-list/sws" active-class="active">税务所</router-link></li>
	  <li role="presentation" :class="{ active: isCost }"><router-link to="/bid-info-list/zjs" active-class="active">造价所</router-link></li>
	</ul>
</template>

<script>

export default {
	name: 'bidClassification',
	data() {
		return {
			
		};
	},
	computed: {
		isAccounting() {
			if(this.office === "会计所") {
				return true;
			}
		},
		isAssessment() {
			if(this.office === "评估所") {
				return true;
			}
		},
		isTax() {
			if(this.office === "税务所") {
				return true;
			}
		},
		isCost() {
			if(this.office === "造价所") {
				return true;
			}
		}
	},
	props: {
		office: {
			default: '会计所'
		}
	},
	created() {
		
	}
}
	
</script>

<style lang="sass" scoped>

</style>