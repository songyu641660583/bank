<template>
	<view class="account-page">
		<uni-nav-bar title="储蓄账户" :style="{paddingTop: statusBarHeight + 'px', flex: 'none'}">
			<template #left>
				<view class="nav-left" @click="goBack()">
				</view>
			</template>
			<template #right>
				<view class="nav-right">
					<image src="@/static/kefu.png" mode="widthFix"></image>
				</view>
			</template>
		</uni-nav-bar>
		<view class="content">
			<view class="account-info flex-between" @click="handleShowAccount('accountPopup')">
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
				<view class="options-item" v-for="(item, index) in options" :key="index"  @click="handleOptClick(item.page)">
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
				<view  v-if="recentRecord.length">
					<view class="record-item flex-between" v-for="(item, index) in recentRecord" :key="index">
						<view class="record-item-info">
							<view class="record-date">{{item.date}}<text>{{item.recordType}}</text></view>
							<view class="record-name">{{item.text1}}</view>
							<view class="record-account-number">{{item.text2}}{{item.accountNumber}}</view>
						</view>
						<view class="record-item-value">{{item.money}}.<text>{{item.decimal}}</text></view>
					</view>
				</view>
				<view class="record-noData" v-else>
					没有交易资料。
				</view>
			</view>
		</view>
		<uni-popup ref="accountPopup">
			<view class="account-pop"
				:style="{marginTop: (statusBarHeight || 30) + 'px',minHeight: `${statusBarHeight || 30}px`}">
				<view class="my-account-head">
					<text class="cancel" @click="handleClosePop('accountPopup')">取消</text>
					<text>交易账户</text>
				</view>
				<view class="pop-account-item flex-between" :class="{active: myAccountInfo.hk.accountNumber === item.accountNumber}" v-for="(item, index) in myAccountList" :key="index">
					<view class="pop-account-item-info">
						<view class="text1">{{item.name}}</view>
						<view class="text2">{{item.accountNumber}}</view>
					</view>
					<image src="@/static/zhengque.png" mode="widthFix"></image>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		myAccountInfo,
		recentRecord,
		myAccountList
	} from '../../data/data.js'
	import iconImg1 from '@/static/account-info-icon1.png'
	import iconImg2 from '@/static/account-info-icon2.png'
	import iconImg3 from '@/static/account-info-icon3.png'
	import iconImg4 from '@/static/account-info-icon4.png'
	import iconImg5 from '@/static/account-info-icon6.png'

	export default {
		onLoad() {
			const app = getApp()
			this.statusBarHeight = app.statusBarHeight
		},
		data() {
			return {
				myAccountInfo,
				recentRecord,
				myAccountList,
				options: [{
						name: '转账/转数快',
						img: iconImg1,
						page: '/pages/account/chooseAccount' 
					},
					{
						name: '兑换货币',
						img: iconImg2,
						page: '/pages/account/currencyExchange' 
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
			handleShowAccount(type, posi) {
				this.$refs[type].open(posi || 'bottom')
			
			},
			handleClosePop(type) {
				this.$refs[type].close()
			},
			handleRecord(){
				uni.navigateTo({
					url: '/pages/account/accountRecord'
				});
			},
			goBack() {
				uni.navigateBack()
			},
			handleOptClick(url){
				if(!url) return
				uni.navigateTo({
					url
				});
				
			},

		}
	}
</script>

<style lang="scss">
	.account-page {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: #fff;

		.nav-left,
		.nav-right {
			image {
				width: 48rpx;
			}
		}

		.uni-navbar--border {
			border-bottom-color: rgba(0, 0, 0, 0.1) !important;
		}
		.account-pop {
			display: flex;
			flex-direction: column;
			background-color: #fff;
			box-sizing: border-box;
			padding-bottom: 200rpx;
			.my-account-head {
				position: relative;
				text-align: center;
				
				padding: 20rpx 32rpx;
				justify-content: center;
				color: #333;
				font-size: 30rpx;
				.cancel {
					position: absolute;
					left: 32rpx;
					font-size: 26rpx;
					margin-right: auto;
					color: #C53455;
				}
			
				image {
					width: 48rpx;
					height: 48rpx;
				}
			}
			.pop-account-item {
				padding: 32rpx;
				font-size: 28rpx;
				color: #333;
				&.active {
					background-color: #F4DDDE;
					image{
						display: block;
					}
				}
				image {
					display: none;
					width: 32rpx;
					height: 32rpx;
				}
			}
			
			
		
		}
		
		.record-item {
			padding: 16rpx 0rpx 32rpx;
			&-info {
				color: #999;
				font-size: 25rpx;
				.record-date {
					text {
						color: #333;
						margin-left: 4rpx;
						font-size: 28rpx;
					}
				}
			}
			
			&-value {
				color: #C53455;
				font-size: 30rpx;
				text {
					font-size: 24rpx;
				}
			}
			
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
				font-size: 26rpx;
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
				font-size: 28rpx;
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