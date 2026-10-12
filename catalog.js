// Eğitim/ön eleme kataloğu. Değerler sertifika veya tasarım allowables değildir.
const catalog=[
['4140','AISI 4140 · ıslah edilmiş','Çelik',7.85,950,200,2,95,0,'Kesme → CNC → Isıl işlem → Taşlama → Kaplama','Mil, bağlantı elemanı, otomotiv','Isıl işlem ve kesit boyutu mekanik özellikleri değiştirir.'],
['1045','AISI 1045','Çelik',7.85,570,200,1,70,0,'Kesme → Tornalama → Taşlama','Mil, pim, makine parçası','Korozyon için yüzey koruma gerekir.'],
['s355','S355 yapı çeliği','Çelik',7.85,470,200,2,48,0,'Kesme → Kaynak → İşleme → Boya','Şasi, konstrüksiyon','Kalınlık ve ürün standardı için sertifika kontrolü gerekir.'],
['6061','6061-T6 Alüminyum','Alüminyum',2.70,310,120,4,210,1,'Kesme → CNC → Eloksal','Gövde, hafif konstrüksiyon','Sıcaklıkta dayanım kaybı ve yorulma ayrıca kontrol edilir.'],
['7075','7075-T6 Alüminyum','Alüminyum',2.81,570,120,3,340,1,'Kesme → CNC → Yüzey koruma','Havacılık bağlantıları, takım parçaları','Gerilmeli korozyon ve temper seçimi değerlendirilmelidir.'],
['6082','6082-T6 Alüminyum','Alüminyum',2.70,310,120,4,220,1,'Kesme → CNC → Eloksal','Yapısal parçalar, profiller','Kaynak ısı tesiri altındaki bölge dayanımı düşebilir.'],
['2024','2024-T3 Alüminyum','Alüminyum',2.78,470,120,2,320,1,'Kesme → CNC → Yüzey koruma','Havacılık sac parçaları','Korozyon koruması ve ürün formu önemlidir.'],
['304','304 Paslanmaz','Paslanmaz',8.0,515,400,4,160,2,'Kesme → CNC → Pasivasyon','Gıda ekipmanı, gövde','Klorür ortamında çukurcuk korozyonu olabilir.'],
['316l','316L Paslanmaz','Paslanmaz',8.0,485,400,5,230,2,'Kesme → CNC → Pasivasyon','Kimya ekipmanı, bağlantılar','Klorür konsantrasyonu ve sıcaklık ayrıca değerlendirilir.'],
['174ph','17-4 PH · H900','Paslanmaz',7.75,1310,300,4,390,2,'Kesme → CNC → Yaşlandırma → Taşlama','Yüksek dayanımlı mil, vana','H900 temsili durumudur; tokluk ve SCC riski gözden geçirilmelidir.'],
['ti64','Ti-6Al-4V · Grade 5','Titanyum',4.43,950,300,5,1850,3,'Kesme → CNC → Gerilim giderme','Havacılık, yüksek özgül dayanım','İşleme maliyeti yüksek; medikal uygunluk sertifikayla doğrulanır.'],
['ti2','Titanyum Grade 2','Titanyum',4.51,345,250,5,1400,3,'Kesme → Şekillendirme → CNC','Kimyasal proses, eşanjör','Kimyasal ortam ve kaynak prosedürü kontrol edilmelidir.'],
['cu','Cu-ETP / C110 bakır','Bakır alaşımları',8.94,220,150,4,420,4,'Kesme → Şekillendirme → İşleme','Elektrik barası, ısı transferi','Dayanım sertlik/temper durumuna bağlıdır.'],
['brass','CuZn39Pb3 pirinç','Bakır alaşımları',8.47,360,150,3,380,5,'Kesme → Tornalama → Kaplama','Fitting, işlenmiş bağlantı','Kurşun içerir; içme suyu/gıda mevzuat uygunluğu ayrıca kontrol edilir.'],
['cfrp','CFRP · yön bağımlı örnek','Kompozit',1.60,900,100,5,1800,6,'Kalıp → Serim → Kürleme → Kesim','Hafif taşıyıcı, panel','Lif yönü, reçine, delaminasyon ve bağlantı tasarımı doğrulanmalı.'],
['gfrp','GFRP · cam elyaf / epoksi','Kompozit',1.90,350,80,4,360,8,'Kalıp → Serim → Kürleme → Kesim','Panel, yalıtkan yapı','Laminat ve reçine sistemi belirtilmeden tasarım onayı verilemez.'],
['pom','POM-C asetal','Polimer',1.41,65,80,4,190,7,'Kesme → CNC / Enjeksiyon → Çapak alma','Dişli, kızak, burç','Sünme, sürtünme ve kimyasal ortam değerlendirilmelidir.'],
['pa6','PA6 poliamid','Polimer',1.14,70,80,4,150,7,'Kurutma → Enjeksiyon / CNC → Kontrol','Dişli, yatak, gövde','Nem alımı boyut ve dayanımı değiştirir.'],
['peek','PEEK · takviyesiz','Polimer',1.30,95,200,5,2800,7,'Kurutma → Enjeksiyon / CNC → Kontrol','Yüksek sıcaklık burcu, yalıtkan','Sünme ve sürekli kullanım sıcaklığı yük altında doğrulanır.'],
['ptfe','PTFE','Polimer',2.20,25,200,5,420,7,'Presleme → Sinterleme → CNC','Conta, kimyasal yalıtım','Soğuk akma/sünme ve düşük rijitlik dikkate alınmalıdır.']
].map(([id,name,family,density,strength,temp,corrosion,price,photo,process,uses,note])=>({id,name,family,density,strength,temp,corrosion,price,photo,process,uses,note,source:'Temsili eğitim verisi · tedarikçi sertifikasıyla doğrulayın'}));
module.exports=catalog;
