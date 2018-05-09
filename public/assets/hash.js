function hashPassword(password) {
  var date1 = new Date();
  console.log(date1.getTime())
  var toHash = password
  for (var i = 0; i < 40000; i++) {
    toHash = MD5(toHash)
  }
  var date2 = new Date();
  console.log(date2.getTime())
  console.log("MD5: " + toHash)
  return toHash
}
