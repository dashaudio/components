import 'webcomponents.js'

export { DashButton } from './button/button'
export { DashButtonGroup } from './button/group/group'
export { DashBox } from './box/box'
export { DashBoxSimple } from './box/simple/simple'
export { DashToolbar } from './toolbar/toolbar'
export { DashLabel } from './label/label'
export { DashSpacer } from './spacer/spacer'
export { DashIcon } from './icon/icon'
export { DashWrapper } from './wrapper/wrapper'
export { DashNote } from './note/note'
export { DashDivider } from './divider/divider'
export { DashPager } from './pager/pager'
export { DashSparkline } from './sparkline/sparkline'
export { DashTrend } from './trend/trend'
export { DashNotification } from './notification/notification'
export { DashChecklistItem } from './checklist-item/checklist-item'

// TODO: Revisit these components
// export { DashAnalyticsSummary } from './analytics/summary/summary'
// export { DashAnalyticsSummaryPlays } from './analytics/summary/plays/plays'
// export { DashAnalyticsSummaryListeners } from './analytics/summary/listeners/listeners'
// export { DashAnalyticsSummaryInstalls } from './analytics/summary/installs/installs'

window.addEventListener('WebComponentsReady', () => {
  Array.from(document.querySelectorAll('.dash-unresolved')).forEach((item) => {
    item.className = item.className.replace('dash-unresolved', 'dash-resolved')
  })
})
