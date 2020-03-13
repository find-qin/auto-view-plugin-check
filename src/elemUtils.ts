
/**
 * 设置元素的属性值
 * @param elem 文档中元素
 * @param attr 元素属性名
 * @param val  设置属性值
 */
export function setElemAttr(elem: HTMLElement, attr: string, val: string) {
    let temp: any = elem
    let attrs: string[] = attr.split('.')
    for (let i = 0; i < attrs.length - 1; i++) {
        temp = temp[attrs[i]]
    }
    if (attrs.length) {
        temp[attrs.pop() as string] = val
    }
}
