import Vue from 'vue';
import VueRouter from 'vue-router';

// import inforManagement from './routeComponent/inforManagement.vue';
// import authorManagement from './routeComponent/authorManagement.vue';
// import completeBusiness from './routeComponent/completeBusiness.vue';
// import inforBoard from './routeComponent/inforBoard.vue';
// import ruleRegulation from './routeComponent/ruleRegulation.vue';
// import reviewBusinessSales from './routeComponent/reviewBusinessSales.vue';
// import handleBusiness from './routeComponent/handleBusiness.vue';
// import customerInforSales from './routeComponent/customerInforSales.vue';
// import reviewBusinessRisk from './routeComponent/reviewBusinessRisk.vue';
// import reviewBusinessLead from './routeComponent/reviewBusinessLead.vue';
// import customerInforLead from './routeComponent/customerInforLead.vue';
// import businessAnalysis from './routeComponent/businessAnalysis.vue';
// import toContractNum from './routeComponent/toContractNum.vue';
// import actingInvoice from './routeComponent/actingInvoice.vue';
// import reviewBusinessRiskPass from './routeComponent/reviewBusinessRiskPass.vue';
// import biddingInfor from './routeComponent/biddingInfor.vue';
// import handleBusinessDoc from './routeComponent/handleBusinessDoc.vue';

//通用
import bidInforList from './commonUse/bidInforList.vue';
import businessCompleteList from './commonUse/businessCompleteList.vue';
import businessCompleteDetail from './commonUse/businessCompleteDetail.vue';
import ruleRegulation from './commonUse/ruleRegulation.vue';
//所长
import businessAnalysis from './leader/businessAnalysis.vue';
import businessReviewDetailLeader from './leader/businessReviewDetailLeader.vue';
import businessReviewListLeader from './leader/businessReviewListLeader.vue';
import customerInforListLeader from './leader/customerInforListLeader.vue';
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
import businessReviewEditSales from './salesDepartment/businessReviewEdit.vue';
import businessReviewListSales from './salesDepartment/businessReviewList.vue';
import customerInforListSales from './salesDepartment/customerInforList.vue';
//风险评估部
import businessReviewListRisk from './riskDepartment/businessReviewList.vue';
import businessReviewDetailRisk from './riskDepartment/businessReviewDetail.vue';
//档案部
import businessHandleDetailArchives from './archivesDepartment/businessHandleDetail.vue';
import businessHandleListArchives from './archivesDepartment/businessHandleList.vue';
//财务部
import businessHandleDetailFinancial from './archivesDepartment/businessHandleDetailFinancial.vue';
import businessHandleListFinancial from './archivesDepartment/businessHandleListFinancial.vue';
//市场部
import bidInforListMarket from './commonUse/bidInforListMarket.vue';
import bidInforDetail from './marketDepartment/bidInforDetail.vue';
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
            path: '/business-analysis',
            component: businessAnalysis
        },
        {
            path: '/business-review-detail-leader',
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
            path: '/business-handle-detail-office',
            component: businessHandleDetailOffice
        },
        {
            path: '/business-handle-detail-sales',
            component: businessHandleDetailSales
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
            path: '/business-review-detail-sales',
            component: businessReviewDetailSales
        },
        {
            path: '/business-review-edit-sales',
            component: businessReviewEditSales
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
            path: '/business-review-detail-risk',
            component: businessReviewDetailRisk
        },
        {
            path: '/business-handle-detail-archives',
            component: businessHandleDetailArchives
        },
        {
            path: '/business-handle-list-archives',
            component: businessHandleListArchives
        },
        {
            path: '/business-handle-detail-financial',
            component: businessHandleDetailFinancial
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
        }
    ]
});

export default router;
