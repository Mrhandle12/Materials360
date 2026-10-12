const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');
const engine = require('../engine');
function seed(dir) {
  fs.mkdirSync(dir, { recursive: true });
  const db = new DatabaseSync(path.join(dir, 'materials360.sqlite'));
  db.exec('CREATE TABLE IF NOT EXISTS records(id INTEGER PRIMARY KEY AUTOINCREMENT, kind TEXT NOT NULL, payload TEXT NOT NULL, created TEXT DEFAULT CURRENT_TIMESTAMP)');
  if (db.prepare('SELECT COUNT(*) AS n FROM records').get().n) { db.close(); return; }
  const insert = db.prepare('INSERT INTO records(kind,payload) VALUES(?,?)');
  const add = (kind, data) => insert.run(kind, JSON.stringify(data));
  const customers = [
    {name:'Demo Otomotiv',contact:'Örnek müşteri kaydı',sector:'Otomotiv',value:42000000,probability:80,stage:'Müzakere'},
    {name:'Demo Havacılık',contact:'Örnek müşteri kaydı',sector:'Havacılık',value:18000000,probability:60,stage:'Teklif verildi'},
    {name:'Demo Makine',contact:'Örnek müşteri kaydı',sector:'Makine',value:6500000,probability:40,stage:'RFQ alındı'}
  ];
  customers.forEach(c => add('customers', c));
  add('rfqs',{name:'RFQ-DEMO-001 / Bağlantı parçası',customer:'Demo Otomotiv',qty:100000,strength:900,weight:850,volume:100,temp:120,corrosion:2,target:450,lead:30,standard:'Demo çizim / sertifika doğrulaması gerekli',status:'Teknik değerlendirme'});
  [{name:'Demo Tedarik A',price:95,lead:7,quality:98,delivery:96},{name:'Demo Tedarik B',price:88,lead:14,quality:94,delivery:91},{name:'Demo Tedarik C',price:102,lead:5,quality:99,delivery:99}].forEach(s=>add('suppliers',{...s,material:'4140'}));
  const inputs={customer:'Demo Otomotiv',product:'Otomotiv bağlantı parçası',material:'4140',supplier:'Demo Tedarik A',qty:100000,mass:.785,price:95,scrap:12,minutes:3,rate:1200,labor:25,heat:35,surface:22,quality:10,pack:6,setup:18000,overhead:12,margin:25,lead:30,payment:'%50 peşin, %50 teslimatta',validity:15};
  add('quotes',{customer:inputs.customer,product:inputs.product,inputs,calculation:engine.cost(inputs),status:'Kabul edildi'});
  const values=[29.5,30,30.2,31,29.8,30.5,29.9,30.3,30.6,30.1];
  add('quality',{name:'DEMO-PARTI-001 / Sertlik HRC',lsl:28,usl:32,measurements:values.join(' '),values,result:engine.spc(values,28,32)});
  add('complaints',{name:'DEMO-8D-001',customer:'Demo Otomotiv',team:'Demo kalite ekibi',problem:'500 parçadan 17 tanesinde sertlik spesifikasyon dışında',contain:'Şüpheli partiyi ayır ve ölçüm sistemini doğrula',cause:'Proses sapması hipotezi; henüz doğrulanmadı',action:'Kayıt karşılaştırması ve ölçüm doğrulaması',verify:'Kontrol planına göre yeniden numune al',prevent:'Sonuçlara göre kontrol planını güncelle',close:'İnceleme devam ediyor',status:'İncelemede'});
  add('fmea',{process:'Isıl işlem',failure:'Sertlik sapması',effect:'Mekanik performans riski',cause:'Proses koşulu sapması hipotezi',s:8,o:3,d:4,action:'Proses kayıtları ve ölçüm sistemini doğrula',owner:'Demo kalite ekibi'});
  db.close();
}
module.exports = { seed };
