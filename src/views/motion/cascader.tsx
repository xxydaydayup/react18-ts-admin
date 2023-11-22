import { Cascader } from 'antd'
import React, { useEffect, useState } from 'react'

const { SHOW_CHILD } = Cascader

const defaultSelectedOptions = [
    ['130000', '130100', '130101'],
    ['130000', '130100', '130102']
    // ['13000', '130100', '130101']
]

const optionLists = [
    {
        gbPid: '0',
        id: '130000',
        name: '河北省',
        isLeaf: false,
        children: [
            {
                gbPid: '130000',
                id: '130100',
                name: '石家庄市',
                isLeaf: false,
                children: [
                    {
                        gbPid: '130100',
                        id: '130101',
                        name: '市辖区'
                    },
                    {
                        gbPid: '130100',
                        id: '130102',
                        name: '长安区'
                    },
                    {
                        gbPid: '130100',
                        id: '130103',
                        name: '桥东区'
                    },
                    {
                        gbPid: '130100',
                        id: '130104',
                        name: '桥西区'
                    },
                    {
                        gbPid: '130100',
                        id: '130105',
                        name: '新华区'
                    },
                    {
                        gbPid: '130100',
                        id: '130107',
                        name: '井陉矿区'
                    },
                    {
                        gbPid: '130100',
                        id: '130108',
                        name: '裕华区'
                    },
                    {
                        gbPid: '130100',
                        id: '130121',
                        name: '井陉县'
                    },
                    {
                        gbPid: '130100',
                        id: '130123',
                        name: '正定县'
                    },
                    {
                        gbPid: '130100',
                        id: '130124',
                        name: '栾城县'
                    },
                    {
                        gbPid: '130100',
                        id: '130125',
                        name: '行唐县'
                    },
                    {
                        gbPid: '130100',
                        id: '130126',
                        name: '灵寿县'
                    },
                    {
                        gbPid: '130100',
                        id: '130127',
                        name: '高邑县'
                    },
                    {
                        gbPid: '130100',
                        id: '130128',
                        name: '深泽县'
                    },
                    {
                        gbPid: '130100',
                        id: '130129',
                        name: '赞皇县'
                    },
                    {
                        gbPid: '130100',
                        id: '130130',
                        name: '无极县'
                    },
                    {
                        gbPid: '130100',
                        id: '130131',
                        name: '平山县'
                    },
                    {
                        gbPid: '130100',
                        id: '130132',
                        name: '元氏县'
                    },
                    {
                        gbPid: '130100',
                        id: '130133',
                        name: '赵县'
                    },
                    {
                        gbPid: '130100',
                        id: '130181',
                        name: '辛集市'
                    },
                    {
                        gbPid: '130100',
                        id: '130182',
                        name: '藁城市'
                    },
                    {
                        gbPid: '130100',
                        id: '130183',
                        name: '晋州市'
                    },
                    {
                        gbPid: '130100',
                        id: '130184',
                        name: '新乐市'
                    },
                    {
                        gbPid: '130100',
                        id: '130185',
                        name: '鹿泉市'
                    }
                ]
            },
            {
                gbPid: '130000',
                id: '130200',
                name: '唐山市'
            },
            {
                gbPid: '130000',
                id: '130300',
                name: '秦皇岛市'
            },
            {
                gbPid: '130000',
                id: '130400',
                name: '邯郸市'
            },
            {
                gbPid: '130000',
                id: '130500',
                name: '邢台市'
            },
            {
                gbPid: '130000',
                id: '130600',
                name: '保定市'
            },
            {
                gbPid: '130000',
                id: '130700',
                name: '张家口市'
            },
            {
                gbPid: '130000',
                id: '130800',
                name: '承德市'
            },
            {
                gbPid: '130000',
                id: '130900',
                name: '沧州市'
            },
            {
                gbPid: '130000',
                id: '131000',
                name: '廊坊市'
            },
            {
                gbPid: '130000',
                id: '131100',
                name: '衡水市'
            }
        ]
    },
    {
        gbPid: '0',
        id: '210000',
        name: '辽宁省',
        isLeaf: false
    },
    {
        gbPid: '0',
        id: '360000',
        name: '江西省',
        isLeaf: false
    },
    {
        gbPid: '0',
        id: '410000',
        name: '河南省',
        isLeaf: false
    },
    {
        gbPid: '0',
        id: '420000',
        name: '湖北省',
        isLeaf: false
    }
]

const shiData = [
    {
        gbPid: '130000',
        id: '130100',
        name: '石家庄市',
        isLeaf: false
    },
    {
        gbPid: '130000',
        id: '130200',
        name: '唐山市'
    },
    {
        gbPid: '130000',
        id: '130300',
        name: '秦皇岛市'
    },
    {
        gbPid: '130000',
        id: '130400',
        name: '邯郸市'
    },
    {
        gbPid: '130000',
        id: '130500',
        name: '邢台市'
    },
    {
        gbPid: '130000',
        id: '130600',
        name: '保定市'
    },
    {
        gbPid: '130000',
        id: '130700',
        name: '张家口市'
    },
    {
        gbPid: '130000',
        id: '130800',
        name: '承德市'
    },
    {
        gbPid: '130000',
        id: '130900',
        name: '沧州市'
    },
    {
        gbPid: '130000',
        id: '131000',
        name: '廊坊市'
    },
    {
        gbPid: '130000',
        id: '131100',
        name: '衡水市'
    }
]

const quData = [
    {
        gbPid: '130100',
        id: '130101',
        name: '市辖区'
    },
    {
        gbPid: '130100',
        id: '130102',
        name: '长安区'
    },
    {
        gbPid: '130100',
        id: '130103',
        name: '桥东区'
    },
    {
        gbPid: '130100',
        id: '130104',
        name: '桥西区'
    },
    {
        gbPid: '130100',
        id: '130105',
        name: '新华区'
    },
    {
        gbPid: '130100',
        id: '130107',
        name: '井陉矿区'
    },
    {
        gbPid: '130100',
        id: '130108',
        name: '裕华区'
    },
    {
        gbPid: '130100',
        id: '130121',
        name: '井陉县'
    },
    {
        gbPid: '130100',
        id: '130123',
        name: '正定县'
    },
    {
        gbPid: '130100',
        id: '130124',
        name: '栾城县'
    },
    {
        gbPid: '130100',
        id: '130125',
        name: '行唐县'
    },
    {
        gbPid: '130100',
        id: '130126',
        name: '灵寿县'
    },
    {
        gbPid: '130100',
        id: '130127',
        name: '高邑县'
    },
    {
        gbPid: '130100',
        id: '130128',
        name: '深泽县'
    },
    {
        gbPid: '130100',
        id: '130129',
        name: '赞皇县'
    },
    {
        gbPid: '130100',
        id: '130130',
        name: '无极县'
    },
    {
        gbPid: '130100',
        id: '130131',
        name: '平山县'
    },
    {
        gbPid: '130100',
        id: '130132',
        name: '元氏县'
    },
    {
        gbPid: '130100',
        id: '130133',
        name: '赵县'
    },
    {
        gbPid: '130100',
        id: '130181',
        name: '辛集市'
    },
    {
        gbPid: '130100',
        id: '130182',
        name: '藁城市'
    },
    {
        gbPid: '130100',
        id: '130183',
        name: '晋州市'
    },
    {
        gbPid: '130100',
        id: '130184',
        name: '新乐市'
    },
    {
        gbPid: '130100',
        id: '130185',
        name: '鹿泉市'
    }
]
const CascaderDemo = () => {
    const [options, setOptions] = useState(optionLists)
    const onChange = (value: any, selectedOptions: any) => {
        console.log(value, selectedOptions)
    }
    const loadData = (selectedOptions: any) => {
        console.log(selectedOptions, 'loaddata')
        // selectedOptions代表已勾选项组成的数组，末位项为最新勾选项
        const targetOption = selectedOptions[selectedOptions.length - 1]

        const level = selectedOptions.length
        targetOption.loading = true

        // load options lazily
        setTimeout(() => {
            console.log(targetOption.id)

            switch (level) {
                case 0:
                    targetOption.children = optionLists
                    setOptions([...options])
                    break
                case 1:
                    if (targetOption.id === '130000') {
                        targetOption.children = shiData
                    }
                    setOptions([...options])
                    break
                case 2:
                    if (targetOption.id === '130100') {
                        targetOption.children = quData
                    }
                    setOptions([...options])
                    break
            }
        }, 1000)
    }

    return (
        <Cascader
            options={options}
            fieldNames={{ label: 'name', value: 'id' }}
            loadData={loadData}
            onChange={onChange}
            changeOnSelect
            defaultValue={defaultSelectedOptions}
            // showCheckedStrategy={SHOW_CHILD}
        />
    )
}
export default CascaderDemo
