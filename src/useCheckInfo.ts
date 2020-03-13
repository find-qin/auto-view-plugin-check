
import { createModAction, createAddAction, reverseActions, runActions } from './actionUtils'
import { createTag, updateTagData } from './tag'

export function createCheckInfo(elem: HTMLElement): CheckInfo {

    let actions: CheckAction[] = []

    // Step1. 获取 elem 插入的父元素
    let parent = elem
    if (elem instanceof HTMLImageElement || elem instanceof HTMLInputElement) {
        parent = elem.parentElement as HTMLElement
    }
    // Step2. 设置父元素的 position
    if (getComputedStyle(parent).position === 'static') {
        actions.push(createModAction(parent, 'style.position', 'static', 'relative'))
    }
    // Step3. 添加元素
    let tagElem: HTMLElement|null = null
    if (parent === elem) {
        tagElem = createTag()
    } else {
        let top = elem.offsetTop + elem.offsetHeight
        let left = elem.offsetLeft + elem.offsetWidth
        tagElem = createTag(left, top)
    }
    actions.push(createAddAction(tagElem, parent))

    // Step4. 数据绑定代理，自动渲染
    let data = {
        _mv: 0,
        _mc: 0,
        get mv() {
            return this._mv
        },
        set mv(value) {
            this._mv = value
            updateTagData(tagElem as HTMLElement, data)
        },
        get mc() {
            return this._mc
        },
        set mc(value) {
            this._mc = value
            updateTagData(tagElem as HTMLElement, data)
        }
    }

    runActions(actions)

    return {
        actions,
        data,
        tagElem,
    }
}

export function removeCheckInfo(elem: HTMLElement, checkInfo: CheckInfo) {

    const operateActions = reverseActions(checkInfo.actions)
    runActions(operateActions)

}