import 'ag-grid-enterprise';
//import { AgGridModule } from 'ag-grid-angular';
import { Component, OnInit } from '@angular/core';

import { FacadeService } from '../services/facade.service';

import { 
        GridApi,
        GetRowIdFunc, 
        GetRowIdParams,
        GridReadyEvent,
        IServerSideDatasource,
        ServerSideStoreType,
        ToolPanelClass,
        IToolPanel,
        AsyncTransactionsFlushed, 
        IsApplyServerSideTransactionParams, 
        ServerSideTransactionResult, 
        ServerSideTransactionResultStatus } from 'ag-grid-community';

import { SearchPartiesModel } from '../models/search-parties.model';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-serach-parties',
  templateUrl: './search-parties.component.html',
  styleUrls: ['./search-parties.component.scss']
})
export class SearchPartiesComponent implements OnInit {
  SearchPartiesList: Array<SearchPartiesModel> = [];

  //private gridApi: { setServerSideDatasource: (arg0: any) => } | undefined;
  private gridApi!: GridApi;
  private gridColumnApi: any;

  // this is not required as I'm using packages (not modules), see package.json
  //modules: Module[] = [];  
  
  public rowModelType: 'clientSide' | 'infinite' | 'viewport' | 'serverSide' = 'serverSide';
  //public serverSideStoreType: ServerSideStoreType = 'partial';
  public serverSideStoreType: ServerSideStoreType = 'full';
  public rowSelection = 'multiple';
  public rowData!: any[];

  public asyncTransactionWaitMillis = 500;

  public versionCounter = 1;
  
  //rowModelType: any;
  //serverSideStoreType: any;

  cacheBlockSize;

  defaultColDef;
  autoGroupColumnDef: any;
  columnDefs;
  sideBar: any;

  pagination: any;
  paginationSize: any;

  groupDisplayType: any;
  animateRows: any;

  constructor(private facadeService: FacadeService) {
 
    this.cacheBlockSize = 1000; //(Partial Store only) How many rows for each block in the store, i.e. how many rows returned from the server at a time. Default 100
    this.cacheBlockSize = 500;
    //this.rowSelection = 'multiple';
    // optional as 'singleColumn' is the default group display type
    this.groupDisplayType = 'singleColumn';
    this.animateRows = true;

    // see styles.scss for cell renderings for CellClassRules

    this.columnDefs = [
      { field: 'id', },
      { headerName: 'Row ID', valueGetter: 'node.id', sortable: false },
      { field: 'name', filter: 'agTextColumnFilter'},
      { field: 'rating', filter: 'agTextColumnFilter'},
      { field: 'creditAnalyst', filter: 'agTextColumnFilter'},
      { field: 'secondCreditAnalyst', filter: 'agTextColumnFilter', hide:true},
      { field: 'creditOffice', filter: 'agTextColumnFilter', hide:true},
      { field: 'secondAnalystOffice', filter: 'agTextColumnFilter', hide:true},
      { field: 'country', filter: 'agTextColumnFilter'},
      { field: 'countryISO', filter: 'agTextColumnFilter', hide:true},
      { field: 'riskCountry', filter: 'agTextColumnFilter', hide:true},
      { field: 'riskCountryISO', filter: 'agTextColumnFilter', hide:true},
      { field: 'limit', filter: 'agNumberColumnFilter', hide:true},
      { field: 'exposure', filter: 'agNumberColumnFilter'},
      { field: 'available', filter: 'agNumberColumnFilter', hide:true },
      { field: 'utilisationPct',
                filter: 'agTextColumnFilter', 
                cellClassRules: {
                    'util-pct-alert': 'x.length > 3', }
              },
      { field: 'category', filter: 'agTextColumnFilter', hide:true},
      { field: 'region', filter: 'agTextColumnFilter', hide:true},
      { field: 'riskRegion', filter: 'agTextColumnFilter', hide:true},
      { field: 'industry', filter: 'agTextColumnFilter', hide:true},
      { field: 'role', filter: 'agTextColumnFilter', hide:true},
      { field: 'aliasType', filter: 'agTextColumnFilter', hide:true},
      { field: 'alias', filter: 'agTextColumnFilter', hide:true},
      { field: 'nextCreditAssesmentDate', filter: 'agDateColumnFilter', hide:true},
      { field: 'lastCreditAssesmentDate', filter: 'agDateColumnFilter', hide:true },
      { field: 'active', filter: 'agTextColumnFilter'},
      { field: 'status', filter: 'agTextColumnFilter'},
    ];

    this.defaultColDef = {
      flex: 1,
      minWidth: 120,
      resizable: true,
      sortable: true,
      filter: true
    };

    this.sideBar = 'filters';  

   }

   public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    // if leaf level, we have ID
    if (params.data.id != null) {
      return params.data.id;
    }
    // this array will contain items that will compose the unique key
    var parts = [];
    // if parent groups, add the value for the parent group
    if (params.parentKeys) {
      parts.push(...params.parentKeys);
    }
    // it we are a group, add the value for this level's group
    var rowGroupCols = params.columnApi.getRowGroupColumns();
    var thisGroupCol = rowGroupCols[params.level];
    if (thisGroupCol) {
      parts.push(params.data[thisGroupCol.getColDef().field!]);
    }
    return parts.join('-');
  };

  onAsyncTransactionsFlushed(e: AsyncTransactionsFlushed) {
    var summary: {
      [key in ServerSideTransactionResultStatus]?: any;
    } = {};
    (e.results as ServerSideTransactionResult[]).forEach(
      (result: ServerSideTransactionResult) => {
        var status = result.status;
        if (summary[status] == null) {
          summary[status] = 0;
        }
        summary[status]++;
      }
    );
    console.log('onAsyncTransactionsFlushed: ' + JSON.stringify(summary));
  }

  isApplyServerSideTransaction(params: IsApplyServerSideTransactionParams) {
    var transactionVersion = (params.transaction as any).serverVersion;
    var dataLoadedVersion = params.storeInfo.serverVersion;
    var transactionCreatedSinceInitialLoad =
      transactionVersion > dataLoadedVersion;
    if (!transactionCreatedSinceInitialLoad) {
      console.log('cancelling transaction');
    }
    return transactionCreatedSinceInitialLoad;
  }

  refreshCache(route?: string[]) {
    this.versionCounter++;
    var purge =
      (document.querySelector('#purge') as HTMLInputElement).checked === true;
      
    this.gridApi.refreshServerSideStore({ route: route, purge: purge });
  }

  ngOnInit(): void {
  }

  //onGridReady(params: { api: { setServerSideDatasource: (arg0: any) => void; getToolPanelInstance: any}; columnApi: any; }) {
    onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    var datasource = this.createServerSideDatasource(this.facadeService);
    
    params.api.setServerSideDatasource(datasource);

    params.api.getToolPanelInstance('filters');

    //params.api.getToolPanelInstance('filters').expandFilters();

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
            "searchPartiesGridFilterListItem": [{
              "id": 0,
              "name": "string",
              "rating": "string",
              "creditAnalyst": "string",
              "secondCreditAnalyst": "string",
              "creditOffice": "string",
              "secondAnalystOffice": "string",
              "country": "string",
              "countryISO": "string",
              "riskCountry": "string",
              "riskCountryISO": "string",              
              "limit": 0,
              "exposure": 0,
              "available": 0,
              "utilisationPct": "string",
              "maxPFEUnsecured": 0,
              "category": "string",
              "region": "string",
              "riskRegion": "string",
              "industry": "string",
              "role": "string",
              "aliasType": "string",
              "alias": "string",
              "nextCreditAssesmentDate": "2022-06-01T00:00:00",
              "lastCreditAssesmentDate": "2021-06-01T00:00:00",
              "active": true,
              "status": "string",
            }]
        };
          facadeService.getSearchPartiesList(postData).subscribe((data: any) => {
            const SearchPartiesList = data.searchPartiesGridFilterListItem;
            console.log(SearchPartiesList);
            params.successCallback(SearchPartiesList, data.totalRecords);
          });
        }, 500);
      }
    }
  }
  
}