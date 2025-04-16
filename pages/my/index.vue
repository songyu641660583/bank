<template>
	<view class="my-page">
		
	</view>
</template>

<script>
	export default {
		onLoad(){
			uni.navigateTo({
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