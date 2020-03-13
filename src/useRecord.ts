
import { createCheckInfo, removeCheckInfo } from './useCheckInfo'

export default function useRecord() {

    enum RecordUpdateOption {
        ADD,
        REMOVE,
    }

    const dom2Check = new Map<HTMLElement, CheckInfo>()

    ;(window as any).dom2Check = dom2Check

    /**
     * 添加元素
     * @param elem 文档元素
     */
    const onAddElem = function(elem: HTMLElement) {
        const checkInfo = createCheckInfo(elem)
        dom2Check.set(elem, checkInfo)
    }

    /**
     * 删除元素
     * @param elem 文档元素
     */
    const onDelElem = function(elem: HTMLElement) {
        if (dom2Check.has(elem)) {
            removeCheckInfo(elem, dom2Check.get(elem) as CheckInfo)
            dom2Check.delete(elem)
        }
        
    }

    const onElemUpdate: RecordElemChangeCb = function(elem, idx, option) {
        if (option === RecordUpdateOption.ADD) {
            onAddElem(elem)
        } 
        else if (option === RecordUpdateOption.REMOVE) {
            onDelElem(elem)
        }
    }
    return {
        dom2Check,
        onElemUpdate,
    };
}