function setUp(){
  Date.prototype.isLeapYear = function() {
    var year = this.getFullYear();
    if((year & 3) != 0) return false;
    return ((year % 100) != 0 || (year % 400) == 0);
  };

// Get Day of Year
  Date.prototype.getDOY = function() {
    var dayCount = [0, 30, 58, 89, 119, 150, 180, 211, 242, 272, 303, 334];
    var mn = this.getMonth();
    var dn = this.getDate();
    var dayOfYear = dayCount[mn] + dn;
    if(mn > 1 && this.isLeapYear()) dayOfYear++;
    return dayOfYear;
  }

  Date.prototype.getFOM = function(){
    var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var mn = this.getMonth();
    var fom = dayCount[mn]++
    if(mn > 1 && this.isLeapYear()) fom++;
    return fom
  }

  Date.prototype.getLOM = function(){
    var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
    var mn = this.getMonth();
    var lom = dayCount[++mn]
    if(mn > 1 && this.isLeapYear()) lom++;
    return lom
  }

  Date.prototype.getFOW = function(){
    var dow = this.getDay()
    var index = this.getDOY()
    var total = index - dow
    if(total<1){
      total = -365 - total
    }
    return total
  }

  Date.prototype.getLOW = function(){
    var dow = this.getDay()
    var index = this.getDOY()
    var total =  index + (6-dow)
    return total
  }
}

function yeartodate(doy, year){
  var monthindex = 0
  var dayindex = 0
  var isLeap = new Date(`March 12, ${year}, 23:15:30 GMT+11:00`)
  isLeap = isLeap.isLeapYear()
  var dayCount = isLeap ?
  [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366] :
  [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365]
  for (var i = dayCount.length - 1 ; i > 0; i--) {
    if(doy - dayCount[i] > 0){
      monthindex = i
      dayindex = doy-(dayCount[i])
      break;
    }
  }
  var months = ['January','Febuary','March','April','May','June','July','Agust'
  ,'September','October','November','December']
  var month = months[monthindex]
  return new Date(`${month} ${dayindex}, ${year}, 23:15:30 GMT+11:00`)
}


module.exports = {
  setUp,
  yeartodate
}
