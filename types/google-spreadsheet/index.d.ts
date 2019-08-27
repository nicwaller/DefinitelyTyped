// Type definitions for google-spreadsheet 2.0
// Project: https://github.com/theoephraim/node-google-spreadsheet
// Definitions by: Nic Waller <https://github.com/me>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export declare namespace GoogleSheets {
    type callback_erroronly = (error: any) => void;
    type callback<T> = (error: any, value: T) => void;
    // GoogleSpreadsheet is a document contains multiple Worksheets
    export class GoogleSpreadsheet {
        setAuthToken(auth_id: string): void
        setAuth(username: string, password: string, cb: callback_erroronly): void // deprecated
        useServiceAccountAuth(creds: ServiceCredentials, cb: callback_erroronly): void
        isAuthActive(): boolean
        // makeFeedRequest() // This method is used internally to make all requests
        getInfo(cb: callback<GoogleSheets.GoogleSpreadsheetInfo>): void
        // worksheets is not populated until getInfo() is called
        worksheets?: Array<SpreadsheetWorksheet>
        addWorksheet(opts: any, cb?: callback<SpreadsheetWorksheet>): void
        removeWorksheet(sheetId: string, cb: callback_erroronly): void
        getRows(options: RowQuery, cb: callback<Array<SpreadsheetRow>>): void
        addRow(): void
        getCells(worksheetId: string, opts: CellQuery, cb: callback<Array<SpreadsheetCell>>): void

    }
    interface GoogleSpreadsheetInfo {
        id: string
        title: string
        updated: string
        author: {
            name: string
            email: string
        }
        worksheets?: Array<SpreadsheetWorksheet>
    }
    interface ServiceCredentials {
        client_email: string
        private_key: string
    }
    // Worksheets are the different tabs/pages visible at the bottom of the Google Sheets interface.
    interface SpreadsheetWorksheet {
        url: string
        id: string
        title: string
        rowCount: number
        colCount: number
        _links: { [type: string]: string }
        resize(): void
        setTitle(): void
        clear(): void
        getRows(options: RowQuery, cb: callback<Array<SpreadsheetRow>>): void
        getCells(opts: CellQuery, cb: callback<Array<SpreadsheetCell>>): void
        addRow(): void
        bulkUpdateCells(): void
        del(): void
        setHeaderRow(): void
    }
    interface RowQuery {
        offset?: number
        limit?: number
        orderby?: string // eg. col2
        reverse?: boolean
        query?: any
    }
    interface CellQuery {
        ["min-row"]?: number
        ["max-row"]?: number
        ["min-col"]?: number
        ["max-col"]?: number
        ["return-empty"]?: boolean
    }
    interface SpreadsheetRow {
        _xml: Array<string>
        id: string
        // app:edited: string,
        _links: { [key: string]: string }
        colname?: string
        save(cb: callback_erroronly): void
        del(cb: callback_erroronly): void
    }
    interface SpreadsheetCell {
        spreadsheet?: GoogleSpreadsheet
        row: number
        col: number
        batchId: string
        ["ws_id"]: string
        ss: string
        _formula?: any
        _numericValue?: number
        _value: string
        save(cb: callback_erroronly): void
        getId(): string
        getEdit(): string
        getSelf(): string
        updateValuesFromResponseData(_data: any): void
        setValue(newValue: string, cb:callback_erroronly): void
        _clearValue(): void
    }
}
