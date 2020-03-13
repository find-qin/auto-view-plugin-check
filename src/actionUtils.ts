
import { setElemAttr } from './elemUtils'

enum ACTIONTYPE {
    ADD,
    DEL,
    MOD,
}

/**
 * 翻转单个行为
 * @param action 单个行为
 */
export function reverseAction(action: CheckAction) {
    let resAction: any = {}
    const { type, info } = action
    switch (type) {
        case ACTIONTYPE.ADD:
            resAction.type = ACTIONTYPE.DEL
            break
        case ACTIONTYPE.DEL:
            resAction.type = ACTIONTYPE.ADD
            break
        case ACTIONTYPE.MOD:
            info && ([info.newVal, info.oldVal] = [info.oldVal, info.newVal])
            break
        default:
            break
    }
    return resAction
}

/**
 * 翻转行为序列
 * @param actions 行为序列
 */
export function reverseActions(actions: CheckAction[]) {
    return actions.map(action => reverseAction(action)).reverse()
}

/**
 * 执行行为
 * @param action 单个行为
 */
export function runAction(action: CheckAction) {
    const { elem, parent }= action
    switch(action.type) {
        case ACTIONTYPE.ADD:
            parent && parent.appendChild(action.elem)
            break
        case ACTIONTYPE.DEL:
            parent && parent.removeChild(action.elem)
            break
        case ACTIONTYPE.MOD:
            const { attr, newVal } = action.info || {}
            attr && setElemAttr(elem, attr, newVal as string)
        default:
            break
    }
}

/**
 * 执行行为序列
 * @param actions 行为序列
 */
export function runActions(actions: CheckAction[]) {
    actions.forEach(action => runAction(action))
}

/**
 * 创建修改行为
 * @param elem 
 * @param attr 
 * @param oldVal 
 * @param newVal 
 */
export function createModAction(elem: HTMLElement, attr: string, oldVal: string, newVal: string) {
    return {
        type: ACTIONTYPE.MOD,
        elem: elem,
        info: {
            attr,
            oldVal,
            newVal,
        }
    }
}

/**
 * 创建新增行为
 * @param elem 
 * @param parent 
 */
export function createAddAction(elem: HTMLElement, parent: HTMLElement): CheckAction {
    return {
        type: ACTIONTYPE.ADD,
        elem,
        parent
    }
}