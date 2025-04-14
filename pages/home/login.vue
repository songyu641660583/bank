<template>
	<view class="home-login" :style="{paddingBottom: (bottomBarHeight + 50) + 'px'}">
		<view class="header">
			<uni-nav-bar backgroundColor="transparent" :border="false"
				:style="{paddingTop: statusBarHeight + 'px'}"></uni-nav-bar>
			<image class="bg" src="@/static/home-head-bg.png" mode="aspectFit"></image>
			<view class="header-content">
				<uni-nav-bar leftWidth="180px" :border="false">
					<template #left>
						<view class="login-logo">
							<image src="@/static/login-logo.png" mode="widthFix"></image>
						</view>
					</template>
					<template #right>
						<view class="nav-right">
							<image src="@/static/lingdang-icon.png" mode="widthFix"></image>
						</view>
					</template>
				</uni-nav-bar>
			</view>
		</view>
		<view class="content">
			<view class="tabWrap">
				<view class="grident"></view>
				<view class="tabList">
					<view class="tabList-item" :class="{active:index === tabIndex}" v-for="(item,index) in tabsList"
						:key="index">
						<view class="value">{{item.name}}</view>
						<image class="icon" v-if="item.icon" src="@/static/icon-circle.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="options">
				<view class="options-item" v-for="(item, index) in options">
					<view class="options-item-img">
						<image :src="item.url" mode="aspectFit"></image>
					</view>
					<view class="options-item-text">{{item.name}}</view>
				</view>
			</view>

			<view class="title">发掘更多</view>
			<view class="fajue">
				<view class="fajue-item">
					<!-- <image class="fajue-bg" src="@/static/home-fajue-bg.png" mode="widthFix"></image> -->
					<view class="fajue-name">启用流动保安编码</view>
					<view class="fajue-text">无须带实物编码器，理财更安全方便</view>
				</view>
				<view class="fajue-item">
					<!-- <image class="fajue-bg" src="@/static/home-fajue-bg.png" mode="aspectFill"></image> -->
					<view class="fajue-name">登记此装置</view>
					<view class="fajue-text">方便接收电子提示</view>
				</view>
			</view>
			<view class="title" style="margin-top:0;">常用收款人</view>
			<view class="shoukuan-content">
				<image class="icon" src="@/static/liu-code-icon.png" mode="widthFix"></image>
				<view class="tips1">资料接收不清楚</view>
				<view class="tips2">现时无法载入资料，请稍后重试。</view>
				<view class="btn">重试</view>
			</view>
		</view>
		<view class="my-account" :style="{bottom: bottomBarHeight + 'px'}" @click="handleShowAccount('accountPopup')">
			<image class="icon" src="@/static/arrow-top.png" mode="widthFix"></image>
			<view class="my-account-title">我的账户</view>
		</view>
		<uni-popup ref="accountPopup">
			<view class="account-pop" :style="{height: `calc(100vh - ${statusBarHeight || 30}px)`}">
				<view class="my-account-head flex-between">
					<view class="flex-between" @click="handleAccountInfo">
						<text> 我的账户</text>
						<image class="arrow" src="@/static/right-icon.png" mode="aspectFit"></image>
					</view>
					<image class="right-free-icon" src="@/static/free-icon.png" mode="aspectFit"></image>
				</view>
				<view class="account-tabs flex-between">
					<view class="account-tabs-item" :class="{active: accountTabsIndex === index}"
						v-for="(item, index) in accountTabsList" :key="index" @click="accountTabsIndex = index">
						{{item.name}}
					</view>
				</view>
				<view class="content">
					<view class="account-info-type">
						{{myAccountInfo.hk.typeText}} · {{myAccountInfo.hk.accountNumber}}
					</view>
					<view class="account-info-text1">账面余额</view>
					<view class="account-info-balance">
						<text class="decimal">{{myAccountInfo.hk.type}}</text>
						<text class="value"> {{myAccountInfo.hk.balance}} </text>
						<text class="decimal">.{{myAccountInfo.hk.decimal}}</text>
					</view>
					<view class="account-record">
						<view class="account-record-title">最近交易记录</view>
						<view class="account-record-content">
							<view class="account-record-content-noData">
								<image src="@/static/record-kong.png" mode="aspectFit"></image>
								<text>您没有最近交易记录。</text>
							</view>
						</view>
						<view class="account-record-more">更多</view>
					</view>
					<view class="zhuanhzang-submit" @click="handleToZhuanzhang">
						<image src="@/static/zhuanzhang-white.png" mode="aspectFit"></image>
						<text>转账/转数快</text>
					</view>
				</view>

			</view>
		</uni-popup>

	</view>
</template>


<script>
	import {
		myAccountInfo
	} from '../../data/data.js'
	import img1 from '/static/zhuanzhang.png'
	import img2 from '/static/huobiduihuan.png'
	import img3 from '/static/huobiduihuan.png'
	import img4 from '/static/maimaizhengquan.png'
	export default {
		created() {
			const app = getApp()
			this.statusBarHeight = app.statusBarHeight
			this.bottomBarHeight = app.bottomBarHeight
		},
		data() {
			return {
				myAccountInfo,
				options: [{
						url: img1,
						name: '转账/转数块'
					},
					{
						url: img1,
						name: '登记抽奖'
					},
					{
						url: img1,
						name: '信用卡现金分期'
					},
					{
						url: img1,
						name: '分期贷款'
					},
					{
						url: img1,
						name: '货币兑换'
					},
				],
				tabIndex: 1,
				tabsList: [{
						name: '自主空间',
						id: 1,
						icon: true
					},
					{
						name: '日常理财',
						id: 1
					},
					{
						name: '财富管理',
						id: 1
					},
					{
						name: '消费享乐',
						id: 1
					},
					{
						name: '跨境',
						id: 1
					},
				],
				accountTabsIndex: 0,
				accountTabsList: [{
					name: '储蓄'
				}, {
					name: '支票'
				}, {
					name: '定期存款'
				}]
			}
		},
		methods: {
			handleShowAccount(type, posi) {
				this.$refs[type].open(posi || 'bottom')

			},
			handleClosePop(type) {
				this.$refs[type].close()
			},
			handleToZhuanzhang(){
				uni.navigateTo({
					url: '/pages/account/chooseAccount'
				});
			},
			handleAccountInfo(){
				uni.navigateTo({
					url: '/pages/account/accountInfo'
				});
			}
		}
	}
</script>

<style lang="scss">
	.uni-navbar__content {
		background-color: rgba(0, 0, 0, 0) !important;
	}

	.uni-navbar__header {
		background-color: rgba(0, 0, 0, 0) !important;
		padding: 0 16px !important;
	}

	.home-login {
		width: 100vw;
		min-height: 100vh;
		overflow-x: hidden;

		.header {
			position: relative;
			width: 100%;
			height: 238px;

			.nav-right {
				image {
					width: 24px;

					// mix-blend-mode: multiply;
				}
			}

			.login-logo {
				image {
					width: 150px;
					height: 92px;

					mix-blend-mode: multiply;
				}
			}

			.bg {
				width: 100%;
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				top: 0;
				z-index: 0;

			}
		}

		.content {
			.shoukuan-content {
				margin: 32rpx 32rpx;
				padding: 0 16px 30px;
				flex: auto;
				display: flex;
				flex-direction: column;
				box-shadow: 0px 0px 4rpx 0px rgba(0, 0, 0, 0.34);
				border-radius: 20rpx;
				text-align: center;

				.tips1 {
					color: #333;
					font-size: 26rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 42rpx;
				}

				.tips2 {
					color: #666;
					font-size: 26rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 42rpx;
				}

				.btn {
					margin: 32rpx auto 0;
					display: flex;
					width: 160rpx;
					height: 66rpx;
					justify-content: center;
					align-items: center;
					flex-shrink: 0;
					border-radius: 10000px;
					border: 1px solid #D0D0D0;
					color: #333;
				}

				.icon {
					margin: 24px auto;
					width: 82px;

				}
			}

			.title {
				margin-top: 100rpx;
				padding: 0 32rpx;
				color: #333;
				font-size: 44rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 44rpx;
			}

			.fajue {
				padding-right: 32rpx;
				display: flex;
				flex-wrap: nowrap;
				white-space: nowrap;
				overflow-x: auto;
				scrollbar-width: none;

				&-item {
					margin: 32rpx 0 100rpx;
					flex: none;
					padding: 44rpx 32rpx;
					width: 564rpx;
					height: 394rpx;
					margin-left: 42rpx;
					border-radius: 20rpx;
					margin-right: 2rpx;
					box-shadow: 0px 0px 4rpx 0px rgba(0, 0, 0, 0.34);
					// box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.20);
					background: url("@/static/home-fajue-bg.png") no-repeat;
					background-size: 100% 100%;
					box-sizing: border-box;


					.fajue-name {
						position: relative;
						z-index: 1;
						color: #333;
						font-size: 26rpx;
						font-style: normal;
						font-weight: 400;
						line-height: 42rpx;
					}

					.fajue-text {
						margin-top: 8px;
						width: 290rpx;
						position: relative;
						z-index: 1;
						color: #333;
						font-size: 32rpx;
						font-style: normal;
						font-weight: 400;
						line-height: 50rpx;
						/* 21px */
						white-space: pre-wrap;
					}
				}
			}

			.options {
				padding-right: 52rpx;
				margin-top: 32rpx;
				display: flex;
				flex-wrap: nowrap;
				white-space: nowrap;
				overflow-x: auto;
				/* 横向滚动 */
				scrollbar-width: none;
				/* 隐藏滚动条 - Firefox */


				&-item {
					margin-left: 32rpx;
					margin-right: 32rpx;

					width: 120rpx;

					&-img {
						margin: 0 auto;
						width: 110rpx;
						height: 110rpx;
						display: flex;
						align-items: center;
						border-radius: 100px;
						background: #FFF;
						box-shadow: 0px 4rpx 12rpx 0px rgba(0, 0, 0, 0.20);
						justify-content: center;

						image {
							width: 50rpx;
							height: 50rpx;
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
						line-height: 32rpx;
						white-space: pre-wrap;
						letter-spacing: 1rpx;

					}
				}
			}

			.tabWrap {
				position: relative;
				width: 100%;

				.grident {
					right: -23%;
					top: 25%;
					position: absolute;
					width: 23%;
					height: 40%;
					z-index: 1;
					box-shadow: -140rpx 0px 60rpx 0 rgba(255, 255, 255, 1);
				}

			}

			.tabList {
				display: flex;
				flex-wrap: nowrap;
				white-space: nowrap;
				align-items: center;
				overflow-x: auto;
				/* 横向滚动 */
				scrollbar-width: none;
				/* 隐藏滚动条 - Firefox */

				&-item {
					padding-bottom: 40rpx;
					margin-top: 40rpx;
					margin-left: 32rpx;
					margin-right: 16rpx;
					position: relative;
					color: #787878;
					font-size: 36rpx;
					font-style: normal;
					font-weight: 500;
					line-height: 36rpx;

					/* 128.571% */
					&::after {
						content: ' ';
						position: absolute;
						bottom: 16rpx;
						width: 100%;
						height: 8rpx;
						background-color: #940221;
						border-radius: 60rpx;
						display: none;
					}

					.icon {
						top: -16rpx;
						right: -16rpx;
						position: absolute;
						width: 18rpx;
					}

					&.active {
						color: #333;
						font-size: 44rpx;
						font-style: normal;
						font-weight: 500;
						line-height: 44rpx;

						/* 122.222% */
						&::after {
							display: block;
						}
					}
				}
			}
		}

		.my-account {
			width: 100%;
			padding: 10rpx 30rpx 52rpx;
			position: fixed;
			bottom: 0;
			border-radius: 32rpx 32rpx 0px 0px;
			background: #FFF;
			box-shadow: 0px -16rpx 32rpx 0px rgba(0, 0, 0, 0.14);
			box-sizing: border-box;
			text-align: center;

			image {
				width: 48rpx;
				height: 48rpx;
			}

			&-title {
				width: 100%;
				color: #333;
				text-align: left;
				font-size: 30rpx;
				font-style: normal;
				font-weight: 500;
				line-height: 150%;
				/* 22.5px */
			}
		}

		.account-pop {
			display: flex;
			flex-direction: column;
			background-color: #fff;
			border-radius: 40rpx 40rpx 0 0;
			padding-top: 48rpx;
			box-sizing: border-box;

			.content {
				background: url("@/static/free-icon.png") no-repeat;
				background-size: contain;
				background-position: 0rpx 100rpx;
			}

			.account-tabs {
				margin-top: 48rpx;
				padding: 0 32rpx;
				gap: 32rpx;

				&-item {
					flex: 1;
					height: 120rpx;
					padding: 24rpx 0 0 32rpx;
					border-radius: 16rpx;
					background: #FFF;
					box-shadow: 0px 0px 8rpx 0px rgba(0, 0, 0, 0.24);
					border: 1px solid rgba(0, 0, 0, 0);
					color: #333;
					font-size: 24rpx;
					font-style: normal;
					font-weight: 500;
					line-height: 32rpx;
					/* 133.333% */
					box-sizing: border-box;

					&.active {
						border-color: #1DB3A9;
						background: #EFFAFC;
					}
				}
			}

			.account-record {
				margin: 32rpx;
				border-radius: 16rpx;
				background: #FFF;
				box-shadow: 0px 4rpx 8rpx 0px rgba(0, 0, 0, 0.24);
				overflow: hidden;

				&-title {
					padding: 32rpx;
					color: #333;
					font-size: 28rpx;
					font-style: normal;
					font-weight: 500;
					line-height: 32rpx;
					/* 114.286% */
				}

				&-content {

					&-noData {
						display: flex;
						flex-direction: column;
						align-items: center;

						image {
							margin-top: 86rpx;
							width: 190rpx;
							height: 132rpx;

						}

						text {
							margin-top: 24rpx;
							margin-bottom: 48rpx;
							color: #999;
							font-size: 22rpx;
							font-style: normal;
							font-weight: 400;
							line-height: 32rpx;
							/* 145.455% */
						}
					}
				}

				&-more {
					height: 112rpx;
					text-align: center;
					border-top: 1px solid #DEDEDE;
					background: #FFF;
					text-align: center;
					line-height: 110rpx;
					color: #333;
					font-size: 24rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 110rpx;
					/* 133.333% */
					overflow: hidden;
				}
			}

			.account-info-type {
				margin-top: 80rpx;
				text-align: center;
				color: #666;
				font-size: 22rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 24rpx;
				/* 109.091% */
				letter-spacing: 1rpx;
			}

			.account-info-text1 {
				margin-top: 24rpx;
				color: #333;
				text-align: center;
				font-size: 24rpx;
				font-style: normal;
				font-weight: 500;
				letter-spacing: 1rpx;
				line-height: 32rpx;
				/* 133.333% */
			}

			.account-info-balance {
				color: #333;
				text-align: center;
				font-size: 24rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 32rpx;

				/* 114.286% */
				.value {
					margin-left: 4rpx;
					font-size: 80rpx;
					font-weight: 400;
					line-height: 150%;
					/* 60px */
					letter-spacing: 2rpx;
				}
			}

			.zhuanhzang-submit {
				margin: 106rpx auto 20rpx;
				display: flex;
				width: 284rpx;
				height: 94rpx;
				justify-content: center;
				align-items: center;
				flex-shrink: 0;
				border-radius: 10000px;
				background: #C53455;
				border: none;
				color: #fff !important;
				font-size: 24rpx;

				image {
					width: 48rpx;
					height: 48rpx;
					margin-right: 16rpx;
				}
			}


			.my-account-head {
				flex: none;
				padding: 0 32rpx;
				color: #333;
				font-size: 30rpx;
				font-style: normal;
				font-weight: 500;
				line-height: 32rpx;

				/* 106.667% */
				.arrow {
					width: 48rpx;
					height: 48rpx;
				}

				.right-free-icon {
					width: 154rpx;
					height: 68rpx;
				}
			}




			.my-account-title {
				flex: none;
				margin-top: 20rpx;
				margin-bottom: 100rpx;
				padding: 0 32rpx;
				color: #333;
				font-size: 40rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 50rpx;
			}


		}


	}

</style>