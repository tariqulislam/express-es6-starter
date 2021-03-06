import  express from 'express'
import path from 'path'
const router = express.Router();


var expressPDF = require('express-pdf-report');
var columns = {id:"id", first_name: "First name", last_name: "Last name", email: "Email", gender: "Gender", ip_address: "IP Address"};
var data=[
{"id":1,"first_name":"Sydelle","last_name":"Trotman","email":"strotman0@house.gov","gender":"Female","ip_address":"200.242.49.228"},
{"id":2,"first_name":"Tod","last_name":"Wisniowski","email":"twisniowski1@nih.gov","gender":"Male","ip_address":"88.217.79.159"},
{"id":3,"first_name":"Falito","last_name":"Hannah","email":"fhannah2@google.pl","gender":"Male","ip_address":"138.46.94.36"},
{"id":4,"first_name":"Luce","last_name":"Terlinden","email":"lterlinden3@ycombinator.com","gender":"Female","ip_address":"41.14.169.220"},
{"id":5,"first_name":"Nona","last_name":"Sedworth","email":"nsedworth4@issuu.com","gender":"Female","ip_address":"115.46.27.214"},
{"id":6,"first_name":"Eamon","last_name":"Cremins","email":"ecremins5@nature.com","gender":"Male","ip_address":"159.10.192.245"},
{"id":7,"first_name":"Augie","last_name":"Meanwell","email":"ameanwell6@wikia.com","gender":"Male","ip_address":"137.254.6.40"},
{"id":8,"first_name":"Payton","last_name":"Maxsted","email":"pmaxsted7@storify.com","gender":"Male","ip_address":"151.161.157.46"},
{"id":9,"first_name":"Dorelia","last_name":"Brise","email":"dbrise8@slideshare.net","gender":"Female","ip_address":"243.34.167.90"},
{"id":10,"first_name":"Clement","last_name":"Prisk","email":"cprisk9@furl.net","gender":"Male","ip_address":"157.163.221.36"},
{"id":11,"first_name":"Rossy","last_name":"Chazotte","email":"rchazottea@mac.com","gender":"Male","ip_address":"154.244.122.148"},
{"id":12,"first_name":"Porter","last_name":"Leidecker","email":"pleideckerb@google.co.jp","gender":"Male","ip_address":"145.226.221.115"},
{"id":13,"first_name":"Stacy","last_name":"Boays","email":"sboaysc@vistaprint.com","gender":"Female","ip_address":"10.213.11.117"},
{"id":14,"first_name":"Lindsay","last_name":"Guerin","email":"lguerind@slideshare.net","gender":"Male","ip_address":"185.114.149.58"}
];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/generate/pdf/force', (req, res, next) => {
  var filename = 'employee' + Math.floor((Math.random()* 50) + 1)+ '.pdf';
  expressPDF.renderForceDownloadPDF(res, columns,data, filename);
});

router.get('/generate/pdf', function(req, res, next) {
  var location = path.join(__dirname, 'employee.pdf');
  console.log(location);
 expressPDF.renderListPDFToDir(columns, data, location);

 res.status(200).send({output: 'success', message: 'pdf create successfully'})
 res.end();


})

export default router
