
/**
 * auto-view 创建时代理 onElemView 以及 onElemClick
 * @param dom2Check 监听 dom 2 checkInfo 信息
 */
export default function useProxyReport(dom2Check: Map<HTMLElement, CheckInfo>) {
    const onCreate = (createInit: AutoViewInit) => {
        const originOnElemView = createInit.onElemView
        const originOnElemClick = createInit.onElemClick
        // Proxy onElemView
        createInit.onElemView = function(vid, vdata, elem) {
            if (elem) {
                const checkInfo = dom2Check.get(elem)
                const { data } = checkInfo || {}
                data && (data.mv += 1)
            }
            originOnElemView(vid, vdata, elem)
        }
        // Proxy onElemClick
        createInit.onElemClick = function(vid, vdata, elem) {
            if (elem) {
                const checkInfo = dom2Check.get(elem)
                const { data } = checkInfo || {}
                data && (data.mc += 1)
            }
            originOnElemClick(vid, vdata, elem)
        }
    }

    return {
        onCreate
    }
}