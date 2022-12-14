import XlsxPopulate from "xlsx-populate";

async function testConvertCourses(courses) {
  let workbook = await XlsxPopulate.fromBlankAsync();

  for (const element in courses) {
    let cells = Number(element) + 2;
    let sheets = "Sheet1";

    //#region Title
    const titleSubjectName = workbook
      .sheet("Sheet1")
      .cell(`A1`)
      .style("bold", true)
      .value("subject_name");

    const titleTit = workbook
      .sheet("Sheet1")
      .cell(`B1`)
      .style("bold", true)
      .value("title");

    const titleDescription = workbook
      .sheet("Sheet1")
      .cell(`C1`)
      .style("bold", true)
      .value("description");

    const titleLecturerId = workbook
      .sheet("Sheet1")
      .cell(`D1`)
      .style("bold", true)
      .value("lecturer_id");

    const titleCreatedAt = workbook
      .sheet("Sheet1")
      .cell(`E1`)
      .style("bold", true)
      .value("createdAt");

    const titleUpdatedAt = workbook
      .sheet("Sheet1")
      .cell(`F1`)
      .style("bold", true)
      .value("updatedAt");
    //#endregion

    //#region Data
    const customSubjectName = workbook
      .sheet(sheets)
      .cell(`A${cells}`)
      .value(courses[element].subject_name);

    const customTitle = workbook
      .sheet(sheets)
      .cell(`B${cells}`)
      .value(courses[element].title);

    const customDescription = workbook
      .sheet(sheets)
      .cell(`C${cells}`)
      .value(courses[element].description);

    const customLecturerId = workbook
      .sheet(sheets)
      .cell(`D${cells}`)
      .value(courses[element].lecturer_id);

    const customCreatedAt = workbook
      .sheet(sheets)
      .cell(`E${cells}`)
      .value(courses[element].createdAt);

    const customUpdatedAt = workbook
      .sheet(sheets)
      .cell(`F${cells}`)
      .value(courses[element].updatedAt);

    //#endregion
  }
  // return workbook;
  return workbook.outputAsync();
}

module.exports = {
  testConvertCourses,
};
