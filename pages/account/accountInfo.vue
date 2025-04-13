<template>
	<view class="account-page">
		<uni-nav-bar title="储蓄账户" :style="{paddingTop: statusBarHeight + 'px', flex: 'none'}">
			<template #left>
				<view class="nav-left">
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
		
		</view>
	</view>
</template>

<script>
	import {
		myAccountInfo,
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
			}
		},
		methods: {
			

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