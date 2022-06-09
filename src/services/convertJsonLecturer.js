import XlsxPopulate from "xlsx-populate";

async function testConvertLecturers(lecturers) {
  //C1
  XlsxPopulate.fromFileAsync("./src/template/lecturers.xlsx").then(
    (workbook) => {
      // Modify the workbook.
      const value = workbook.sheet(0).cell("A1").value("test");
      // Log the value.
      console.log(value);
    }
  );
  //C2;
  //   let workbook = await XlsxPopulate.fromBlankAsync();
  //   for (const element in lecturers) {
  //     let cells = Number(element) + 2;
  //     let sheets = "Sheet1";
  //     //#region Title
  //     const titleName = workbook
  //       .sheet("Sheet1")
  //       .cell(`A1`)
  //       .style("bold", true)
  //       .value("lecturer_name");
  //     const titleEmail = workbook
  //       .sheet("Sheet1")
  //       .cell(`B1`)
  //       .style("bold", true)
  //       .value("email");
  //     const titleBio = workbook
  //       .sheet("Sheet1")
  //       .cell(`C1`)
  //       .style("bold", true)
  //       .value("bio");
  //     const titleRole = workbook
  //       .sheet("Sheet1")
  //       .cell(`D1`)
  //       .style("bold", true)
  //       .value("role");
  //     const titleCreatedAt = workbook
  //       .sheet("Sheet1")
  //       .cell(`E1`)
  //       .style("bold", true)
  //       .value("createdAt");
  //     const titleUpdatedAt = workbook
  //       .sheet("Sheet1")
  //       .cell(`F1`)
  //       .style("bold", true)
  //       .value("updatedAt");
  //     //#endregion
  //     //#region Data
  //     const customName = workbook
  //       .sheet(sheets)
  //       .cell(`A${cells}`)
  //       .value(lecturers[element].lecturer_name);
  //     const customEmail = workbook
  //       .sheet(sheets)
  //       .cell(`B${cells}`)
  //       .value(lecturers[element].email);
  //     const customBio = workbook
  //       .sheet(sheets)
  //       .cell(`C${cells}`)
  //       .value(lecturers[element].bio);
  //     const customRole = workbook
  //       .sheet(sheets)
  //       .cell(`D${cells}`)
  //       .value(lecturers[element].role);
  //     const customCreatedAt = workbook
  //       .sheet(sheets)
  //       .cell(`E${cells}`)
  //       .value(lecturers[element].createdAt);
  //     const customUpdatedAt = workbook
  //       .sheet(sheets)
  //       .cell(`F${cells}`)
  //       .value(lecturers[element].updatedAt);
  //     //#endregion
  //   }
  //   // return workbook;
  //   return workbook.outputAsync();
}

module.exports = {
  testConvertLecturers,
};
