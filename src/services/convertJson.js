const XLSX = require("xlsx");
const path = require("path");

export const exportLecturersToExcel = (
  students,
  workSheetColumnName,
  workSheetName,
  filePath
) => {
  const result = students.map((student) => {
    return [
      student.student_name,
      student.email,
      student.bio,
      student.role,
      student.createdAt,
      student.updatedAt,
    ];
  });

  const workbook = XLSX.utils.book_new();
  const workSheetData = [workSheetColumnName, ...result];

  const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
  XLSX.utils.book_append_sheet(workbook, workSheet, workSheetName);
  XLSX.writeFile(workbook, path.resolve(filePath));

  return true;
};
