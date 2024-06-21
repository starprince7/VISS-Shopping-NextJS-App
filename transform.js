module.exports = function (fileInfo, api) {
  const j = api.jscodeshift;

  return j(fileInfo.source)
    .find(j.ImportDeclaration)
    .replaceWith((path) => {
      const importPath = path.value.source.value;

      // Convert relative paths to alias paths
      if (importPath.startsWith("../") || importPath.startsWith("./")) {
        const newImportPath = importPath
          .replace(/^(\.\.\/)+/, "@/")
          .replace(/^\.\//, "@/");
        path.value.source.value = newImportPath;
      }

      return path.value;
    })
    .toSource();
};
