export const loginAccount = {
	'account': 'wl1994923',
	'pwd': 'Aa258258'
}
// 我的账户信息
export const myAccountInfo = {
	'hk': {
		typeText: '港元储蓄',
		type: '港元',
		name: '港元储蓄账户',
		accountNumber: '012-581-2-053983-7',
		balance: '213',
		decimal: '22',
		userName: 'TANG UAA'
	}
}
// 我的账户列表
export const myAccountList = [{
		name: '港元储蓄账户',
		accountNumber: '012-581-2-053983-7', // 账号
		moneyTypeText: '港元',
		money: '213.22', // 余额
		userName: 'TANG UAA',
		id: 'HKD'
	},
	{
		name: '外汇宝账户',
		accountNumber: '012-581-2-053984-0', // 账号
		moneyTypeText: '美元',
		money: '5.00', // 余额
		userName: 'TANG UAA',
		id: 'USD',
	},
]
// 最近收款人列表
export const recentAccountList = [{
		name: 'ZHU HUAMOU',
		accountNumber: '117296483'
	},
	{
		name: 'FANG TINGYU',
		accountNumber: '117392621'
	},
]
// 已登记收款人列表
export const registrationAccountList = [{
		name: 'ZHU HUAMOU',
		accountNumber: '117296483'
	},
	{
		name: 'FANG TINGYU',
		accountNumber: '117392621'
	},
]
// 主页我的账户最近交易记录
export const recentRecord = [
	{
		date: '2024/09/05',
		recordType: '转账交易',
		accountNumber: '1224093242342',
		text1: 'FPS/FAN',
		text2: 'D********/',
		money: '- 港元 177,300',
		decimal: '00'
		
	}
]





// 汇率转换 USD-HKD 美元转-港币
export const currencyExChange = {
	'USD-HKD': {
		text: '1 美元 = 7.78340 港元',
		value: '7.78340'
	},
	'HKD-USD': {
		text: '1 美元 = 7.78340 港元',
		value: '7.78340'
	}
}

export const currencyList = [{
		name: '美元',
		id: 'USD'
	},
	{
		name: '人民币',
		id: 'CNY'
	},
	{
		name: '英镑',
		id: 'GBP'
	},
	{
		name: '日圆',
		id: 'JPY'
	},
	{
		name: '澳元',
		id: 'AUD'
	},
	{
		name: '纽元',
		id: 'NZD'
	},
	{
		name: '加元',
		id: 'CAD'
	},
	{
		name: '欧罗',
		id: 'EUR'
	},
	{
		name: '瑞士法郎',
		id: 'CHF'
	},
	{
		name: '丹麦克朗',
		id: 'DKK'
	},
	{
		name: '挪威克朗',
		id: 'NOK'
	},
	{
		name: '瑞典克朗',
		id: 'SEK'
	},
	{
		name: '新加坡元',
		id: 'SGD'
	},
	{
		name: '泰国铢',
		id: 'THB'
	},
	{
		name: '文莱元',
		id: 'BND'
	},
	{
		name: '南非兰特',
		id: 'ZAR'
	}
]
export const currencyExchangeList = [{
		name: '港元',
		id: 'HKD'
	},
	{
		name: '美元',
		id: 'USD'
	},
	{
		name: '人民币(离岸)',
		id: 'CNY'
	},
	{
		name: '英镑',
		id: 'GBP'
	},
	{
		name: '日圆',
		id: 'JPY'
	},
	{
		name: '澳元',
		id: 'AUD'
	},
	{
		name: '纽元',
		id: 'NZD'
	},
	{
		name: '加元',
		id: 'CAD'
	},
	{
		name: '欧罗',
		id: 'EUR'
	},
	{
		name: '瑞士法郎',
		id: 'CHF'
	},
	{
		name: '丹麦克朗',
		id: 'DKK'
	},
	{
		name: '挪威克朗',
		id: 'NOK'
	},
	{
		name: '瑞典克朗',
		id: 'SEK'
	},
	{
		name: '新加坡元',
		id: 'SGD'
	},
	{
		name: '泰国铢',
		id: 'THB'
	},
	{
		name: '文莱元',
		id: 'BND'
	},
	{
		name: '南非兰特',
		id: 'ZAR'
	}
]

export const bankList = [{
		name: '中国银行（香港）有限公司',
		id: '012'
	},
	{
		name: '渣打银行（香港）有限公司',
		id: '003'
	}, {
		name: '香港上海汇丰银行有限公司',
		id: '004'
	}, {
		name: '法国东方汇理银行',
		id: '005'
	}, {
		name: '花旗银行香港分行',
		id: '006'
	}, {
		name: '摩根大通银行',
		id: '007'
	}, {
		name: '国民西敏寺资本市场银行有限公司',
		id: '008'
	}, {
		name: '中国建设银行（亚洲）股份有限公司',
		id: '009'
	}, {
		name: '东亚银行有限公司',
		id: '015'
	}, {
		name: '星展银行（香港）有限公司',
		id: '016'
	}, {
		name: '中信银行（国际）有限公司',
		id: '018'
	}, {
		name: '招商永隆银行有限公司',
		id: '020'
	}, {
		name: 'OVERSEA - CHINESE BANKINGCORPORATION LIMITED',
		id: '022'
	}, {
		name: '恒生银行有限公司',
		id: '024'
	}, {
		name: '上海商业银行有限公司',
		id: '025'
	}, {
		name: '交通银行银行股份有限公司 香港分行',
		id: '027'
	}, {
		name: '大众银行（香港）有限公司',
		id: '028'
	}, {
		name: '星展银行（香港）有限公司',
		id: '032'
	}, {
		name: '华侨银行（香港）有限公司',
		id: '035'
	}, {
		name: '大有银行有限公司',
		id: '038'
	}, {
		name: '集友银行有限公司',
		id: '039'
	}, {
		name: '大新银行有限公司',
		id: '040'
	}, {
		name: '创兴银行有限公司',
		id: '041'
	}, {
		name: '南洋商业银行有限公司',
		id: '043'
	}, {
		name: '华侨银行（香港）有限公司',
		id: '044'
	}, {
		name: 'UCO BANK HONG KONG',
		id: '045'
	}, {
		name: 'KEB Hana Bank',
		id: '046'
	}, {
		name: '三菱UFJ银行',
		id: '047'
	}, {
		name: '222',
		id: '049'
	}, {
		name: '222',
		id: '050'
	}, {
		name: '222',
		id: '012'
	}, {
		name: '222',
		id: '012'
	}, {
		name: '222',
		id: '012'
	}, {
		name: '222',
		id: '012'
	}, {
		name: '222',
		id: '012'
	}, {
		name: '222',
		id: '012'
	}, {
		name: '222',
		id: '012'
	},
]

export const record = [{
	date: '2025年',
	type: 'year',
	data: [{
		date: '3月',
		type: 'month',
		data: [{
				date: '22/03',
				type: 'day',
				recordType: '转账交易',
				recipient: 'FPS/ZHU H**',
				accountNumber: 'M**/12250322F5555564827',
				moneyTypeText: '港元',
				value: '- 2,105.00'
			},
			{
				date: '22/03',
				type: 'day',
				recordType: '自动柜员机转账交易',
				accountNumber: 'ATM TRF',
				moneyTypeText: '港元',
				value: '2,091.00'
			}, {
				date: '22/03',
				type: 'day',
				recordType: '转账交易',
				recipient: 'FPS/ZHU H**',
				accountNumber: 'M**/12250322F5555564827',
				moneyTypeText: '港元',
				value: '- 2,105.00'
			},
			{
				date: '22/03',
				type: 'day',
				recordType: '自动柜员机转账交易',
				accountNumber: 'ATM TRF',
				moneyTypeText: '港元',
				value: '2,091.00'
			}, {
				date: '22/03',
				type: 'day',
				recordType: '转账交易',
				recipient: 'FPS/ZHU H**',
				accountNumber: 'M**/12250322F5555564827',
				moneyTypeText: '港元',
				value: '- 2,105.00'
			},
			{
				date: '22/03',
				type: 'day',
				recordType: '自动柜员机转账交易',
				accountNumber: 'ATM TRF',
				moneyTypeText: '港元',
				value: '2,091.00'
			}, {
				date: '22/03',
				type: 'day',
				recordType: '转账交易',
				recipient: 'FPS/ZHU H**',
				accountNumber: 'M**/12250322F5555564827',
				moneyTypeText: '港元',
				value: '- 2,105.00'
			},
			{
				date: '22/03',
				type: 'day',
				recordType: '自动柜员机转账交易',
				accountNumber: 'ATM TRF',
				moneyTypeText: '港元',
				value: '2,091.00'
			}, {
				date: '22/03',
				type: 'day',
				recordType: '转账交易',
				recipient: 'FPS/ZHU H**',
				accountNumber: 'M**/12250322F5555564827',
				moneyTypeText: '港元',
				value: '- 2,105.00'
			},
			{
				date: '22/03',
				type: 'day',
				recordType: '自动柜员机转账交易',
				accountNumber: 'ATM TRF',
				moneyTypeText: '港元',
				value: '2,091.00'
			}, {
				date: '22/03',
				type: 'day',
				recordType: '转账交易',
				recipient: 'FPS/ZHU H**',
				accountNumber: 'M**/12250322F5555564827',
				moneyTypeText: '港元',
				value: '- 2,105.00'
			},
			{
				date: '22/03',
				type: 'day',
				recordType: '自动柜员机转账交易',
				accountNumber: 'ATM TRF',
				moneyTypeText: '港元',
				value: '2,091.00'
			}, {
				date: '22/03',
				type: 'day',
				recordType: '转账交易',
				recipient: 'FPS/ZHU H**',
				accountNumber: 'M**/12250322F5555564827',
				moneyTypeText: '港元',
				value: '- 2,105.00'
			},
			{
				date: '22/03',
				type: 'day',
				recordType: '自动柜员机转账交易',
				accountNumber: 'ATM TRF',
				moneyTypeText: '港元',
				value: '2,091.00'
			}, {
				date: '22/03',
				type: 'day',
				recordType: '转账交易',
				recipient: 'FPS/ZHU H**',
				accountNumber: 'M**/12250322F5555564827',
				moneyTypeText: '港元',
				value: '- 2,105.00'
			},
			{
				date: '22/03',
				type: 'day',
				recordType: '自动柜员机转账交易',
				accountNumber: 'ATM TRF',
				moneyTypeText: '港元',
				value: '2,091.00'
			}, {
				date: '22/03',
				type: 'day',
				recordType: '转账交易',
				recipient: 'FPS/ZHU H**',
				accountNumber: 'M**/12250322F5555564827',
				moneyTypeText: '港元',
				value: '- 2,105.00'
			},
			{
				date: '22/03',
				type: 'day',
				recordType: '自动柜员机转账交易',
				accountNumber: 'ATM TRF',
				moneyTypeText: '港元',
				value: '2,091.00'
			}, {
				date: '22/03',
				type: 'day',
				recordType: '转账交易',
				recipient: 'FPS/ZHU H**',
				accountNumber: 'M**/12250322F5555564827',
				moneyTypeText: '港元',
				value: '- 2,105.00'
			},
			{
				date: '22/03',
				type: 'day',
				recordType: '自动柜员机转账交易',
				accountNumber: 'ATM TRF',
				moneyTypeText: '港元',
				value: '2,091.00'
			}, {
				date: '22/03',
				type: 'day',
				recordType: '转账交易',
				recipient: 'FPS/ZHU H**',
				accountNumber: 'M**/12250322F5555564827',
				moneyTypeText: '港元',
				value: '- 2,105.00'
			},
			{
				date: '22/03',
				type: 'day',
				recordType: '自动柜员机转账交易',
				accountNumber: 'ATM TRF',
				moneyTypeText: '港元',
				value: '2,091.00'
			}, {
				date: '22/03',
				type: 'day',
				recordType: '转账交易',
				recipient: 'FPS/ZHU H**',
				accountNumber: 'M**/12250322F5555564827',
				moneyTypeText: '港元',
				value: '- 2,105.00'
			},
			{
				date: '22/03',
				type: 'day',
				recordType: '自动柜员机转账交易',
				accountNumber: 'ATM TRF',
				moneyTypeText: '港元',
				value: '2,091.00'
			}, {
				date: '22/03',
				type: 'day',
				recordType: '转账交易',
				recipient: 'FPS/ZHU H**',
				accountNumber: 'M**/12250322F5555564827',
				moneyTypeText: '港元',
				value: '- 2,105.00'
			},
			{
				date: '22/03',
				type: 'day',
				recordType: '自动柜员机转账交易',
				accountNumber: 'ATM TRF',
				moneyTypeText: '港元',
				value: '2,091.00'
			}, {
				date: '22/03',
				type: 'day',
				recordType: '转账交易',
				recipient: 'FPS/ZHU H**',
				accountNumber: 'M**/12250322F5555564827',
				moneyTypeText: '港元',
				value: '- 2,105.00'
			},
			{
				date: '22/03',
				type: 'day',
				recordType: '自动柜员机转账交易',
				accountNumber: 'ATM TRF',
				moneyTypeText: '港元',
				value: '2,091.00'
			}, {
				date: '22/03',
				type: 'day',
				recordType: '转账交易',
				recipient: 'FPS/ZHU H**',
				accountNumber: 'M**/12250322F5555564827',
				moneyTypeText: '港元',
				value: '- 2,105.00'
			},
			{
				date: '22/03',
				type: 'day',
				recordType: '自动柜员机转账交易',
				accountNumber: 'ATM TRF',
				moneyTypeText: '港元',
				value: '2,091.00'
			},
		]
	}, {
		date: '4月',
		type: 'month',
		data: [

		]
	}]
}]