/**
 * Created by chanaka on 7/17/14.
 */

//var mainHost = "http://192.168.1.101:8080/web/api/";
//var mainHost = "http://192.168.1.101:8080/web/openmicro/v1";
//var mainHost = "http://52.27.93.152:8080/web/openmicro/v1";
var mainHost = "http://173.192.63.94:8080/openmicro/openmicro/v1";
//var mainHost = "http://192.168.1.101:8080/web/openmicro/v1";
//var mainHost = "http://52.88.32.134:8080/openmicro/openmicro/v1";


debug = true;

var host = {
    user: mainHost + '/user',
    branch: mainHost + '/branch',
    center: mainHost + '/center',
    customer: mainHost + '/customer',
    package: mainHost + '/package',
    guarantee: mainHost + '/guarantee',
    type: mainHost + '/type',
    loan: mainHost + '/loan',
    businessType: mainHost + '/businessType',
    repaymentdetail: mainHost + '/repaymentdetail',
    loanreport: mainHost + '/loanreport',
    group: mainHost + '/group',
    grouphasmember: mainHost + '/grouphasmember'
};