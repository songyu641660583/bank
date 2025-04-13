<template>
	<view class="account-page">
		<uni-nav-bar title="储蓄账户" :style="{paddingTop: statusBarHeight + 'px', flex: 'none'}">
			<template #left>
				<view class="nav-left" @click="goBack()">
					<image src="@/static/ref-left-arrow.png" mode="widthFix"></image>
				</view>
			</template>
			<template #right>
				<view class="nav-right">
					<image src="@/static/kefu.png" mode="widthFix"></image>
				</view>
			</template>
		</uni-nav-bar>
		<view class="content">
			<view class="account-info flex-between">
				<view class="account-left">
					<view>{{myAccountInfo.hk.name}}</view>
					<view>{{myAccountInfo.hk.accountNumber}}</view>
				</view>
				<image src="@/static/arrow-down.png" mode="aspectFit"></image>
			</view>
			<view class="account-msg">
				<view class="account-info-text1">账面余额</view>
				<view class="account-info-balance">
					<text class="decimal">{{myAccountInfo.hk.type}}</text>
					<text class="value"> {{myAccountInfo.hk.balance}} </text>
					<text class="decimal">.{{myAccountInfo.hk.decimal}}</text>
				</view>
				<view class="account-use">
					<text class="label">可用余额</text>
					<text
						class="value">{{myAccountInfo.hk.type}}{{myAccountInfo.hk.balance}}.{{myAccountInfo.hk.decimal}}</text>
				</view>
			</view>
			<view class="options flex-between">
				<view class="options-item" v-for="(item, index) in options">
					<view class="options-item-img">
						<image :src="item.img" mode="aspectFit"></image>
					</view>
					<view class="options-item-text">{{item.name}}</view>
				</view>
			</view>
			<view class="record-head flex-between">
				<text>最新交易记录</text>
				<view class="flex-between" @click="handleRecord">
					<text class="all">全部</text>
					<image src="@/static/right-arrow-gray.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="record-content">
				<view class="record-noData">
					没有交易资料。
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		myAccountInfo,
	} from '../../data/data.js'
	import iconImg1 from '@/static/account-info-icon1.png'
	import iconImg2 from '@/static/account-info-icon2.png'
	import iconImg3 from '@/static/account-info-icon3.png'
	import iconImg4 from '@/static/account-info-icon4.png'
	import iconImg5 from '@/static/account-info-icon5.png'

	export default {
		onLoad() {
			const app = getApp()
			this.statusBarHeight = app.statusBarHeight
		},
		data() {
			return {
				myAccountInfo,
				options: [{
						name: '转账/转数快',
						img: iconImg1
					},
					{
						name: '兑换货币',
						img: iconImg2
					},
					{
						name: '缴付账单',
						img: iconImg3
					},
					{
						name: '定期存款',
						img: iconImg4
					},
					{
						name: '我的电子结单/ 通知书',
						img: iconImg5
					},
				]
			}
		},
		methods: {
			handleRecord(){
				uni.navigateTo({
					url: '/pages/account/accountRecord'
				});
			},
			goBack() {
				uni.navigateBack()
			},

		}
	}
</script>

<style lang="scss">
	.account-page {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: #F2F2F2;

		.nav-left,
		.nav-right {
			image {
				width: 48rpx;
			}
		}

		.uni-navbar--border {
			border-bottom-color: rgba(0, 0, 0, 0.4) !important;
		}

		.content {
			display: flex;
			flex-direction: column;
			flex: auto;
			overflow-y: hidden;
			background-color: #F2F2F2;

			.options {
				margin-top: 56rpx;
				padding: 24rpx 6rpx;
				border-top: 1px solid #DADADA;
				background-color: #fff;
				align-items: self-start;

				&-item {
					width: 150rpx;
					display: flex;
					flex-direction: column;
					align-items: center;

					&-img {
						image {
							margin: 0 auto;
							width: 76rpx;
							height: 76rpx;
							mix-blend-mode: multiply;
						}
					}

					&-text {
						color: #333;
						text-align: center;
						font-size: 24rpx;
						font-style: normal;
						font-weight: 400;
						white-space: pre-wrap;
						letter-spacing: 1rpx;

					}
				}
			}

			.record-content {
				padding: 16rpx 32rpx;
				border-top: 1px solid rgba(0, 0, 0, 0.04);
				background-color: #fff;

				.record-noData {
					padding: 16rpx;
					color: #333;
					font-size: 24rpx;
					font-style: normal;
					font-weight: 500;
					line-height: 32rpx;
					/* 133.333% */
					text-align: center;
				}
			}

			.record-head {
				padding: 32rpx;
				color: #333;
				font-size: 24rpx;
				font-style: normal;
				font-weight: 500;
				line-height: 32rpx;

				/* 133.333% */
				.all {
					color: #999;
				}

				image {
					width: 32rpx;
					height: 32rpx;
					margin-left: 16rpx;
				}
			}

			.account-info-text1 {
				margin-top: 32rpx;
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
					margin-left: 9rpx;
					font-size: 80rpx;
					font-weight: 400;
					line-height: 150%;
					/* 60px */
					letter-spacing: 2rpx;
				}
			}

			.account-use {
				margin-top: 30rpx;
				text-align: center;
				color: #999;
				font-size: 24rpx;
				font-style: normal;
				font-weight: 500;
				line-height: 32rpx;

				.value {
					color: #333;
					margin-left: 32rpx;
				}
			}

			.account-info {
				flex: none;
				padding: 0 32rpx;
				background: #fff;
				height: 96rpx;
				color: #333;
				font-size: 24rpx;
				font-style: normal;
				font-weight: 500;
				line-height: 32rpx;

				/* 133.333% */
				image {
					width: 24rpx;
					height: 24rpx;
				}
			}
		}
	}

</style>