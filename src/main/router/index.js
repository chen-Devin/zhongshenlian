import Vue from 'vue';
import VueRouter from 'vue-router';

import inforManagement from './routeComponent/inforManagement.vue';
import authorManagement from './routeComponent/authorManagement.vue';
import complBusiness from './routeComponent/complBusiness.vue';
import inforBoard from './routeComponent/inforBoard.vue';
import ruleRegulation from './routeComponent/ruleRegulation.vue';
import reviewBusinessSales from './routeComponent/reviewBusinessSales.vue';
import handleBusiness from './routeComponent/handleBusiness.vue';
import customerInforSales from './routeComponent/customerInforSales.vue';
import reviewBusinessRisk from './routeComponent/reviewBusinessRisk.vue';
import reviewBusinessLead from './routeComponent/reviewBusinessLead.vue';
import customerInforLead from './routeComponent/customerInforLead.vue';
import businessAnalysis from './routeComponent/businessAnalysis.vue';
import toContractNum from './routeComponent/toContractNum.vue';
import actingInvoice from './routeComponent/actingInvoice.vue';
import reviewBusinessRiskPass from './routeComponent/reviewBusinessRiskPass.vue';
import biddingInfor from './routeComponent/biddingInfor.vue';
import handleBusinessDoc from './routeComponent/handleBusinessDoc.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/infor-management',
            component: inforManagement
        },
        {
            path: '/author-management',
            component: authorManagement
        },
        {
            path: '/compl-business',
            component: complBusiness
        },
        {
            path: '/infor-board',
            component: inforBoard
        },
        {
            path: '/rule-regulation',
            component: ruleRegulation
        },
        {
            path: '/review-business-sales',
            component: reviewBusinessSales
        },
        {
            path: '/handle-business',
            component: handleBusiness
        },
        {
            path: '/customer-infor-sales',
            component: customerInforSales
        },
        {
            path: '/review-business-risk',
            component: reviewBusinessRisk
        },
        {
            path: '/review-business-lead',
            component: reviewBusinessLead
        },
        {
            path: '/customer-infor-lead',
            component: customerInforLead
        },
        {
            path: '/author-management',
            component: authorManagement
        },
        {
            path: '/infor-management',
            component: inforManagement
        },
        {
            path: '/business-analysis',
            component: businessAnalysis
        },
        {
            path: '/to-contract-num',
            component: toContractNum
        },
        {
            path: '/acting-invoice',
            component: actingInvoice
        },
        {
            path: '/review-business-risk-pass',
            component: reviewBusinessRiskPass
        },
        {
            path: '/bidding-infor',
            component: biddingInfor
        },
        {
            path: '/handle-business-doc',
            component: handleBusinessDoc
        }
    ]
});

export default router;
