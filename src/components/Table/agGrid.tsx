import React, { useState, useMemo, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  GetRowIdFunc,
  GetRowIdParams,
  GridReadyEvent,
} from "ag-grid-community";
import "ag-grid-enterprise";
import { filterCrypto$ } from "../../store";
import "./table.scss";

const AgGrid: React.FunctionComponent = () => {
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState<Crypto[]>([]);
  const [gridApi, setGridApi] = useState<any>(null);
  const gridRef = useRef<AgGridReact>(null);
  const perpage = 5;

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: "name",
      headerName: "Coin",
      cellRenderer: (params: any) => {
        return (
          <div className="table__col">
            <img className="table__icon" src={params.data.image} />
            <p className="table__title">
              {params.data.symbol.toUpperCase()} -{" "}
              {params.data.name.toUpperCase()}
            </p>
          </div>
        );
      },
    },
    { field: "current_price", headerName: "Price" },
    {
      field: "market_cap_change_24h",
      headerName: "24h Change",
      cellRenderer: (params: any) => {
        const percentage = params.data.market_cap_change_percentage_24h;

        const percentageClass = percentage < 0 ? "negative" : "positive";

        return (
          <div>
            <p className={percentageClass}>{percentage}</p>
          </div>
        );
      },
    },
    {
      field: "market_cap",
      headerName: "Market Cap",
      cellRenderer: (params: any) => {
        const commafy = (num: number) => {
          var str = num.toString().split(".");
          if (str[0].length >= 5) {
            str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
          }
          if (str[1] && str[1].length >= 5) {
            str[1] = str[1].replace(/(\d{3})/g, "$1 ");
          }
          return str.join(".");
        };
        return (
          <div>
            <p>{commafy(params.data.market_cap)}</p>
          </div>
        );
      },
    },
  ]);

  useEffect(() => {
    const sub = filterCrypto$.subscribe((x: any) => setCrypto(x));
    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    if (gridApi) {
      onGridReady(gridApi);
    }
  }, [search]);

  const filterCrypto = useMemo(() => {
    return crypto.filter((p: any) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [crypto, search]);

  const datasource = {
    getRows(params: any) {
      if (filterCrypto) {
        params.successCallback(filterCrypto, filterCrypto.length);
      } else {
        params.failCallback();
      }
    },
  };

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params);
    params.api.setServerSideDatasource(datasource);
  };

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
  }, []);

  const getRowId = useMemo<GetRowIdFunc>(() => {
    return (params: GetRowIdParams) => `${params.data.id}`;
  }, []);

  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      minWidth: 220,
    };
  }, []);

  return (
    <>
      <input
        type="text"
        className="table__search"
        placeholder="Search For a Crypto Currency..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="ag-theme-alpine-dark">
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={perpage}
          cacheBlockSize={perpage}
          domLayout="autoHeight"
          onGridReady={onGridReady}
          defaultColDef={defaultColDef}
          rowSelection={"single"}
          rowModelType={"serverSide"}
          enableCellChangeFlash={true}
          getRowId={getRowId}
          autoGroupColumnDef={autoGroupColumnDef}
          animateRows={true}
          editType={"fullRow"}
          rowHeight={70}
        />
      </div>
    </>
  );
};
export default AgGrid;
