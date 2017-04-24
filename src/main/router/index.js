import Vue from 'vue';
import VueRouter from 'vue-router';

//通用
import businessCompleteList from './commonUse/businessCompleteList.vue';
import businessCompleteDetail from './commonUse/businessCompleteDetail.vue';
import ruleRegulation from './commonUse/ruleRegulation.vue';
import ruleRegulationDetail from './commonUse/ruleRegulationDetail.vue';
import ruleRegulationEdit from './commonUse/ruleRegulationEdit.vue';
import ruleRegulationAdd from './commonUse/ruleRegulationAdd.vue';
import vEditDiv from './commonUse/component/vEditDiv.vue';

import customerInforList from './commonUse/customerInforList.vue';
import billingInfor from '../component/billingInfor.vue';
import businessConduct from '../component/businessConduct.vue';
import businessProfile from '../component/businessProfile.vue';
import businessReport from '../component/businessReport.vue';
import operatHistory from '../component/operatHistory.vue';
import billingInforDetail from '../component/billingInforDetail.vue';
//所长
import businessAnalysis from './leader/businessAnalysis.vue';
import businessReviewDetailLeader from './leader/businessReviewDetail.vue';
import businessReviewListLeader from './leader/businessReviewList.vue';
import staffManagementAuthor from './leader/staffManagementAuthor.vue';
import staffManagementInfor from './leader/staffManagementInfor.vue';
//办公室
import businessHandleListOffice from './office/businessHandleList.vue';
import businessHandleDetailOffice from './office/businessHandleDetail.vue';
//业务部
import businessHandleDetailSales from './salesDepartment/businessHandleDetail.vue';
import businessHandleListSales from './salesDepartment/businessHandleList.vue';
import businessReviewAdd from './salesDepartment/businessReviewAdd.vue';
import businessReviewDetailSales from './salesDepartment/businessReviewDetail.vue';
import businessReviewEdit from './salesDepartment/businessReviewEdit.vue';
import businessReviewListSales from './salesDepartment/businessReviewList.vue';
import billingInforEditor from './salesDepartment/component/billingInforEditor.vue';
//风险评估部
import businessReviewListRisk from './riskDepartment/businessReviewList.vue';
import businessReviewDetailRisk from './riskDepartment/businessReviewDetail.vue';
//档案部
import businessHandleDetailArchives from './archivesDepartment/businessHandleDetail.vue';
import businessHandleListArchives from './archivesDepartment/businessHandleList.vue';
//财务部
import businessHandleDetailFinancial from './archivesDepartment/businessHandleDetail.vue';
import businessHandleListFinancial from './archivesDepartment/businessHandleList.vue';
//市场部
import bidInfoList from './marketDepartment/bidInfoList.vue';
import bidInfoDetail from './marketDepartment/bidInfoDetail.vue';
import bidInfoInputKJS from './marketDepartment/bidInfoInputKJS.vue';
import bidInfoInputPGS from './marketDepartment/bidInfoInputPGS.vue';
import bidInfoInputZJS from './marketDepartment/bidInfoInputZJS.vue';
import bidInfoInputSWS from './marketDepartment/bidInfoInputSWS.vue';
import bidInfoAccounting from './marketDepartment/bidInfoAccounting.vue';
import bidInfoAssessment from './marketDepartment/bidInfoAssessment.vue';
import bidInfoTax from './marketDepartment/bidInfoTax.vue';
import bidInfoCost from './marketDepartment/bidInfoCost.vue';
import bidInfoDraft from './marketDepartment/bidInfoDraft.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/business-complete-list',
            component: businessCompleteList
        },
        {
            path: '/business-complete-detail',
            component: businessCompleteDetail
        },
        {
            path: '/rule-regulation',
            component: ruleRegulation
        },
        {
            path: '/rule-regulation-detail/:id',
            component: ruleRegulationDetail
        },
         {
             path: '/rule-regulation-edit/:id',
             component: ruleRegulationEdit
         },
         {
             path: '/rule-regulation-add',
             component: ruleRegulationAdd
         },
        {
            path: '/customer-infor-list',
            component: customerInforList
        },
        {
            path: '/business-analysis',
            component: businessAnalysis
        },
        {
            path: '/business-review-detail-leader/:id',
            component: businessReviewDetailLeader
        },
        {
            path: '/business-review-list-leader',
            component: businessReviewListLeader
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
            path: '/business-handle-list-office',
            component: businessHandleListOffice
        },
        {
            path: '/business-handle-detail-office/:id',
            component: businessHandleDetailOffice,
            redirect: '/business-handle-detail-office/:id/business-profile',
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
                    component: billingInfor,
                    children: [
                        {
                            path: 'billing-infor-detail/:billId',
                            component: billingInforDetail
                        }
                    ]
                },
                {
                    path: 'business-report',
                    component: businessReport
                },
                {
                    path: 'operat-history',
                    component: operatHistory
                }
            ]
        },
        {
            path: '/business-handle-detail-sales/:id',
            component: businessHandleDetailSales,
            redirect: '/business-handle-detail-sales/:id/business-profile',
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
                    component: billingInfor,
                    children: [
                        {
                            path: 'billing-infor-detail/:billId',
                            component: billingInforDetail
                        },
                        {
                            path: 'billing-infor-editor',
                            component: billingInforEditor
                        },
                    ]
                },
                {
                    path: 'business-report',
                    component: businessReport
                },
                {
                    path: 'operat-history',
                    component: operatHistory
                }
            ]
        },
        {
            path: '/business-handle-list-sales',
            component: businessHandleListSales
        },
        {
            path: '/business-review-add',
            component: businessReviewAdd
        },
        {
            path: '/business-review-detail-sales/:id',
            component: businessReviewDetailSales
        },
        {
            path: '/business-review-edit/:id',
            component: businessReviewEdit
        },
        {
            path: '/business-review-list-sales',
            component: businessReviewListSales
        },
        {
            path: '/business-review-list-risk',
            component: businessReviewListRisk
        },
        {
            path: '/business-review-detail-risk/:id',
            component: businessReviewDetailRisk
        },
        {
            path: '/business-handle-detail-archives/:id',
            component: businessHandleDetailArchives,
            redirect: '/business-handle-detail-archives/:id/business-profile',
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
                    component: billingInfor,
                    children: [
                        {
                            path: 'billing-infor-detail/:billId',
                            component: billingInforDetail
                        }
                    ]
                },
                {
                    path: 'business-report',
                    component: businessReport
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
            path: '/business-handle-detail-financial/:id',
            component: businessHandleDetailFinancial,
            redirect: '/business-handle-detail-financial/:id/business-profile',
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
                    component: billingInfor,
                    children: [
                        {
                            path: 'billing-infor-detail/:billId',
                            component: billingInforDetail
                        }
                    ]
                },
                {
                    path: 'business-report',
                    component: businessReport
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
            path: '/bid-info-list',
            component: bidInfoList,
            redirect: '/bid-info-list/accounting',
            children: [
                {
                    path: 'accounting',
                    component: bidInfoAccounting
                },
                {
                    path: 'assessment',
                    component: bidInfoAssessment
                },
                {
                    path: 'tax',
                    component: bidInfoTax
                },
                {
                    path: 'cost',
                    component: bidInfoCost
                }
            ]
        },
        {
            path: '/bid-info-draft/',
            component: bidInfoDraft
        },
        {
            path: '/bid-info-detail/:id&:office',
            component: bidInfoDetail
        },
        // {
        //     path: '/bid-infor-edit',
        //     component: bidInforEdit
        // },
        {
            path: '/bid-info-Input-kjs',
            component: bidInfoInputKJS
        },
        {
            path: '/bid-info-Input-pgs',
            component: bidInfoInputPGS
        },
        {
            path: '/bid-info-Input-sws',
            component: bidInfoInputSWS
        },
        {
            path: '/bid-info-Input-zjs',
            component: bidInfoInputZJS
        }
    ]
});

export default router;
