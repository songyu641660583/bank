<template>
	<view class="home-unlogin" :style="{paddingTop: statusBarHeight + 'px'}">
		<view class="header">
			<!-- <uni-nav-bar backgroundColor="transparent" :border="false"
				:style="{paddingTop: statusBarHeight + 'px'}"></uni-nav-bar> -->
			<image class="bg-white" src="@/static/radius.png" mode="widthFix"></image>
			<image class="bg" src="@/static/home-head-bg.png" mode="aspectFill"></image>
			<view class="header-content">
				<uni-nav-bar leftWidth="200px" rightWidth="230px" backgroundColor="transparent" :border="false">
					<template #left>
						<view class="login-logo">
							<image src="@/static/login-white.png" mode="widthFix"></image>
						</view>
					</template>
					<template #right>
						<view class="nav-right">
							<image src="@/static/kefu-white.png" mode="widthFix"></image>
							<image src="@/static/liu0code-white.png" mode="widthFix"></image>
							<image src="@/static/san-line.png" mode="widthFix"></image>
						</view>
					</template>
				</uni-nav-bar>
			</view>
		</view>
		<view class="content">
			<view class="greeting">
				{{greeting}}
			</view>
			<view class="login-submit" @click="handleLogin">
				登入
			</view>
			<view class="options">
				<view class="options-item" v-for="(item, index) in options" @click="handleLogin" :key="index">
					<view class="options-item-img">
						<image :src="item.url" mode="aspectFit"></image>
					</view>
					<view class="options-item-text">{{item.name}}</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import img1 from '/static/options-icon1.png'
	import img2 from '/static/options-icon2.png'
	import img3 from '/static/options2.png'
	import img5 from '/static/options-icon5.png'
	export default {
		created() {
			const app = getApp()
			console.log('app.bottomBarHeight', app)
			this.statusBarHeight = app.statusBarHeight
			this.bottomBarHeight = app.bottomBarHeight
		},
		data() {
			return {
				options: [{
						url: img2,
						name: '转账/转数块'
					},
					{
						url: img3,
						name: '扫码取款'
					},
					{
						url: img1,
						name: '货币兑换'
					},
					{
						url: img5,
						name: '买卖证券'
					},
				]

			}
		},
		computed: {
			greeting() {
				const hour = new Date().getHours()

				if (hour >= 5 && hour < 11) {
					return '早安️'
				} else if (hour >= 11 && hour < 17) {
					return '午安 '
				} else if (hour >= 17 && hour < 23) {
					return '晚安'
				}
			}
		},
		methods: {
			handleLogin() {
				uni.redirectTo({
					url: '/pages/login/login'
				})

			}
		}
	}
</script>

<style lang="scss">
	.home-unlogin {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: #f8f8f8;

		.uni-navbar__content {
			background-color: rgba(0, 0, 0, 0) !important;
		}

		.uni-navbar__header {
			background-color: rgba(0, 0, 0, 0) !important;
			padding: 0 32rpx !important;
		}

		.header {
			flex: auto;
			position: relative;
			width: 100%;
			overflow: hidden;
			// padding-bottom: 20%; 
			// overflow: hidden;
			// background-color: #fff;

			.nav-right {
				display: flex;
				align-items: center;

				image {
					margin-left: 24rpx;
					width: 48rpx;

					// mix-blend-mode: multiply;
				}
			}

			.login-logo {
				image {
					width: 390rpx;
					// height: 92px;

					// mix-blend-mode: multiply;
				}
			}

			.bg-white {
				width: 110%;
				height: 100rpx;
				position: absolute;
				left: -5%;
				right: 0;
				bottom: -405rpx;
				z-index: 1;
			}

			.bg {
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				top: 0;
				z-index: 0;
				// clip-path: polygon(0 0, 100% 0, 100% 85%, 0 85%);
				// clip-path: path('M0,0 L500,0 L300,170 C300,200 0,200 0,170 Z');

			}
		}

		.content {
			flex: none;
			margin-top: 40rpx;
			padding: 0 32rpx 40rpx;

			.options {
				padding: 16px 10px 0;
				margin-top: 16px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-top: 2rpx solid #DEDEDE;

				&-item {
					min-width: 110rpx;

					&-img {
						margin: 0 auto;
						width: 50px;
						height: 50px;
						display: flex;
						align-items: center;
						border-radius: 100px;
						background: #FFF;
						box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.20);
						justify-content: center;

						image {
							width: 250rpx;
							height: 250rpx;
							mix-blend-mode: multiply;
						}
					}

					&-text {
						margin-top: 32rpx;
						color: #333;
						text-align: center;
						font-size: 24rpx;
						font-style: normal;
						font-weight: 400;
						line-height: 24rpx;
						/* 120% */
					}
				}
			}

			.greeting {
				color: #333;
				font-size: 32rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 24rpx;
				/* 92.308% */
			}

			.login-submit {
				margin-top: 50rpx;
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
		}
	}
</style>