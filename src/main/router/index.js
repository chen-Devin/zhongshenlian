import Vue from 'vue';
import VueRouter from 'vue-router';

//通用
import bidInforList from './commonUse/bidInforList.vue';
import businessCompleteList from './commonUse/businessCompleteList.vue';
import businessCompleteDetail from './commonUse/businessCompleteDetail.vue';
import ruleRegulation from './commonUse/ruleRegulation.vue';
import ruleRegulationDetail from './commonUse/ruleRegulationDetail.vue';
import billingInforDetail from '../component/billingInforDetail.vue';
//所长
import businessAnalysis from './leader/businessAnalysis.vue';
import businessReviewDetailLeader from './leader/businessReviewDetail.vue';
import businessReviewListLeader from './leader/businessReviewList.vue';
import customerInforListLeader from './leader/customerInforList.vue';
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
import customerInforListSales from './salesDepartment/customerInforList.vue';
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
import bidInforListMarket from './marketDepartment/bidInforList.vue';
import bidInforDetail from './marketDepartment/bidInforDetail.vue';
import bidInfoInput from './marketDepartment/bidInfoInput.vue';
import bidInforEdit from './marketDepartment/bidInforEdit.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/bid-infor-list',
            component: bidInforList
        },
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
            path: '/customer-infor-list-leader',
            component: customerInforListLeader
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
            children: [
                {
                    path: 'billing-infor-detail/:billId',
                    component: billingInforDetail
                }
            ]
        },
        {
            path: '/business-handle-detail-sales/:id',
            component: businessHandleDetailSales,
            children: [
                {
                    path: 'billing-infor-editor/:billId',
                    component: billingInforEditor
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
            path: '/customer-infor-list-sales',
            component: customerInforListSales
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
            children: [
                {
                    path: 'billing-infor-detail/:billId',
                    component: billingInforDetail
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
            children: [
                {
                    path: 'billing-infor-detail/:billId',
                    component: billingInforDetail
                }
            ]
        },
        {
            path: '/business-handle-list-financial',
            component: businessHandleListFinancial
        },
        {
            path: '/bid-infor-list-market',
            component: bidInforListMarket
        },
        {
            path: '/bid-infor-detail',
            component: bidInforDetail
        },
        {
            path: '/bid-infor-edit',
            component: bidInforEdit
        },
        {
            path: '/bid-info-Input',
            component: bidInfoInput
        }
    ]
});

export default router;
