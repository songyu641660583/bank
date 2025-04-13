<template>
	<view class="moeny-record">
		<uni-nav-bar title="交易记录" :style="{paddingTop: statusBarHeight + 'px', flex: 'none'}">
			<template #left>
				<view class="nav-left" @click="goBack">
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
			<view class="account-record">
				<view class="account-record-year"   v-for="(yearItem, yearIndex) in record" :key="yearIndex">
					<view class="year-text">
						{{yearItem.date}}
					</view>
					<view class="account-record-month" v-for="(monthItem, monthIndex) in yearItem.data"
						:key="monthIndex">
						<view class="month-text flex-between" @click="handleMonthClick(yearIndex, monthIndex)">
							<text class="value">
								{{monthItem.date}}
							</text>
							<view class="length flex-between">
								<text>{{monthItem.data?.length || 0}}</text>
								<image :style="{opacity:monthItem.data?.length? 1: 0 }" :class="{show:monthItem.show }"  class="arrow" src="@/static/ref-left-arrow.png" mode="widthFix"></image>
							</view>
						</view>
						
						<view class="account-record-day" v-if="monthItem.show" v-for="(dayItem, dayIndex) in monthItem.data" :key="dayIndex">
							<view>
								<text class="date">{{dayItem.date}}</text>
								<text class="recordType">{{dayItem.recordType}}</text>
							</view>
							<view class="recipient" v-if="dayItem.recipient">{{dayItem.recipient}}</view>
							<view class="flex-between" style="margin-top: 4rpx;">
								<text>{{dayItem.accountNumber}}</text>
								<view>
									<text class="moneyTypeText">{{dayItem.moneyTypeText}}</text>
									<text class="value">{{dayItem.value}}</text>
								</view>
							</view>
							<view class="border"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		myAccountInfo,
		record
	} from '../../data/data.js'
	import { deepCopy } from '../../utils/util.js'
	export default {
		onLoad() {
			const app = getApp()
			this.statusBarHeight = app.statusBarHeight
		},
		data() {
			return {
				myAccountInfo,
				record: deepCopy(record)
			}
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			handleMonthClick(yearIndex,monthIndex){
				if(!this.record[yearIndex].data[monthIndex].data.length) return
				this.record[yearIndex].data[monthIndex]['show'] = !this.record[yearIndex].data[monthIndex]['show']
			}

		}
	}
</script>

<style lang="scss">
	.moeny-record {
		display: flex;
		flex-direction: column;
		height: 100vh;

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
			.account-record{
				flex: auto;
				overflow-y: auto;
					scrollbar-width: none;
			}
			.year-text {
				padding: 16rpx 32rpx;
				color: #999;
				font-size: 26rpx;
				font-style: normal;
				font-weight: 500;
				line-height: 32rpx;
				/* 123.077% */
				background: #F2F2F2;
			}

			.month-text {
				padding: 24rpx 32rpx;
				border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;

				.value {
					color: #333;
					font-size: 32rpx;
					font-style: normal;
					font-weight: 500;
					line-height: 36rpx;
					/* 114.286% */
				}

				.length {
					color: #C53455;
					font-size: 28rpx;
					font-style: normal;
					font-weight: 500;
					line-height: 32rpx;
					.arrow {
						margin-left: 6rpx;
						width: 24rpx;
						height: 24rpx;
						transform: rotate(-90deg);
						&.show {
							transform: rotate(90deg);
						}
					}
					/* 114.286% */
				}
			}

			.account-record-day {
				padding: 24rpx 32rpx 0;
				background-color: #F2F2F2;
				color: #999;
				font-size: 24rpx;
				font-style: normal;
				font-weight: 500;
				line-height: 36rpx;
				overflow-y: auto;
					
				&:last-child {
					padding-bottom: 16rpx;
					.border{
						display: none
					}
				}

				/* 150% */
				.date {
					font-size: 28rpx;
				}

				.recordType {
					margin-left: 18rpx;
					color: #333;
					font-size: 28rpx;
				}

				.recipient {
					margin-top: 4rpx;
				}

				.moneyTypeText {
					color: #333;
					font-size: 22rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 36rpx;
					/* 163.636% */
				}

				.value {
					margin-left: 8rpx;
					color: #333;
					font-size: 32rpx;
					letter-spacing: 1rpx;
				}
				.border {
					margin-top: 16rpx;
					height: 1px;
					width: 100%;
					background-color: rgba(0, 0, 0, 0.06);
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