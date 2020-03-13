
enum DIGIT {
    K = 1000,
    M = 1000000,
    T = 1000000000,
}

/**
 * 创建展示 mv/mc 标签
 */
export function createTag(left?: number, top?: number): HTMLElement {
    let tagElem = document.createElement('div')
    tagElem.style.position = 'absolute'
    tagElem.style.width = '40px'
    tagElem.style.height = '24px'
    if (typeof left === 'number' && typeof top === 'number') {
        // 行内元素不能添加子元素，根据父元素重新计算位置
        tagElem.style.left = (left - 40) + 'px'
        tagElem.style.top = (top - 24) + 'px'
    } else {
        tagElem.style.bottom = tagElem.style.right = '0'
    }
    tagElem.innerHTML = `
    <div auto-view-check-v><i>V</i><i>0</i></div>
    <div auto-view-check-c><i>C</i><i>0</i></div>
    <style>
        div[auto-view-check-v], div[auto-view-check-c] {
            display: flex;
            justify-content: space-between;
            padding: 0 2px;
            width: 40px; height: 12px;
            box-sizing: border-box;
            color: white; 
            text-align: right;
            font-size: 12px;
            line-height: 12px;
        }
        div[auto-view-check-v] {
            background: rgba(81,161,236,0.5);
        }
        div[auto-view-check-c] {
            background: rgba(255,143,55,0.5);
        }
    </style>
    `

    return tagElem
}

/**
 * 更新标签中的 mv/mc 值
 * @param tagElem 标签元素
 * @param checkData 标签数据
 */
export function updateTagData(tagElem: HTMLElement, checkData: CheckData) {
    ;(tagElem.children[0].children[1] as HTMLElement).innerText = transData(checkData.mv)
    ;(tagElem.children[1].children[1] as HTMLElement).innerText = transData(checkData.mc)
}

/**
 * 
 * @param value 标签数据展示
 * - < 1,000 无单位
 * - 1,000 - 1,000,000 K
 * - 1,000,000 - 1,000,000,000 M
 * > 1,000,000,000 T
 */
export function transData(value: number) {
    const getFixedValue = (value: number, unit: string) => {
        if (value < 10) {
            return value.toFixed(1) + unit
        }
        return Math.floor(value) + unit
    }
    if (value < DIGIT.K) {
        return String(value);
    }
    else if (value < DIGIT.M) {
        return getFixedValue(value / DIGIT.K, 'K')
    }
    else if (value < DIGIT.T) {
        return getFixedValue(value / DIGIT.M, 'M')
    }
    else {
        return getFixedValue(value / DIGIT.T, 'T')
    }
}