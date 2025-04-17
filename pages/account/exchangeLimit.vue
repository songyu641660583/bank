<template>
	<view class="lou-code">
		<uni-nav-bar :border="false" :style="{paddingTop: statusBarHeight + 'px',flex:'none'}">
			<template #right>
				<view class="nav-right">
					<image src="@/static/kefu.png" mode="widthFix"></image>
				</view>
			</template>
		</uni-nav-bar>
		<view class="content">
			<image class="logo" src="@/static/liu-code-icon.png" mode="widthFix"></image>
			<view class="tips1">很抱歉，账户号码错误。(RJ140)</view>
			<view class="login-submit"  @click="goBack()">
				确认
			</view>
		</view>
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
			goBack() {
				uni.navigateBack()
			},
			
			handleAfter() {
			uni.navigateTo({
				url: '/pages/home/unLogin'
			});
			}
		}
	}
</script>

<style lang="scss">
	.lou-code {
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		height: 100vh;
		background-color: #fff;
    .nav-left,
		.nav-right {
			image {
				width: 48rpx;
			}
		}

		.content {
			padding: 0 32rpx 60rpx;
			flex: auto;
			display: flex;
			flex-direction: column;
			.logo {
				margin: 48rpx auto;
				width: 164rpx;
				
			}
		}
		.tips1 {
			margin-top: 82rpx;
			color: #333;
			font-size: 28rpx;
			font-style: normal;
			font-weight: 400;
			line-height: 44rpx; /* 122.222% */
		}
		.tips2{
			margin-top: 32rpx;
			color: #666;
			font-size: 28rpx;
			font-style: normal;
			font-weight: 400;
			line-height: 44rpx; /* 157.143% */
		}
		.login-submit {
			margin-top: auto;
			display: flex;
			width: 100%;
			height: 96rpx;
			justify-content: center;
			align-items: center;
			gap: 16rpx;
			flex-shrink: 0;
			border-radius: 10000px;
			background: #C53455;
			color: #fff;
			border: none;
		}
		.after-submit {
			margin-top: 32rpx;
			display: flex;
			width: 100%;
			height: 96rpx;
			justify-content: center;
			align-items: center;
			gap: 16rpx;
			flex-shrink: 0;
			border-radius: 10000px;
			border: 2rpx solid #D0D0D0;
			color: #333;
			
		}
	}

</style>