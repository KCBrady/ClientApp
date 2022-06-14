import 'ag-grid-enterprise';
//import { AgGridModule } from 'ag-grid-angular';
import { Component, OnInit } from '@angular/core';

import { CreditHoldAndReleaseDealModel } from '../models/credit-hold-release-deal.model';
import { FacadeService } from '../services/facade.service';
import { Module } from 'ag-grid-enterprise';
//import { Module } from 'ag-grid-enterprise';
//import { Module } from '@ag-grid-community/core';
//import { AllModules, Module } from '@ag-grid-enterprise/all-modules';
//import { AllCommunityModules } from '@ag-grid-community/all-modules';
//import { ServerSideRowModelModule } from 'ag-grid-enterprise/dist/lib/';



@Component({
  selector: 'app-credit-hold-release',
  templateUrl: './credit-hold-release.component.html',
  styleUrls: ['./credit-hold-release.component.scss']
})
export class CreditHoldReleaseComponent implements OnInit {
  creditHoldReleaseList: Array<CreditHoldAndReleaseDealModel> = [];

  private gridApi: { setServerSideDatasource: (arg0: any) => void; } | undefined;
  private gridColumnApi: any;

  modules: Module[] = [];
  //public modules: Module[] = ;
  
  
  rowModelType: any;
  serverSideStoreType: any;

  cacheBlockSize;

  defaultColDef;
  autoGroupColumnDef: any;
  columnDefs;

  pagination: any;
  paginationSize: any;

  rowSelection: any;

  constructor(private facadeService: FacadeService) {
    //this.rowModelType = 'serverSide';
    this.rowModelType = 'serverSide';
    this.serverSideStoreType = 'partial';
    this.cacheBlockSize = 1000; //(Partial Store only) How many rows for each block in the store, i.e. how many rows returned from the server at a time. Default 100
    this.cacheBlockSize = 500;
    this.rowSelection = 'multiple';

    this.columnDefs = [
      { field: 'counterpartyName', },
      { field: 'allocationNumber', hide: true, },
      { field: 'allocationVolume', hide: true, },
      { field: 'bookingCompany', hide: true, },
      { field: 'businessUnit', hide: true, },
      { field: 'collateral', hide: true, },
      { field: 'commodity', },
      { field: 'contractEndDate', hide: true, },
      { field: 'contractStartDate', hide: true, },
      { field: 'counterpartyId', hide: true, },
      
      { field: 'creditAnalyst', hide: true, },
      { field: 'creditComments', hide: true, },
      { field: 'creditRevisionDate', hide: true, },
      { field: 'dealCreditHoldReleaseCommentId', hide: true, },
      { field: 'dealCreditHoldReleaseReasonId', hide: true, },
      { field: 'dealCreditHoldReleaseStatusId', hide: true, },
      { field: 'dealId', },
      { field: 'dealNumber', },
      {
        field: 'dealStatus',
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['AutoReleased', 'Released', 'ReleasedOther', 'Hold', 'ReHold', 'Unapproved'],
        },
      },
      { field: 'estimatedMoveDate', hide: true, },
      { field: 'estimatedPayDate', hide: true, },
      { field: 'expectedCreditRelease', hide: false, },
      { field: 'exposure', hide: true, },
      { field: 'isBuyDeal', hide: false, },
      { field: 'itemNumber', hide: true, },
      { field: 'netExposure', },
      { field: 'notionalAmount', },
      { field: 'orderNumber', hide: true, },
      { field: 'parentName', hide: true, },
      { field: 'reason', },
      { field: 'responsibleAnalyst', },
      { field: 'responsibleAnalystId', hide: true, },
      { field: 'revisedBy', hide: true, },
      { field: 'scheduler', hide: true, },
      { field: 'trader', hide: true, },
      { field: 'transactionUnits', hide: true, },
    ];

    this.defaultColDef = {
      flex: 1,
      minWidth: 120,
      resizable: true,
      sortable: true,
      filter: true
    };

   }

  ngOnInit(): void {
  }

  onGridReady(params: { api: { setServerSideDatasource: (arg0: any) => void; }; columnApi: any; }) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    var datasource = this.createServerSideDatasource(this.facadeService);
    params.api.setServerSideDatasource(datasource);



    console.log(" On Grid Ready has been called.");
    //console.log(" GridAPI Datadource : " + this.gridApi.getServerSideDataSource);

  }

  createServerSideDatasource(facadeService: FacadeService) {
    return {
      getRows: function (params: { request: { startRow: any; endRow: any; rowGroupCols: any; valueCols: any; groupKeys: any; sortModel: any; filterModel: any; }; successCallback: (arg0: any, arg1: any) => void; }) {
        setTimeout( () => {
          let postData = {
            "startIndex": params.request.startRow,
            "pageSize": params.request.endRow,
            "totalRecords": 0,
            "filterFormId": "string",
            "gridContainerId": "string",
            "gridPageIndex": 0,
            "searchKeyword": "string",
            "rowGroupCols": params.request.rowGroupCols,
            "valueCols": params.request.valueCols,
            "groupKeys": params.request.groupKeys,
            "sortModel": params.request.sortModel,
            "filterModel": params.request.filterModel,
            "creditHoldAndReleaseDealGridFilterListItem": [{
              "DealId": 0,
              "DealNumber": "string",
              "EstimatedMoveDate": "2022-06-10T08:10:19.864Z",
              "EstimatedPayDate": "2022-06-10T08:10:19.864Z",
              "AllocationVolume": 0,
              "Commodity": "string",
              "NotionalAmount": 0,
              "Collateral": 0,
              "NetExposure": 0,
              "Exposure": 0,
              "CounterpartyId": 0,
              "CounterpartyName": "string",
              "AllocationNumber": "string",
              "ExpectedCreditRelease": "2022-06-10T08:10:19.864Z",
              "CreditComments": "string",
              "CreditAnalyst": "string",
              "Reason": "string",
              "DealStatus": "string",
              "IsBuyDeal": true,
              "DealCreditHoldReleaseCommentId": 0,
              "DealCreditHoldReleaseReasonId": 0,
              "ResponsibleAnalystId": 0,
              "DealCreditHoldReleaseStatusId": 0,
              "BusinessUnit": "string",
              "Scheduler": "string",
              "Trader": "string",
              "TransactionUnits": "string",
              "ResponsibleAnalyst": "string",
              "OrderNumber": "string",
              "ItemNumber": "string",
              "CreditRevisionDate": "2022-06-10T08:10:19.864Z",
              "RevisedBy": "string",
              "ContractStartDate": "2022-06-10T08:10:19.864Z",
              "ContractEndDate": "2022-06-10T08:10:19.864Z",
              "ParentName": "string",
              "BookingCompany": "string",
            }]
        };
          facadeService.getCreditHoldRelease(postData).subscribe((data: any) => {
            const creditHoldReleaseList = data.creditHoldAndReleaseDealGridFilterListItem;
            console.log(creditHoldReleaseList);
            params.successCallback(creditHoldReleaseList, data.totalRecords);
          });
        }, 500);
      }
    }
  }
}