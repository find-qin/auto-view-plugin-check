
declare type ElemReportFun = (vid: string, vdata: any, elem?: HTMLElement) => any

declare type IgnoreRuleFun = (elem: HTMLElement) => boolean

declare type RecordElemChangeCb = (elem: HTMLElement, idx: number, option: RecordUpdateOption) => any

enum RecordUpdateOption {
    ADD,
    REMOVE,
}

declare type AutoViewInit = {
    onElemView: ElemReportFun,
    onElemClick: ElemReportFun,
    ignores?: IgnoreRuleFun,
    rootElement?: HTMLElement,
    plugins?: ViewPlugin[],
    devMode?: boolean,
}

declare interface ViewPlugin {
    create: (options: AutoViewInit) => void,
    update: RecordElemChangeCb
}

declare interface CheckViewPlugin extends ViewPlugin {
    displayWithData: () => void
}

enum ACTIONTYPE {
    ADD,
    DEL,
    MOD,
}

declare type ModDetail = {
    attr: string,
    oldVal: string,
    newVal: string,
}

declare type CheckAction = {
    type: ACTIONTYPE,
    elem: HTMLElement,
    parent?: HTMLElement,
    info?: ModDetail,
} 

declare type CheckData = {
    mv: number,
    mc: number,
}

declare type CheckInfo = {
    actions: CheckAction[],
    data: CheckData,
    tagElem: HTMLElement,
}

enum DIGIT {
    K = 1000,
    M = 1000000,
    T = 1000000000,
}

