<template>
	<view class="exchange-page">
		<uni-nav-bar :border="false" :style="{paddingTop: statusBarHeight + 'px', flex: 'none'}">
			<template #left>
				<view class="nav-left" @click="goBack()">
					<image src="@/static/back.png" mode="widthFix"></image>
				</view>
			</template>
			<template #right>
				<view class="nav-right">
					<image src="@/static/kefu.png" mode="widthFix"></image>
				</view>
			</template>
		</uni-nav-bar>
		<view class="content">
			<view class="option-title flex-align-center" @click="handleShowType">
				<text>我要</text>
				<view class="exchange-type flex-align-center">
					<view class="border"></view>
					<text>
						{{exchangeType === 'buy' ? '买入' : '卖出'}}
					</text>
					<image class="arrow-icon" src="@/static/arrow-top.png" mode="widthFix"></image>
				</view>
			</view>
			<view style="padding: 0 32rpx 120rpx;margin-top: 38rpx;min-height:280rpx">
				<uni-forms-item name="setValue">
					<uni-easyinput type="digit"  @input="handleSetInput" @blur="handleIptBlur('setValue')" placeholder="0.00" :clearable="false"
						v-model="setValue">
						<template #left>
							<view class="input-place flex-align-center" @click="handleCuurncyClick('set')">
								<text>{{setCurrencyInfo.name || '货币'}}</text>
								<image class="arrow-icon" src="@/static/arrow-top.png" mode="widthFix"></image>
							</view>
						</template>
					</uni-easyinput>
				</uni-forms-item>
				<view class="same" v-if="isAccountSame && currencyShowType === 'set'">* 请选择不同货币</view>
				<view class="same" v-if="false">* 所选择的货币没有可用的账户</view>
				<view class="buy-tips1" v-if="exchangeType === 'buy' && !disabled">此金额于确认时将随汇率变动。</view>
				<view class="account-type">
					{{setAccountInfo.name}}
				</view>
				<view class="account-number">
					{{setAccountInfo.accountNumber}}
				</view>
				<view class="account-info-text flex-between" v-if="exchangeType === 'sell' && setCurrencyInfo.name">
					<text>可用余额：{{setCurrencyInfo.name}} {{ isShowMyMoney ? setAccountInfo.money : '********'}}</text>
					<text class="showText"
						@click="isShowMyMoney = !isShowMyMoney">{{isShowMyMoney ? '隐藏' : '显示'}}</text>
				</view>
			</view>
			<view class="sub-content">
				<view class="exachange-compute" v-if="!disabled">
					{{buyComputed.text}}
				</view>
				<view class="option-title flex-align-center">
					<text>{{exchangeType === 'buy' ? '支付' : '收取'}}</text>
				</view>
				<view style="padding: 0 32rpx;margin-top: 30rpx;">
					<uni-forms-item name="getValue">
						<uni-easyinput type="digit" @input="handleGetInput" @blur="handleIptBlur('getValue')" placeholder="0.00"
							:clearable="false" v-model="getValue">
							<template #left>
								<view class="input-place flex-align-center" @click="handleCuurncyClick('get')">
									<text>{{getCurrencyInfo.name || '货币'}}</text>
									<image class="arrow-icon" src="@/static/arrow-top.png" mode="widthFix"></image>
								</view>
							</template>
						</uni-easyinput>
					</uni-forms-item>
					<view class="same" v-if="isAccountSame && currencyShowType === 'get'">* 请选择不同货币</view>
						<view class="same" v-if="false">* 所选择的货币没有可用的账户</view>
					<!-- <view class="buy-tips1" v-if="exchangeType === 'sell'">此金额于确认时将随汇率变动。</view> -->
					<view class="account-type">
						{{getAccountInfo.name}}
					</view>
					<view class="account-number">
						{{getAccountInfo.accountNumber}}
					</view>
					<view class="account-info-text flex-between" v-if="exchangeType === 'buy' && getCurrencyInfo.name">
						<text>可用余额：{{getCurrencyInfo.name}}
							{{ isShowMyMoney ? getAccountInfo.money : '********'}}</text>
						<text class="showText"
							@click="isShowMyMoney = !isShowMyMoney">{{isShowMyMoney ? '隐藏' : '显示'}}</text>
					</view>
				</view>
				<!-- <view class="remark">备注</view> -->
				<view class="choose-submit" :class="{disabled: disabled}" @click="handleSubmit">
					继续
				</view>
			</view>
		</view>
		<uni-popup ref="changePopup">
			<view class="account-pop bank"
				:style="{marginTop: (statusBarHeight || 30) + 'px',minHeight: `${statusBarHeight || 30}px`}">
				<view class="my-account-head flex-between">
					<image src="@/static/close-icon.png" mode="aspectFit" @click="handleCloseChange">
					</image>
				</view>
				<view class="my-account-title">兑换货币</view>
				<view class="popup-tips1">我要</view>
				<view class="exchange-list flex-align-center">
					<view class="exchange-item" @click="handleChange('buy')">
						<image src="@/static/close-icon.png" mode="aspectFit"></image>
						<view>买入</view>
					</view>
					<view class="exchange-item" @click="handleChange('sell')">
						<image src="@/static/close-icon.png" mode="aspectFit"></image>
						<view>卖出</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="currencyPopup">
			<view class="account-pop currency"
				:style="{marginTop: (statusBarHeight || 30) + 'px',height: `calc(100vh - ${statusBarHeight || 30}px)`}">
				<view class="my-account-head flex-between">
					<image src="@/static/close-icon.png" mode="aspectFit" @click="handleClosePop('currencyPopup')">
					</image>
				</view>
				<view class="my-account-title">货币选择</view>
				<view class="search-module">
					<image src="@/static/search-icon.png" mode="aspectFit"></image>
					<text>请输入货币名称或货币代号，如：港元/HKD</text>
				</view>
				<view class="currency-list">
					<view class="currency-item" v-for="(item, index) in currencyExchangeList" :key="index"
						@click="handleCurrencyClick(index)">
						<view class="currency-item-name">{{item.name}}({{item.id}})</view>
					</view>
				</view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import {
		myAccountList,
		currencyExchangeList,
		currencyExChange,
	} from '../../data/data.js'
	import { convertCurrency, convertCurrenc } from '../../utils/util.js'
	export default {
		onLoad() {
			const app = getApp()
			this.statusBarHeight = app.statusBarHeight
		},
		computed: {
			buyComputed() {
				return currencyExChange[`${this.setCurrencyInfo.id}-${this.getCurrencyInfo.id}`]
			}
		},
		data() {
			return {
				currencyExchangeList,
				disabled: true,
				isShowMyMoney: true,
				exchangeType: 'buy',
				setValue: '',
				getValue: '',
				isAccountSame: false,
				setAccountInfo: {
					// name: '港元储蓄账户',
					// accountNumber: '012-581-2-053983-7', // 账号
					// moneyTypeText: '港元',
					// money: '213.22', // 余额
					// userName: 'TANG UAA',
					// id: 'HKD'
				},
				setCurrencyInfo: {
					// name: '港元',
					// id: 'HKD'
				},
				getAccountInfo: {
					// name: '外汇宝账户',
					// accountNumber: '012-581-2-053984-0', // 账号
					// moneyTypeText: '美元',
					// money: '5.00', // 余额
					// userName: 'TANG UAA',
					// id: 'USD'
				},
				getCurrencyInfo: {
					// name: '美元',
					// id: 'USA'
				},
				currencyShowType: 'type', // type / set /get

			}
		},

		watch: {
			setValue(newValue) {
				this.disabled = !(newValue && this.getValue)
			},
			getValue(newValue) {
				this.disabled = !(newValue && this.setValue)
			},
		},
		mounted() {
			this.handleShowAccount('changePopup')
		},

		methods: {
			goBack() {
				uni.navigateBack()
			},
			handleSetInput(value){
				let currencyInfo = currencyExChange[`${this.setCurrencyInfo.id}-${this.getCurrencyInfo.id}`]
				// console.log('convertCurrency(value, currencyInfo.value)', convertCurrency(value, currencyInfo.value))
				this.getValue = convertCurrenc(value, currencyInfo.value, this.setCurrencyInfo.id !== 'USD')
			},
			handleGetInput(value){
				let currencyInfo = currencyExChange[`${this.setCurrencyInfo.id}-${this.getCurrencyInfo.id}`]
				this.setValue = convertCurrenc(value, currencyInfo.value, this.setCurrencyInfo.id === 'USD')
			},
			handleCuurncyClick(type) {
				this.currencyShowType = type
				this.handleShowAccount('currencyPopup')
			},
			handleShowType() {
				this.currencyShowType = 'type'
				this.handleShowAccount('changePopup')
			},
			handleSetClick() {
				this.handleShowAccount('currencyPopup')
			},
			handleSubmit() {
				if(this.disabled) return

				localStorage.setItem('exchangeInfo', JSON.stringify({
					setAccountInfo: {
						...this.setAccountInfo,
					},
					getAccountInfo: {
						...this.getAccountInfo,
					},
					setCurrencyInfo: {
						...this.setCurrencyInfo,
					},
					getCurrencyInfo: {
						...this.getCurrencyInfo,
					},
					setValue: this.setValue,
					getValue: this.getValue,
					rateText: this.buyComputed.text,
					type: this.exchangeType === 'buy' ? '买入' : '卖出',
					type2: this.exchangeType === 'buy' ? '付出' : '收取',
				}))
				uni.navigateTo({
					url: '/pages/account/exchangeConfirm'
				})

			},
			handleCloseChange() {
				if (!this.setCurrencyInfo.name) {
					this.goBack()
					return
				}
				this.handleClosePop('changePopup')
			},
			handleCurrencyClick(index) {
				if (this.currencyShowType === 'set') {
					this.setCurrencyInfo = {
						...currencyExchangeList[index]
					}
					if (this.setCurrencyInfo.id !== 'HKD') {
						this.setAccountInfo = {
							...myAccountList[1],
							name: `${myAccountList[1].name}-${this.setCurrencyInfo.name}`
						}
					} else {
						this.setAccountInfo = {
							...myAccountList[0]
						}
					}

					if (!this.getAccountInfo.name) {
						if (this.setCurrencyInfo.id === 'HKD') {
							this.getAccountInfo = {
								...myAccountList[1],
								name: `${myAccountList[1].name}-${myAccountList[1].moneyTypeText}`
							}
							this.getCurrencyInfo = {
								...currencyExchangeList[1]
							}
						} else {
							this.getAccountInfo = {
								...myAccountList[0],
							}
							this.getCurrencyInfo = {
								...currencyExchangeList[0]
							}
						}
					}
				} else {
					this.getCurrencyInfo = {
						...currencyExchangeList[index]
					}
					if (this.getCurrencyInfo.id !== 'HKD') {
						this.getAccountInfo = {
							...myAccountList[1],
							name: `${myAccountList[1].name}-${this.getCurrencyInfo.name}`
						}
					} else {

					}

				}
				this.isAccountSame = this.setCurrencyInfo.id === this.getCurrencyInfo.id

				this.handleClosePop('changePopup')
				this.handleClosePop('currencyPopup')
			},
			handleIptBlur(varText) {
				let [integer, decimal] = this[varText].split('.')
				if (!decimal) {
					this[varText] = this[varText] + '.00'
					return
				} else if (decimal && decimal.length === 1) {
					this[varText] = integer + '.' + decimal + '0'
					return
				} else if (decimal && decimal.length > 2) {
					this[varText] = integer + '.' + decimal.substr(0, 2)
					return
				}
			},
			handleShowAccount(type, posi) {
				this.$refs[type].open(posi || 'bottom')

			},
			handleClosePop(type) {
				this.$refs[type].close()
			},
			handleChange(type) {
				this.exchangeType = type
				this.currencyShowType = 'set'
				if (type === 'buy' && !this.setCurrencyInfo.name) {

					this.handleShowAccount('currencyPopup')
					return

				}

				if (type === 'sell' && !this.getCurrencyInfo.name) {

					this.handleShowAccount('currencyPopup')
					return

				}
				this.handleClosePop('changePopup')
			}
		}
	}
</script>

<style lang="scss">
	.exchange-page {
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
			border-bottom-color: rgba(0, 0, 0, 0.4) !important;
		}

		.uni-forms-item {
			margin-bottom: 10rpx !important;
		}
		.remark {
			padding: 84rpx 32rpx 0;
			color: #5F325D;
			font-size: 26rpx;
			font-style: normal;
			font-weight: 400;
			line-height: 32rpx;
		}

		.same {
			margin: 14rpx 0 12rpx;
			color: #5F325D;
			font-size: 26rpx;
			font-style: normal;
			font-weight: 400;
			line-height: 32rpx;
		}

		.account-pop {
			display: flex;
			flex-direction: column;
			background-color: #fff;
			border-radius: 40rpx 40rpx 0 0;
			padding-top: 48rpx;
			box-sizing: border-box;

			&.currency {
				width: 100vw;
				display: flex;
				flex-direction: column;
			}

			.currency-list {
				flex: auto;
				overflow-y: auto;
				scrollbar-width: none;

				.currency-item {
					padding: 32rpx 0;
					color: #333;
					font-size: 28rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 32rpx;
					border-bottom: 1px solid #DEDEDE;

					&:last-child {
						border: none
					}
				}
			}

			.search-module {
				flex: none;
				padding: 4rpx 16rpx;
				margin: 30rpx 0;
				display: flex;
				align-items: center;
				height: 56rpx;
				border-radius: 12rpx;
				border: 2rpx solid #DEDEDE;
				background: #FFF;

				image {
					margin-right: 16rpx;
					width: 44rpx;
					height: 44rpx;
				}

				text {
					color: #999;
					font-size: 24rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 32rpx;
				}
			}


		}

		.content {
			padding-top: 32rpx;
			display: flex;
			flex-direction: column;
			flex: auto;
			overflow-y: hidden;

			.choose-submit {

				margin: auto 32rpx 40rpx;
				display: flex;
				height: 96rpx;
				justify-content: center;
				align-items: center;
				gap: 16rpx;
				flex-shrink: 0;
				border-radius: 10000px;
				background: #C53455;
				color: #fff;
				border: none;

				&.disabled {
					background-color: #EBEBEB;
				}
			}

			.sub-content {
				position: relative;
				display: flex;
				flex-direction: column;
				padding-top: 120rpx;
				flex: auto;
				background-color: #F8F8F8;

				.exachange-compute {
					display: flex;
					align-items: center;
					padding: 0 32rpx;
					position: absolute;
					top: -40rpx;
					left: 50%;
					transform: translateX(-50%);
					height: 70rpx;
					color: #333;
					font-size: 26rpx;
					letter-spacing: 1rpx;
					;
					background-color: #fff;
					border: 1px solid #ddd;
					border-radius: 323rpx;

				}
			}

			.showText {
				color: #5F325D;
				font-size: 24rpx;
			}

			.buy-tips1 {
				color: #888;
				font-size: 24rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 32rpx;
				margin-top: 6rpx;
				letter-spacing: 1rpx;
				margin-bottom: 12rpx;
			}

			.account-info-text {
				color: #333;
				font-size: 24rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 32rpx;
				margin-top: 16rpx;
			}

			.account-number {
				color: #666;
				font-size: 24rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 32rpx;
				margin-top: 6rpx;
			}

			.account-type {
				color: #333;
				font-size: 28rpx;
				line-height: 36rpx;
			}

			.arrow-icon {
				width: 32rpx;
				height: 32rpx;
				transform: rotate(180deg);
				margin-left: 10rpx;
			}

			.exchange-type {
				position: relative;
				margin-left: 16rpx;
				font-weight: 600;

				.border {
					left: 0;
					right: 0;
					position: absolute;
					bottom: -6rpx;
					border-bottom: 1px dashed #888;
				}

			}

			.option-title {
				padding: 0 32rpx;
				color: #333;
				font-size: 46rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 56rpx;
				/* 140% */
				letter-spacing: 6rpx;
			}

			.is-input-border {
				border: none !important;
				border-bottom: 2rpx solid #DEDEDE !important;
				border-radius: 0 !important;
				padding: 0 !important;

				&.is-focused {
					border-bottom: 2rpx solid #000 !important;

				}
			}

			.input-place {
				color: #000;
				font-size: 44rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 56rpx;

			}

			.uni-easyinput__content,
			.uni-easyinput__content-input {
				height: 110rpx;
				background-color: transparent !important;
			}

			.uni-input-input {
				padding-bottom: 20rpx;
				text-align: right;
				font-size: 84rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 84rpx;
				/* 100% */
			}

			.uni-input-placeholder {
				text-align: right;
				font-size: 84rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 84rpx;
				color: #666;
			}
		}

		.account-pop {
			display: flex;
			flex-direction: column;
			background-color: #fff;
			border-radius: 40rpx 40rpx 0 0;
			padding: 48rpx 32rpx;
			box-sizing: border-box;

			.exchange-list {
				margin-top: 24rpx;
				gap: 32rpx;

				.exchange-item {
					padding: 32rpx 168rpx 48rpx 32rpx;
					color: #333;
					font-size: 30rpx;
					line-height: 34rpx;
					border: 1px solid #999;
					border-radius: 32rpx;

					image {
						width: 36rpx;
						height: 36rpx;
						margin-bottom: 12rpx;
					}
				}
			}

			.my-account-head {
				flex: none;

				image {
					width: 48rpx;
					height: 48rpx;
				}
			}

			.my-account-title {
				flex: none;
				margin-top: 32rpx;
				color: #333;
				font-size: 40rpx;
				font-style: normal;
				font-weight: bold;
				line-height: 50rpx;
			}

			.popup-tips1 {
				margin-top: 36rpx;
				color: #333;
				font-size: 28rpx;
				line-height: 30rpx;
			}

		}
	}
</style>