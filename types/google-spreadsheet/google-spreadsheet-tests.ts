import {GoogleSheets} from "../types/google-spreadsheet";

const GoogleSpreadsheet = require('google-spreadsheet');

export async function getDocument(sheetId: string, creds: GoogleSheets.ServiceCredentials): Promise<GoogleSheets.GoogleSpreadsheet> {
    return new Promise<GoogleSheets.GoogleSpreadsheet>((resolve, reject) => {
        const doc: GoogleSheets.GoogleSpreadsheet = new GoogleSpreadsheet(sheetId);
        doc.useServiceAccountAuth(creds, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(doc);
            }
        });
    })
}

export async function getInfo(document: GoogleSheets.GoogleSpreadsheet): Promise<GoogleSheets.GoogleSpreadsheetInfo> {
    return new Promise<GoogleSheets.GoogleSpreadsheetInfo>((resolve, reject) => {
        document.getInfo((error, value) =>{
            if (error) {
                reject(error);
            } else {
                resolve(value);
            }
        });
    });
}

export async function getCells(sheet: GoogleSheets.SpreadsheetWorksheet): Promise<Array<GoogleSheets.SpreadsheetCell>> {
    return new Promise<Array<GoogleSheets.SpreadsheetCell>>((resolve, reject) => {
        sheet.getCells({}, (error, cells) => {
            if (error) {
                reject(error)
            } else {
                resolve(cells)
            }
        })
    });
}

export function selectCells(range: GoogleSheets.CellQuery, cells: Array<GoogleSheets.SpreadsheetCell>) {
    const results = [];
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        if (range["min-row"] && cell.row < range["min-row"]) {continue}
        if (range["max-row"] && cell.row > range["max-row"]) {continue}
        if (range["min-col"] && cell.col < range["min-col"]) {continue}
        if (range["max-col"] && cell.col > range["max-col"]) {continue}
        results.push(cell);
    }
    return results;
}

export function selectCellMatching(pattern: RegExp, cells: Array<GoogleSheets.SpreadsheetCell>): GoogleSheets.SpreadsheetCell {
    return cells.filter((cell) => {return cell._value.match(pattern)})[0];
}

export function selectCellContaining(pattern: string, cells: Array<GoogleSheets.SpreadsheetCell>): GoogleSheets.SpreadsheetCell {
    return cells.filter((cell) => {return cell._value.includes(pattern)})[0];
}

export function selectCell(row: number, col: number, cells: Array<GoogleSheets.SpreadsheetCell>): GoogleSheets.SpreadsheetCell | undefined {
    const matches = selectCells({
        "min-row": row,
        "max-row": row,
        "min-col": col,
        "max-col": col,
    }, cells);
    return matches[0];
}

