//module.export.functionName=function(req,res){
// retturn
// }

module.exports.home = function (req, res) {
  return res.end("<h1>express<h1>");
};
