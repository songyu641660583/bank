<template>
	<view class="my-page">
		
	</view>
</template>

<script>
	export default {
		created(){
			uni.redirectTo({
				url: '/pages/my/account'
			})
		},
		data() {
			return {

			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.my-page {
		background: #fff;
		z-index: 9999;
		height: 120vh;
	}
</style>