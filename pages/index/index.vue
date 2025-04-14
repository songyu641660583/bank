<template>
	<view class="index-page">
		<image src="@/static/index.png" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		mounted(){
			setTimeout(() => {
				uni.switchTab({
					url: '/pages/home/index'
				});
			}, 1000)
		}
	}
</script>

<style>
	.index-page {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 76rpx;
		image {
			margin-bottom: 40%;
			width: 100%;
		}
	}
</style>
