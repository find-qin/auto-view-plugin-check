
import useRecord from './useRecord'
import useProxyReport from './useProxyReport'

function createViewPluginCheck(): ViewPlugin {

    const record = useRecord();

    const proxyReport = useProxyReport(record.dom2Check)

    return {
        create: proxyReport.onCreate,
        update: record.onElemUpdate
    }
}

export default createViewPluginCheck