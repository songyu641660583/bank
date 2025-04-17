<template>
	<view class="choose-account">
		<loadingComponent v-if="loading"></loadingComponent>
		<uni-nav-bar left-width="52rpx" right-width="52rpx" :border="false"
			:style="{paddingTop: statusBarHeight + 'px', flex:'none'}">
			<template #left>
				<view class="nav-left" @click="goBack()">
					<image src="@/static/back.png" mode="widthFix"></image>
				</view>
			</template>
			<template #default>
				<view class="nav-step">
					<view class="active"></view>
					<view></view>
					<view></view>
				</view>
			</template>
			<template #right>
				<view class="nav-right">
					<image src="@/static/kefu.png" mode="widthFix"></image>
				</view>
			</template>
		</uni-nav-bar>
		<view class="content">
			<view class="title">
				转账/转数快
			</view>
			<view class="title2">选择账户</view>
			<view class="tips1">
				<view class="qr-code">
					<image src="@/static/saomiao.png" mode="aspectFit"></image>
					<text>二维码转账</text>
				</view>
			</view>
			<view class="get-account account-item">
				<view class="account-item-name">提款账户</view>
				<view class="account-item-info">
					<view class="account-top flex-between" @click="handleShowAccount('popup')">
						<view>
							<view class="account-info-type">{{myAccount.name || '选择提款账户'}}</view>
							<view class="account-info-number">{{myAccount.accountNumber}}</view>
						</view>
						<image src="@/static/right-arrow2.png" mode="aspectFit"></image>
					</view>
					<view class="account-info-text flex-between">
						<text>可用余额：</text>
						<text class="showText" @click="handleShowMyMoney">{{isShowMyMoney ? '隐藏' : '显示'}}</text>
					</view>
					<view class="account-info-text">{{myAccount.moneyTypeText}}
						{{ isShowMyMoney ? myAccount.money : '********'}}
					</view>
				</view>
			</view>

			<view class="get-account account-item">
				<view class="account-item-name">收款人/账户</view>
				<view class="account-item-info">
					<view class="account-top flex-between" @click="handleShowAccount('putPopup')">
						<view>
							<view class="account-info-type">{{putAccount.name || '选择收款人'}}<text
									v-if="putAccount.name && putAccount.moneyTypeText">-{{putAccount.moneyTypeText}}</text>
							</view>
							<view class="account-info-type" v-if="putAccount.bank">{{putAccount.bank}}</view>
							<view class="account-info-number">{{putAccount.accountNumber}}</view>
						</view>
						<image src="@/static/right-arrow2.png" mode="aspectFit"></image>

					</view>
				</view>
			</view>

			<view class="choose-submit" :class="{disabled: disabled}" @click="handleSubmit">
				继续
			</view>
			<view class="tips2">注意事项 | 预计收款日期及收费</view>
		</view>
		<uni-popup ref="popup">
			<view class="account-pop" :style="{height: `calc(100vh - ${statusBarHeight || 30}px)`}">
				<view class="my-account-head flex-between">
					<image src="@/static/close-icon.png" mode="aspectFit" @click="handleClosePop('popup')"></image>
					<text @click="handleShowMyListMoney">{{ isShowMyListMoney ? '隐藏余额' : '显示余额'}}</text>
				</view>
				<view class="my-account-title">提款账户</view>
				<view class="my-account-list">
					<view class="my-account-item" :class="{active: myAccountIndex === index}"
						v-for="(item, index) in myAccountList" :key="index" @click="handleMyAccountListClick(index)">
						<view class="my-account-type">{{item.name}}</view>
						<view class="my-account-number">{{item.accountNumber}}</view>
						<view class="my-account-text">可用余额：{{item.moneyTypeText}}
							{{ isShowMyListMoney ? item.money : '********'}}
						</view>
						<image class="checked" src="@/static/right-circle.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</uni-popup>


		<uni-popup ref="putPopup">
			<view class="account-pop" :style="{height: `calc(100vh - ${statusBarHeight || 30}px)`}">
				<view class="my-account-head flex-between">
					<image src="@/static/close-icon.png" mode="aspectFit" @click="handleClosePop('putPopup')"></image>
				</view>
				<view class="tabList">
					<view class="tabList-item" :class="{active:index === tabIndex}" v-for="(item,index) in putTabList"
						:key="index" @click="tabIndex = index">
						<view class="value">{{item.name}}</view>
					</view>
				</view>
				<!-- 账户号码 -->
				<view class="formData" v-if="tabIndex === 1">
					<view style="position: relative;">
						<view style="position: absolute;width: 100%;height: 100%;z-index: 10;"
							@click="handleShowAccount('bankPopup')"></view>
						<uni-forms-item name="bank">
							<view class="input-top-label" :style="{'opacity': formData.bank ? 1 : 0 }">收款银行/机构</view>
							<uni-easyinput ref="bankInput" disabled :clearable="false" @blur="handleBlur('bank')"
								@focus="handleFocus('bank')" type="text" v-model="formData.bank"
								placeholder-class="custom-placeholder">
								<template #left>
									<view class="input-place" v-if="!formData.bank">收款银行/机构</view>
								</template>
								<template #right>
									<image style="margin-top: -20rpx;" class="checked" src="@/static/right-arrow2.png"
										mode="aspectFit"></image>
								</template>
							</uni-easyinput>
						</uni-forms-item>
					</view>

					<uni-forms-item name="account">
						<view class="input-top-label"
							:style="{'opacity': (accountFocus || formData.accountNumber) ? 1: 0 }">
							收款账户号码</view>
						<uni-easyinput ref="accountInput" :clearable="false" @blur="handleBlur('account')"
							@focus="handleFocus('account')" type="text" v-model="formData.accountNumber"
							placeholder-class="custom-placeholder">
							<template #left>
								<view class="input-place" v-if="!formData.accountNumber && !accountFocus">收款账户号码</view>
							</template>
						</uni-easyinput>
					</uni-forms-item>
					<uni-forms-item name="name">
						<view class="input-top-label" :style="{'opacity': (formData.name || nameFocus) ? 1: 0 }">收款人名称
						</view>
						<uni-easyinput ref="nameInput" :clearable="false" @blur="handleBlur('name')"
							@focus="handleFocus('name')" type="text" v-model="formData.name">
							<template #left>
								<view class="input-place" v-if="!formData.name && !nameFocus">收款人名称</view>
							</template>
						</uni-easyinput>
					</uni-forms-item>
					<view class="tab2-tips">
						请输入收款人于收款银行记录上的名称。
					</view>
					<view class="bank-submit" :class="{disabled: bankDisabled}" @click="handleBankSubmit">
						继续
					</view>
				</view>
				<!-- 我的账户 -->
				<view v-if="tabIndex === 2">
					<view class="tab2-title">我的账户 (2)</view>
					<view class="put-account-list">
						<view class="put-account-item" v-for="(item, index) in myAccountList" :key="index"
							@click="handlePutMyAccountItemClick(index)">
							<view class="put-account-item-in">
								<image src="@/static/user-blue.png" mode="aspectFit"></image>
								<view class="put-account-item-info">
									<view class="put-account-item-name">{{item.name}}</view>
									<view class="put-account-item-number">{{item.accountNumber}}</view>
								</view>
								<image v-if="index === 1" class="right-arrow" src="@/static/right-arrow2.png"
									mode="aspectFit"></image>
							</view>
						</view>
					</view>
					<view class="tab2-gray"></view>
				</view>
				<!-- 联络人 -->
				<view v-if="tabIndex === 0">
					<view class="search-module">
						<uni-easyinput :clearable="false" :input-border="false" type="text" v-model="concatKeywords"
							placeholder-class="custom-placeholder" placeholder="账户号码/姓名/电话号码/电邮地址/FPS ID">
							<template #left>
								<image src="@/static/search-icon.png" mode="aspectFit"></image>
							</template>
						</uni-easyinput>
					</view>
					<view class="put-account-title">最近收款人</view>
					<view class="put-account-list">
						<view class="put-account-item" v-for="(item, index) in recentAccountList" :key="index"
							@click="handlePutItemRecentClick(index)">
							<view class="put-account-item-in">
								<image src="@/static/put-icon.png" mode="aspectFit"></image>
								<view class="put-account-item-info">
									<view class="put-account-item-name">{{item.name}}</view>
									<view class="put-account-item-number">{{item.accountNumber}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="put-account-title">已登记收款人({{registrationAccountList.length}})</view>
					<view class="put-account-list">
						<view class="put-account-item" v-for="(item, index) in registrationAccountList" :key="index"
							@click="handlePutItemClick(index)">
							<view class="put-account-item-in">
								<image src="@/static/put-icon.png" mode="aspectFit"></image>
								<view class="put-account-item-info">
									<view class="put-account-item-name">{{item.name}}</view>
									<view class="put-account-item-number">{{item.accountNumber}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="address-book">
						<view class="address-tips1">我们想存取您的通讯录</view>
						<view class="address-tips2">启用后您可转账至通讯录内的联络人。</view>
						<view class="address-options">

							<image src="@/static/tongxunlu-icon.png" mode="aspectFit"></image>
							<text>启用通讯录</text>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>


		<uni-popup ref="currencyPopup">
			<view class="account-pop currency"
				:style="{marginTop: (statusBarHeight || 30) + 'px',height: `calc(100vh - ${statusBarHeight || 30}px)`}">
				<view class="my-account-head flex-between">
					<image src="@/static/back.png" mode="aspectFit" @click="handleClosePop('currencyPopup')"></image>
				</view>
				<view class="my-account-title">货币选择</view>
				<view class="search-module">
					<!-- <image src="@/static/search-icon.png" mode="aspectFit"></image>
					<text>请输入货币名称或货币代号，如：港元/HKD</text> -->
					<uni-easyinput :clearable="false" :input-border="false" type="text" v-model="currencyKeywords"
						placeholder-class="custom-placeholder" placeholder="请输入货币名称或货币代号，如：港元/HKD">
						<template #left>
							<image src="@/static/search-icon.png" mode="aspectFit"></image>
						</template>
					</uni-easyinput>
				</view>
				<view class="currency-list">
					<view class="currency-item" v-for="(item, index) in currencyList" :key="index"
						@click="handleCurrencyClick(index)">
						<view class="currency-item-name">{{item.name}}({{item.id}})</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="bankPopup">
			<view class="account-pop bank"
				:style="{marginTop: (statusBarHeight || 30) + 'px',height: `calc(100vh - ${statusBarHeight || 30}px)`}">
				<view class="my-account-head flex-between">
					<image src="@/static/back.png" mode="aspectFit" @click="handleClosePop('bankPopup')"></image>
				</view>
				<view class="my-account-title">收款银行/机构</view>
				<view class="search-module">
					<uni-easyinput :clearable="false" :input-border="false" type="text" v-model="bankKeywords"
						placeholder-class="custom-placeholder" placeholder="搜寻银行编号/名称">
						<template #left>
							<image src="@/static/search-icon.png" mode="aspectFit"></image>
						</template>
					</uni-easyinput>
				</view>
				<view class="currency-list">
					<view class="currency-item" v-for="(item, index) in bankList" :key="index"
						@click="handleBankClick(index)">
						<view class="currency-item-name">{{item.id}} {{item.name}}</view>
					</view>
				</view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import loadingComponent from '../../components/loading.vue'
	import {
		myAccountList,
		recentAccountList,
		registrationAccountList,
		currencyList,
		bankList,
	} from '../../data/data.js'
	export default {
		components: {
			loadingComponent

		},
		onLoad() {
			const app = getApp()
			this.statusBarHeight = app.statusBarHeight
		},
		data() {
			return {
				bankKeywords: '',
				currencyKeywords: '',
				concatKeywords: '',

				loading: true,
				disabled: true,
				isShowMyMoney: false,
				myAccount: {
					name: '',
					accountNumber: '',
					moneyTypeText: '',
					money: ''
				},
				putAccount: {
					name: '',
					accountNumber: '',
					bank: ''
				},
				isShowMyListMoney: false,
				myAccountIndex: 0,
				myAccountList,
				recentAccountList,
				registrationAccountList,
				currencyList,
				bankList,
				tabIndex: 0,
				putTabList: [{
						name: '联络人'
					},
					{
						name: '账户号码'
					},
					{
						name: '我的账户'
					},
				],
				accountFocus: false,
				nameFocus: false,
				bankFocus: false,
				formData: {
					accountNumber: '',
					name: '',
					bank: ''
				},
				bankDisabled: true
			}
		},
		watch: {
			myAccount(newValue) {
				this.disabled = !(newValue.name && this.putAccount.name)
			},
			putAccount(newValue) {
				this.disabled = !(newValue.name && this.myAccount.name)
			},
			'formData': {
				handler(newValue, oldValue) {
					this.bankDisabled = !(newValue.name && newValue.bank && newValue.accountNumber)
				},
				deep: true
			}
		},
		mounted() {
			setTimeout(() => {
				this.loading = false
			}, 1500)
			this.handleMyAccountListClick(0)
		},

		methods: {
			goBack() {
				uni.navigateBack()
			},
			handleBlur(type) {
				if (type === 'account') {
					this.accountFocus = false
				} else if (type === 'name') {
					this.nameFocus = false
				} else if (type === 'bank') {
					this.bankFocus = false
				}
			},
			handleFocus(type) {
				if (type === 'account') {
					this.accountFocus = true
				} else if (type === 'name') {
					this.nameFocus = true
				} else if (type === 'bank') {
					setTimeout(() => {
						this.bankFocus = true
					}, 500)
				}
			},
			handleMyAccountListClick(index) {
				this.myAccountIndex = index
				this.myAccount = this.myAccountList[index]
				this.handleClosePop('popup')

			},
			handleShowAccount(type, posi) {
				this.$refs[type].open(posi || 'bottom')

			},
			handleClosePop(type) {
				this.$refs[type].close()
			},
			handleShowMyListMoney() {
				this.isShowMyListMoney = !this.isShowMyListMoney
			},

			handleShowMyMoney() {
				this.isShowMyMoney = !this.isShowMyMoney

			},
			handleSubmit() {
				if (this.disabled) return
				// 存到本地账户信息
				uni.setStorage({
					key: 'payerAccount',
					data: JSON.stringify({
						...this.myAccount
					})
				});
				uni.setStorage({
					key: 'payeeAccount',
					data: JSON.stringify({
						...this.putAccount
					})
				});
				
				uni.navigateTo({
					url: '/pages/account/writeMoney'
				})
			},
			handlePutItemRecentClick(index) {
				this.putAccount = recentAccountList[index]
				this.handleClosePop('putPopup')
			},
			handlePutItemClick(index) {
				this.putAccount = registrationAccountList[index]
				this.handleClosePop('putPopup')
			},
			handlePutMyAccountItemClick(index) {
				this.putAccount = {
					...myAccountList[index],
					moneyTypeText: ''
				}
				if (index === 1) {
					this.handleShowCurrency(index)
				} else {
					this.handleClosePop('putPopup')
				}
			},
			handleCurrencyClick(index) {
				this.putAccount['moneyTypeText'] = currencyList[index].name
				this.handleClosePop('putPopup')
				this.handleClosePop('currencyPopup')
			},
			handleShowCurrency(index) {
				this.handleShowAccount('currencyPopup', 'right')
			},
			handleBankClick(index) {
				this.formData.bank = bankList[index].id + ' ' + bankList[index].name
				this.handleClosePop('bankPopup')
			},
			handleBankSubmit() {
				this.putAccount = {
					...this.formData
				}
				this.handleClosePop('putPopup')

			}
		}
	}
</script>

<style lang="scss">
	.choose-account {
		height: 100vh;
		display: flex;
		flex-direction: column;

		.account-pop {
			display: flex;
			flex-direction: column;
			background-color: #fff;
			border-radius: 40rpx 40rpx 0 0;
			padding-top: 48rpx;
			box-sizing: border-box;

			.formData {
				flex: auto;
				display: flex;
				flex-direction: column;
				padding: 0 32rpx;

				image {
					width: 48rpx;
					height: 48rpx;
				}
			}

			.uni-forms-item {
				margin-top: 20rpx;
			}

			.bank-submit {
				margin-top: auto;
				margin-bottom: 60rpx;
				display: flex;
				width: 100%;
				height: 76rpx;
				justify-content: center;
				align-items: center;
				gap: 16rpx;
				flex-shrink: 0;
				border-radius: 10000px;
				background: #C53455;
				color: #fff !important;
				border: none;

				&.disabled {
					background-color: #EBEBEB;
					color: #828282;
				}
			}

			.tab2-tips {
				color: #999;
				font-size: 28rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 36rpx;
				/* 145.455% */
			}

			.input-top-label {
				color: #888;
				font-size: 26rpx;
				font-style: normal;
				font-weight: 400;
			}

			.input-place {
				position: absolute;
				color: #888;
				font-size: 28rpx;
				font-style: normal;
				font-weight: 400;
				z-index: 0;
			}

			.is-input-border {
				border: none !important;
				border-bottom: 2rpx solid #DEDEDE !important;
				border-radius: 0 !important;
				padding: 0 !important;

				&.is-focused {
					border-bottom: 4rpx solid #000 !important;

				}
			}

			.is-disabled {
				background-color: #fff !important;


			}

			.uni-input-input {
				color: #333;
				font-size: 28rpx;
				letter-spacing: 1rpx;
			}

			.is-focused .content-clear-icon {
				color: rgb(192, 196, 204) !important;
			}

			.uni-easyinput__content-input {
				padding-left: 0 !important;
				width: 100%;
				position: relative;
				z-index: 2 !important;

			}

			.custom-placeholder {
				color: red;
				font-size: 52rpx !important;
			}


			&.currency,
			&.bank {
				width: 100vw;
				display: flex;
				flex-direction: column;
			}

			.currency-list {
				padding: 0 32rpx;
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
				}
			}


			.tab2-gray {
				width: 100%;
				height: 20rpx;
				background-color: #dedede;
			}

			.tab2-title {
				padding: 0 32rpx;
				color: #666;
				font-size: 26rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 36rpx;
			}

			.address-book {
				margin: 32rpx;
				padding: 32rpx;
				border-radius: 16rpx;
				background: #F2F2F2;

				.address-tips1 {
					color: #333;
					font-size: 28rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 36rpx;
					/* 128.571% */
				}

				.address-tips2 {
					margin: 18rpx 0;
					color: #999;
					font-size: 22rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 36rpx;
					/* 163.636% */
				}

				.address-options {
					display: flex;
					align-items: center;
					color: #5F325D;
					font-size: 22rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 36rpx;

					image {
						margin-right: 16rpx;
						width: 40rpx;
						height: 44rpx;
					}
				}
			}


			.search-module {
				overflow: hidden;
				flex: none;
				padding: 4rpx 16rpx;
				margin: 30rpx 30rpx;
				display: flex;
				align-items: center;
				height: 56rpx;
				border-radius: 12rpx;
				border: 2rpx solid #DEDEDE;
				background: #FFF;

				.uni-easyinput__content-input {
					padding-left: 0rpx;
				}

				image {
					margin-right: 16rpx;
					width: 44rpx;
					height: 44rpx;
				}

				text {
					color: #999;
					font-size: 26rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 32rpx;
				}
			}

			.put-account-item {
				background-color: #fff;
				padding: 22rpx 32rpx 0;

				&-in {
					padding-bottom: 16rpx;
					display: flex;
					align-items: center;
					border-bottom: 1px solid #DEDEDE;
				}

				image {
					margin-right: 32rpx;
					width: 60rpx;
					height: 60rpx;
				}

				.right-arrow {
					margin-left: auto;
					width: 48rpx;
					height: 48rpx;
				}

				&-name {
					margin-top: 6rpx;
					color: #333;
					font-size: 28rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 32rpx;
				}

				&-number {
					color: #999;
					font-size: 22rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 36rpx;
					/* 145.455% */
				}
			}

			.tabList {
				margin-top: 32rpx;

				padding: 0rpx 32rpx;
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
					margin-right: 56rpx;
					position: relative;
					color: #787878;
					font-size: 28rpx;
					font-style: normal;
					font-weight: bold;
					line-height: 28rpx;


					/* 128.571% */
					&::after {
						content: ' ';
						position: absolute;
						bottom: 18rpx;
						width: 100%;
						height: 4rpx;
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
						font-style: normal;
						font-weight: 500;

						/* 122.222% */
						&::after {
							display: block;
						}
					}
				}
			}

			.put-account-title {
				padding: 16rpx 32rpx;
				background-color: #F8F8F8;
				color: #666;
				font-size: 26rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 32rpx;
				/* 123.077% */
			}

			.my-account-head {
				flex: none;
				padding: 0 32rpx;
				color: #5F325D;
				font-size: 24rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 32rpx;

				image {
					width: 48rpx;
					height: 48rpx;
				}
			}

			.my-account-title {
				flex: none;
				margin-top: 20rpx;
				padding: 0 32rpx;
				color: #333;
				font-size: 40rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 50rpx;
			}

			.my-account-item {
				position: relative;
				margin-bottom: 20rpx;
				padding: 24rpx 16rpx 0 32rpx;
				color: #666;
				font-size: 24rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 32rpx;

				.checked {
					right: 32rpx;
					top: 50%;
					position: absolute;
					width: 44rpx;
					height: 44rpx;
					margin-top: -22rpx;
					display: none;
				}

				&.active {
					background-color: #F2F2F2;

					.checked {
						display: block;
					}
				}

				.my-account-type {
					color: #333;
					font-size: 30rpx;
				}

				.my-account-number {
					margin-top: 8rpx;
					letter-spacing: 1rpx;
				}

				.my-account-text {
					margin-top: 14rpx;
					padding-bottom: 26rpx;
					border-bottom: 1px solid #F2F2F2;
				}
			}
		}

		.uni-navbar__header-container {
			flex: auto;
		}

		.nav-left,
		.nav-right {
			image {
				width: 48rpx;
			}
		}

		.nav-step {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 16rpx;

			view {
				flex: 1;
				height: 4rpx;
				border-radius: 7px;
				background: #D8D8D8;

				&.active {
					background-color: #C53455;
				}
			}
		}

		.content {
			flex: auto;
			display: flex;
			flex-direction: column;
			padding: 0 32rpx 60rpx;
		}

		.showText {
			color: #5F325D;
		}

		.title {
			margin-top: 32rpx;
			color: #666;
			font-size: 24rpx;
			font-style: normal;
			font-weight: 500;
			line-height: 32rpx;
			/* 133.333% */
		}

		.title2 {
			margin-top: 8rpx;
			color: #666;
			font-size: 48rpx;
			font-style: normal;
			font-weight: 300;
			line-height: 56rpx;
			/* 116.667% */
		}

		.qr-code {
			margin-top: 32rpx;
			display: flex;
			align-items: center;
			color: #5F325D;
			font-size: 24rpx;
			font-style: normal;
			font-weight: 500;
			line-height: 32rpx;

			/* 133.333% */
			image {
				margin-right: 16rpx;
				width: 30rpx;
				height: 30rpx;
			}
		}

		.account-item {
			margin-top: 48rpx;
			display: flex;

			&-name {
				flex: none;
				margin-right: 80rpx;
				width: 110rpx;
				color: #666;
				font-size: 26rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 36rpx;
				/* 123.077% */

			}

			&-info {
				flex: auto;
				color: #666;
				font-size: 24rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 32rpx;

				/* 133.333% */
				.account-top {
					position: relative;
					min-height: 48rpx;
					padding-bottom: 14rpx;
					border-bottom: 1px solid #DEDEDE;

					image {
						width: 48rpx;
						height: 48rpx;
						flex: none;
						margin-left: 10rpx;
					}
				}

				.account-info-number {
					margin-top: 6rpx;
					letter-spacing: 1rpx;
				}

				.account-info-type {
					color: #333;
					font-size: 28rpx;
					letter-spacing: 1rpx;
					line-height: 36rpx;
				}

				.account-info-text {
					margin-top: 16rpx;
				}
			}
		}

		.choose-submit {

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

			&.disabled {
				background-color: #EBEBEB;
				color: #828282;
			}
		}

		.tips2 {
			margin-top: 48rpx;
			color: #5F325D;
			text-align: center;
			font-feature-settings: 'liga' off, 'clig' off;
			font-family: "HarmonyOS Sans SC";
			font-size: 24rpx;
			font-style: normal;
			font-weight: 500;
			line-height: 32rpx;
			/* 133.333% */
		}

		.error-tips {
			margin-top: 50rpx;
			font-size: 26rpx;
			font-style: normal;
			font-weight: 400;
			line-height: 32rpx;
			/* 133.333% */
			color: #C53455;
		}
	}
</style>