<template>
	<view class="my-page">
		<uni-nav-bar right-width="280rpx" :fixed="true" :border="false" :style="{paddingTop: statusBarHeight + 'px'}">
			<template #left>
				<view class="nav-left" @click="handleHome">
					<image src="@/static/close-icon.png" mode="widthFix"></image>
				</view>
			</template>
			<template #right>
				<view class="nav-right">
					<view>A<text class="small">A</text></view>
					<view>English</view>
					<image src="@/static/search-icon.png" mode="widthFix"></image>
				</view>
			</template>
		</uni-nav-bar>
		<view class="content">
			<view class="my-info flex-between">
				<view class="my-info-data">
					<view class="my-name">WENG LANG</view>
					<view class="flex-align-center account-opt">
						<text>账户概览</text>
						<image src="@/static/right-arrow2.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="logout">
					登出
				</view>
			</view>
		</view>
		<view class="last-login">最后一次成功登入: (香港时间) 2025/4/16 15:55:47 (手机) 地理位置: 中国</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			const app = getApp()
			this.statusBarHeight = app.statusBarHeight
		},
		data() {
			return {

			}
		},
		methods: {
			
			handleHome(){
				uni.switchTab({
					url: '/pages/home/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.my-page {
		z-index: 9999;
		height: 120vh;
		background-color: #f5f5f5;

		.nav-left,
		.nav-right {
			image {
				width: 48rpx;
			}
			
		}

		.nav-right {
			width: 100%;
			display: flex;
			justify-content: space-between !important;
			align-items: center;
			color: #333;
			font-size: 28rpx;
			.small {
				font-size: 20rpx;
			}
		}
		.content {
			flex: auto;
			display: flex;
			flex-direction: column;
			.my-info {
				padding: 16rpx 32rpx 32rpx;
				.my-name {
					font-weight: bold;
					font-size: 40rpx;
					color: #000;
				}
				&-data{
					image {
						margin-left: 26rpx;
						width: 42rpx;
						height: 42rpx;
					}
				}
			}
			.logout {
				border-radius: 100rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #333;
				padding: 12rpx 36rpx;
				border: 1px solid #999;
				font-size: 22rpx;
			}
		}
		.last-login {
			position: fixed;
           left: 0;
		   right: 0;
		   background-color: #fff;
		   padding: 12rpx 24rpx;
		   bottom: 0;
		   font-size: 24rpx;
		   color: #666;
		}
	}
</style>