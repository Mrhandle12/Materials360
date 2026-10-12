# Kurulum notları

Node.js 24+ ve npm ile `npm ci`, ardından `npm start` çalıştırın. Windows hedefinde doğrulanan uygulama kaynak kodu ve arayüz varlıkları depoya dahildir. Electron, Node.js ve Ollama çalıştırılabilir dosyaları ile model ağırlıkları depoya eklenmez.

| Değişken | Varsayılan / anlamı |
| --- | --- |
| `M360_DATA_DIR` | Normal çalışmada `data/`; demo çalışmada `data-demo/` |
| `M360_PORT` | Masaüstü veri motoru 3610; demo 3611 |
| `M360_NODE` | Başlatıcı tarafından kullanılan Node.js dosyası |
| `M360_AI_ENDPOINT` | `http://127.0.0.1:11435` |
| `M360_OLLAMA` | İsteğe bağlı Ollama dosya yolu |
| `OLLAMA_MODELS` | İsteğe bağlı model klasörü |

Masaüstü, veri motoruyla her açılışta üretilen oturum anahtarıyla iletişim kurar. Servis yalnız geri döngü adresinde dinler. `npm run server` geliştirici komutudur; masaüstü kabuğunun oturum korumasını kendiliğinden başlatmaz.

Uygulamayı kapattıktan sonra `data/` klasörünün tamamını kopyalayarak yedekleyebilirsiniz. Açık bir SQLite veritabanında WAL dosyaları da gerekebilir. Arayüzden alınan JSON yedeği için henüz otomatik içe aktarma arayüzü yoktur.

Sorunları veri klasöründeki `desktop.log` üzerinden inceleyin. 3610/3611 portunun başka süreç tarafından kullanılmadığını kontrol edin. Ollama bulunamadığında çekirdek uygulama çalışmaya devam eder; AI ekranı motorun durumunu gösterir.
