import * as XLSX from 'xlsx';
import saveAs from 'file-saver';

// Export data to Excel with bold header
export const exportToExcel = (data, fileName) => {
    // const result = []
    // console.log(orderBy,"orderBy");
    // // const columnOrder = data.map(item=> orderBy.map(i => ({i : item?.i})))
    // for (let index = 0; index < data.length; index++) {
    //     let newObj = {}
    //     Object.keys(orderBy).map((key)=>{
    //         newObj[orderBy[key]] = data[index]?.[key]
    //     })
    //     // orderBy.map(i=> {newObj[`${i}`]= data[index]?.[`${i}`]})
    //     result.push(newObj)
        
    // }
    // console.log("#" ,result)

    const worksheet = XLSX.utils.json_to_sheet(data);

    // Calculate column widths dynamically based on content length
    const wscols = worksheet['!cols'] || [];
    const maxContentLengths = {};

    XLSX.utils.sheet_to_json(worksheet).forEach((row) => {
        Object.keys(row).forEach((col) => {
            const cellValue = row[col];
            if (cellValue) {
                const contentLength = String(cellValue).length;
                if (!maxContentLengths[col] || contentLength > maxContentLengths[col]) {
                    maxContentLengths[col] = contentLength;
                }
            }
        });
    });

    Object.keys(maxContentLengths).forEach((col) => {
        const width = maxContentLengths[col];
        wscols[col] = { wch: width + 2 }; // Add some extra width for padding
    });

    worksheet['!cols'] = wscols;

    // Make header text bold
    const headerStyle = { font: { bold: true } };

    // Iterate through the range of cells in the header row and apply the bold style
    const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
        const headerCell = XLSX.utils.encode_cell({ r: headerRange.s.r, c: col });
        worksheet[headerCell].s = headerStyle;
    }

    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
    });

    saveAsExcelFile(excelBuffer, fileName);
};

// Save Excel file using FileSaver.js
const saveAsExcelFile = (buffer, fileName) => {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data = new Blob([buffer], { type: EXCEL_TYPE });

    saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
};
