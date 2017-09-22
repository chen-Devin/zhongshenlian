import Vue from 'vue';
import VueRouter from 'vue-router';

// 通用
import businessCompleteList from './commonUse/businessCompleteList.vue';
import businessCompleteDetail from './commonUse/businessCompleteDetail.vue';
import ruleRegulation from './commonUse/ruleRegulation.vue';
import ruleRegulationDetail from './commonUse/ruleRegulationDetail.vue';
import ruleRegulationEdit from './commonUse/ruleRegulationEdit.vue';
import ruleRegulationAdd from './commonUse/ruleRegulationAdd.vue';
import customerInforList from './commonUse/customerInfo/customerInforList.vue';
import customerInfoAdd from './commonUse/customerInfo/component/customerInfoAdd.vue';
import customerInfoDetail from './commonUse/customerInfo/component/customerInfoDetail.vue';
import Quick from './commonUse/quick.vue';
import ToDo from './commonUse/toDo.vue';
// import businessManage from './commonUse/business-manage.vue';

import billingInfor from '../component/billingInfor.vue';
import billingInforDetail from '../component/billingInforDetail.vue';
import businessConduct from '../component/businessConduct.vue';
import businessProfile from '../component/businessProfile.vue';
import businessReports from '../component/businessReports.vue';
import operatHistory from '../component/operatHistory.vue';

// 所长
import businessHandleDetailLeader from './leader/businessHandleDetail.vue';
import businessHandleListLeader from './leader/businessHandleList.vue';
import businessAnalysis from './leader/businessAnalysis.vue';
import businessReviewDetailLeader from './leader/businessReviewDetail.vue';
import businessReviewListLeader from './leader/businessReviewList.vue';
import staffManagementAuthor from './leader/staffManagementAuthor.vue';
import staffManagementInfor from './leader/staffManagementInfor.vue';
import companyManagement from './leader/companyInformation/companyManagement.vue';
import functionalManagement from './leader/functionalInformation/functionalManagement.vue';
import functionalInformation from './leader/functionalInformation/component/functionalInformation.vue';

// 办公室
import businessReviewListOffice from './office/businessReviewList.vue';
import businessReviewDetailOffice from './office/businessReviewDetail.vue';
import businessHandleListOffice from './office/businessHandleList.vue';
import businessHandleDetailOffice from './office/businessHandleDetail.vue';
// 业务部
import businessHandleDetailSales from './salesDepartment/businessHandleDetail.vue';
import businessHandleListSales from './salesDepartment/businessHandleList.vue';
import businessReviewAdd from './salesDepartment/businessReviewAdd.vue';
import businessReviewDetailSales from './salesDepartment/businessReviewDetail.vue';
import businessReviewEdit from './salesDepartment/businessReviewEdit.vue';
import businessReviewListSales from './salesDepartment/businessReviewList.vue';
import billingInforEditor from './salesDepartment/component/billingInforEditor.vue';
// 风险评估部
import businessHandleDetailRisk from './riskDepartment/businessHandleDetail.vue';
import businessHandleListRisk from './riskDepartment/businessHandleList.vue';
import businessReviewListRisk from './riskDepartment/businessReviewList.vue';
import businessReviewDetailRisk from './riskDepartment/businessReviewDetail.vue';
// 档案部
import businessHandleDetailArchives from './archivesDepartment/businessHandleDetail.vue';
import businessHandleListArchives from './archivesDepartment/businessHandleList.vue';
// 财务部
import businessHandleDetailFinancial from './financialDepartment/businessHandleDetail.vue';
import businessHandleListFinancial from './financialDepartment/businessHandleList.vue';
// 市场部
import bidInfoList from './marketDepartment/bidInfoList.vue';
import bidInfoDetail from './marketDepartment/bidInfoDetail.vue';
import bidInfoInput from './marketDepartment/bidInfoInput.vue';
import bidInfoDraft from './marketDepartment/bidInfoDraft.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/quick',
            name: 'quick',
            component: Quick
        },
        {
            path: '/to-do',
            name: 'toDo',
            component: ToDo
        },
        {
            path: '/business-manage',
            redirect: '/business-handle-list-leader'
        },
        {
            path: '/staff-manage',
            redirect: '/staff-management-author'
        },
        {
            path: '/business-complete-list',
            component: businessCompleteList
        },
        {
            path: '/business-complete-list/business-complete-detail-:id',
            component: businessCompleteDetail,
            redirect: '/business-complete-list/business-complete-detail-:id/business-profile',
            children: [
                {
                    path: 'business-profile',
                    component: businessProfile
                },
                {
                    path: 'business-conduct',
                    component: businessConduct
                },
                {
                    path: 'billing-infor',
                    component: billingInfor
                },
                {
                    path: 'billing-infor-detail-:billId',
                    component: billingInforDetail
                },
                {
                    path: 'business-reports',
                    component: businessReports
                },
                {
                    path: 'operat-history',
                    component: operatHistory
                }
            ]
        },
        {
            path: '/rule-regulation',
            component: ruleRegulation
        },
        {
            path: '/rule-regulation-detail-:id',
            component: ruleRegulationDetail
        },
        {
            path: '/rule-regulation-edit-:id',
            component: ruleRegulationEdit
        },
        {
            path: '/rule-regulation-add',
            component: ruleRegulationAdd
        },
        {
            path: '/customer-infor-list',
            name: 'customerInfoList',
            component: customerInforList
        },
        {
            path: '/customer-infor-list/add',
            name: 'customerInfoAdd',
            component: customerInfoAdd
        },
        {
            path: '/customer-infor-list/detail/:id',
            name: 'customerInfoDetail',
            component: customerInfoDetail
        },
        {
            path: '/business-review-list-leader',
            component: businessReviewListLeader
        },
        {
            path: '/business-review-detail-leader-:id',
            component: businessReviewDetailLeader
        },
        {
            path: '/business-handle-list-leader',
            component: businessHandleListLeader
        },
        {
            path: '/business-handle-detail-leader-:id',
            component: businessHandleDetailLeader,
            redirect: '/business-handle-detail-leader-:id/business-profile',
            children: [
                {
                    path: 'business-profile',
                    component: businessProfile
                },
                {
                    path: 'business-conduct',
                    component: businessConduct
                },
                {
                    path: 'billing-infor',
                    component: billingInfor
                },
                {
                    path: 'billing-infor-detail-:billId',
                    component: billingInforDetail
                },
                {
                    path: 'business-reports',
                    component: businessReports
                },
                {
                    path: 'operat-history',
                    component: operatHistory
                }
            ]
        },
        {
            path: '/staff-management-author',
            component: staffManagementAuthor
        },
        {
            path: '/staff-management-infor',
            component: staffManagementInfor
        },
        {
            path: '/company-management',
            component: companyManagement
        },
        {
            path: '/functional-management',
            component: functionalManagement,
            children: [{
                path: '/functional-management/:id',
                name: 'functionalManagement',
                component: functionalInformation
            }]
        },
        {
            path: '/business-analysis',
            component: businessAnalysis
        },
        {
            path: '/business-review-list-office',
            component: businessReviewListOffice
        },
        {
            path: '/business-review-detail-office-:id',
            component: businessReviewDetailOffice
        },
        {
            path: '/business-handle-list-office',
            component: businessHandleListOffice
        },
        {
            path: '/business-handle-detail-office-:id',
            component: businessHandleDetailOffice,
            redirect: '/business-handle-detail-office-:id/business-profile',
            children: [
                {
                    path: 'business-profile',
                    component: businessProfile
                },
                {
                    path: 'business-conduct',
                    component: businessConduct
                },
                {
                    path: 'billing-infor',
                    component: billingInfor
                },
                {
                    path: 'billing-infor-detail-:billId',
                    component: billingInforDetail
                },
                {
                    path: 'business-reports',
                    component: businessReports
                },
                {
                    path: 'operat-history',
                    component: operatHistory
                }
            ]
        },
        {
            path: '/business-review-list-sales',
            component: businessReviewListSales
        },
        {
            path: '/business-review-add',
            component: businessReviewAdd
        },
        {
            path: '/business-review-edit-:id',
            component: businessReviewEdit
        },
        {
            path: '/business-review-detail-sales-:id',
            component: businessReviewDetailSales
        },
        {
            path: '/business-handle-list-sales',
            component: businessHandleListSales
        },
        {
            path: '/business-handle-detail-sales-:id',
            component: businessHandleDetailSales,
            redirect: '/business-handle-detail-sales-:id/business-profile',
            children: [
                {
                    path: 'business-profile',
                    component: businessProfile
                },
                {
                    path: 'business-conduct',
                    component: businessConduct
                },
                {
                    path: 'billing-infor',
                    component: billingInfor
                },
                {
                    path: 'billing-infor-detail-:billId',
                    component: billingInforDetail
                },
                {
                    path: 'billing-infor-editor/:isFirst',
                    component: billingInforEditor
                },
                {
                    path: 'business-reports',
                    component: businessReports
                },
                {
                    path: 'operat-history',
                    component: operatHistory
                }
            ]
        },
        {
            path: '/business-review-list-risk',
            component: businessReviewListRisk
        },
        {
            path: '/business-review-detail-risk-:id',
            component: businessReviewDetailRisk
        },
        {
            path: '/business-handle-list-risk',
            component: businessHandleListRisk
        },
        {
            path: '/business-handle-detail-risk-:id',
            component: businessHandleDetailRisk,
            redirect: '/business-handle-detail-risk-:id/business-profile',
            children: [
                {
                    path: 'business-profile',
                    component: businessProfile
                },
                {
                    path: 'business-conduct',
                    component: businessConduct
                },
                {
                    path: 'billing-infor',
                    component: billingInfor
                },
                {
                    path: 'billing-infor-detail-:billId',
                    component: billingInforDetail
                },
                {
                    path: 'business-reports',
                    component: businessReports
                },
                {
                    path: 'operat-history',
                    component: operatHistory
                }
            ]
        },
        {
            path: '/business-handle-list-archives',
            component: businessHandleListArchives
        },
        {
            path: '/business-handle-detail-archives-:id',
            component: businessHandleDetailArchives,
            redirect: '/business-handle-detail-archives-:id/business-profile',
            children: [
                {
                    path: 'business-profile',
                    component: businessProfile
                },
                {
                    path: 'business-conduct',
                    component: businessConduct
                },
                {
                    path: 'billing-infor',
                    component: billingInfor
                },
                {
                    path: 'billing-infor-detail-:billId',
                    component: billingInforDetail
                },
                {
                    path: 'business-reports',
                    component: businessReports
                },
                {
                    path: 'operat-history',
                    component: operatHistory
                }
            ]
        },
        {
            path: '/business-handle-list-financial',
            component: businessHandleListFinancial
        },
        {
            path: '/business-handle-detail-financial-:id',
            component: businessHandleDetailFinancial,
            redirect: '/business-handle-detail-financial-:id/business-profile',
            children: [
                {
                    path: 'business-profile',
                    component: businessProfile
                },
                {
                    path: 'business-conduct',
                    component: businessConduct
                },
                {
                    path: 'billing-infor',
                    component: billingInfor
                },
                {
                    path: 'billing-infor-detail-:billId',
                    component: billingInforDetail
                },
                {
                    path: 'business-reports',
                    component: businessReports
                },
                {
                    path: 'operat-history',
                    component: operatHistory
                }
            ]
        },
        {
            path: '/bid-info-list',
            component: bidInfoList
        },
        {
            path: '/bid-info-draft/',
            component: bidInfoDraft
        },
        {
            path: '/bid-info-detail/:id&:isDraft',
            component: bidInfoDetail
        },
        {
            path: '/bid-info-input/',
            component: bidInfoInput
        }
    ]
});

export default router;
