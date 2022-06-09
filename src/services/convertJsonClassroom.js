import XlsxPopulate from "xlsx-populate";

async function testConvertClasses(classes) {
  let workbook = await XlsxPopulate.fromBlankAsync();

  for (const element in classes) {
    let cells = Number(element) + 2;
    let sheets = "Sheet1";

    //#region Title
    const titleName = workbook
      .sheet("Sheet1")
      .cell(`A1`)
      .style("bold", true)
      //   .style("fill", "#D3D3D3")
      .value("class_name");

    const titleDescription = workbook
      .sheet("Sheet1")
      .cell(`B1`)
      .style("bold", true)
      .value("description");

    const titleBio = workbook
      .sheet("Sheet1")
      .cell(`C1`)
      .style("bold", true)
      .value("status");

    const titleCreatedAt = workbook
      .sheet("Sheet1")
      .cell(`D1`)
      .style("bold", true)
      .value("createdAt");

    const titleUpdatedAt = workbook
      .sheet("Sheet1")
      .cell(`E1`)
      .style("bold", true)
      .value("updatedAt");

    //#endregion

    //#region Data
    const customName = workbook
      .sheet(sheets)
      .cell(`A${cells}`)
      .value(classes[element].class_name);

    const customEmail = workbook
      .sheet(sheets)
      .cell(`B${cells}`)
      .value(classes[element].description);

    const customBio = workbook
      .sheet(sheets)
      .cell(`C${cells}`)
      .value(classes[element].status);

    const customCreatedAt = workbook
      .sheet(sheets)
      .cell(`D${cells}`)
      .value(classes[element].createdAt);

    const customUpdatedAt = workbook
      .sheet(sheets)
      .cell(`E${cells}`)
      .value(classes[element].updatedAt);

    //#endregion
  }
  // return workbook;
  return workbook.outputAsync();
}

module.exports = {
  testConvertClasses,
};
