// 00000000000000000000000000000 GET DATA BARANG 0000000000000000000000000000000000000000000000000000


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        getcopyright(this);
        getdatabarang(this);
        getdatabaranghome(this);
        getdatabarangbarusidebar(this);
        getdatabarangdetail(this);
    }
};
xhttp.open("GET", "xml/data-barang.xml", true);
xhttp.send();

var xhttp1 = new XMLHttpRequest();
xhttp1.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        getdatakatagori(this);
    }
};
xhttp1.open("GET", "xml/data-kategori.xml", true);
xhttp1.send();


var xhttp2 = new XMLHttpRequest();
xhttp2.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        getdataheadline(this);
    }
};
xhttp2.open("GET", "xml/data-headline.xml", true);
xhttp2.send();

// var query = window.location.search.substring(1);

// var param = query.substring(4)

// if (window.location.search.substring(1) !== null) {
var param = getParameterByName('kat');
var paramid = getParameterByName('id');
// Get Parameter VIA URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
// End Get Parameter VIA URL
// }

// console.log(param);


function getcopyright(xml) {
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName('by')[0];
    var y = x.childNodes[0];
    document.getElementById("copy").innerHTML =
        y.nodeValue;
}

var ubahparam = param.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    return letter.toUpperCase();
});

function getdatabarang(xml) {
    var xmlDoc = xml.responseXML;
    var items = xmlDoc.getElementsByTagName('Databarang');
    var namabarang, deskripsi, harga, foto;
    for (i = 0; i < items.length; i++) {

        var cekkategori = items[i].getAttribute('kategori');

        if (cekkategori === param) {
            item = items[i];

            namabarang = item.getElementsByTagName("Namabarang")[0].textContent;


            var cekstatus = items[i].getAttribute('status');
            var bestseller;

            if (cekstatus === "best-seller") {
                bestseller = '<div class="ribbon bestseller"></div>';
            } else {
                bestseller = '';
            }

            var habis;

            if (cekstatus === "habis") {
                habis = '<div class="habis"></div>';
            } else {
                habis = '';
            }

            id = item.getElementsByTagName("Idbarang")[0].textContent;
            var urldetail = 'kat=' + param + '&nama=' + namabarang.replace(' ', '-').toLowerCase();

            deskripsi = item.getElementsByTagName("Deskripsi")[0].textContent;
            harga = item.getElementsByTagName("Harga")[0].textContent;
            foto = item.getElementsByTagName("Foto")[0].textContent;
            $('#barangku').append(
                '<div class="col-md-4" style="margin-bottom:20px;">' +
                '<div class="col-md-12" id="barang">' +
                '' + bestseller + '' +
                '' + habis + '' +
                '<div class="kotak-barang">' +
                '<a href="barang-detail.html?id=' + id + '&' + urldetail + '">' +
                '<img src="images/barang/' + foto + '" id="gambar-barang">' +
                '</a>' +
                '</div>' +
                '</div>' +
                '<div class="clearfix"></div>' +
                '<h4><b>' + namabarang + '</b></h4>' +
                '<h6>' + deskripsi + '</h6>' +
                '<span id="harga-barang">' + harga + '</span>' +
                '</div>');
        }
    }

    $('#breadcrumbkategori').append(
        '<li><a href="index.html">Home</a></li>' +
        '<li><a href="javascript:;">Kategori</a></li>' +
        '<li class="active">' + ubahparam + '</li>');

}

function getdatabaranghome(xml) {
    var xmlDoc = xml.responseXML;
    var items = xmlDoc.getElementsByTagName('Databarang');
    var namabarang, deskripsi, harga, foto;
    for (i = 0; i < items.length; i++) {

        var cekpenempatan = items[i].getAttribute('penempatan');
        var cekkategori = items[i].getAttribute('kategori');

        var cekstatus = items[i].getAttribute('status');
        var bestseller;

        if (cekstatus === "best-seller") {
            bestseller = '<div class="ribbon bestseller"></div>';
        } else {
            bestseller = '';
        }

        var habis;

        if (cekstatus === "habis") {
            habis = '<div class="habis"></div>';
        } else {
            habis = '';
        }

        if (cekpenempatan === "home") {
            item = items[i];

            namabarang = item.getElementsByTagName("Namabarang")[0].textContent;

            id = item.getElementsByTagName("Idbarang")[0].textContent;
            var urldetail = 'kat=' + cekkategori.replace(' ', '-').toLowerCase() + '&nama=' + namabarang.replace(' ', '-').toLowerCase();

            deskripsi = item.getElementsByTagName("Deskripsi")[0].textContent;
            harga = item.getElementsByTagName("Harga")[0].textContent;
            foto = item.getElementsByTagName("Foto")[0].textContent;
            $('#barangkuhome').append(
                '<div class="col-md-4" style="margin-bottom:20px;">' +
                '<div class="col-md-12" id="barang">' +
                '' + bestseller + '' +
                '' + habis + '' +
                '<div class="kotak-barang">' +
                '<a href="barang-detail.html?id=' + id + '&' + urldetail + '">' +
                '<img src="images/barang/' + foto + '" id="gambar-barang">' +
                '</a>' +
                '</div>' +
                '</div>' +
                '<div class="clearfix"></div>' +
                '<h4><b>' + namabarang + '</b></h4>' +
                '<h6>' + deskripsi + '</h6>' +
                '<span id="harga-barang">' + harga + '</span>' +
                '</div>');
        }
    }
}

function getdatabarangdetail(xml) {
    var xmlDoc = xml.responseXML;
    var items = xmlDoc.getElementsByTagName('Databarang');
    var namabarang, deskripsi, harga, foto, deskripsilengkap, stock;
    for (i = 0; i < items.length; i++) {

        var cekkategori = items[i].getAttribute('kategori');

        if (cekkategori === param) {
            item = items[i];

            var cekid = items[i].getAttribute('id');

            if (cekid === paramid) {

                namabarang = item.getElementsByTagName("Namabarang")[0].textContent;

                var cekstatus = items[i].getAttribute('status');
                var bestseller;

                if (cekstatus === "best-seller") {
                    bestseller = '<div class="ribbon bestsellerdetail"></div>';
                } else {
                    bestseller = '';
                }

                var habis;

                if (cekstatus === "habis") {
                    habis = '<div class="habisdetail"></div>';
                } else {
                    habis = '';
                }

                var namabarangubah = namabarang.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                    return letter.toUpperCase();
                });

                id = item.getElementsByTagName("Idbarang")[0].textContent;
                var urldetail = 'kat=' + param + '&nama=' + namabarang.replace(' ', '-').toLowerCase();

                deskripsi = item.getElementsByTagName("Deskripsi")[0].textContent;
                deskripsilengkap = item.getElementsByTagName("Deskripsilengkap")[0].textContent;
                stock = item.getElementsByTagName("Stock")[0].textContent;
                harga = item.getElementsByTagName("Harga")[0].textContent;
                foto = item.getElementsByTagName("Foto")[0].textContent;
                $('#detailbarang').append(
                    '<div class="col-md-5">' +
                    '' + bestseller + '' +
                    '' + habis + '' +
                    '<img src="images/barang/' + foto + '" id="gambar-barang">' +
                    '</div>' +
                    '<div class="col-md-7">' +
                    '<h3><b>' + namabarang + '</b></h3>' +
                    '<h4><b>' + deskripsi + '</b></h4>' +
                    '<h4>Stock : ' + stock + '</h4>' +
                    '<span id="hargadetail">' + harga + '</span>' +
                    '<div class="clearfix"></div>' +
                    '<hr>' +
                    '<h4>Deskripsi</h4>' +
                    '<p>' + deskripsilengkap + '</p>' +
                    '</div>');


                $('#breadcrumbdetail').append(
                    '<li><a href="index.html">Home</a></li>' +
                    '<li><a href="javascript:;">Kategori</a></li>' +
                    '<li><a href="barang-by-kategori.html?kat=' + param + '">' + ubahparam + '</a></li>' +
                    '<li><a href="javascript:;">Detail Barang</a></li>' +
                    '<li class="active">' + namabarangubah + '</li>');
            }
        }
    }

}

function getdatabarangbarusidebar(xml) {
    var xmlDoc = xml.responseXML;
    var items = xmlDoc.getElementsByTagName('Databarang');
    var namabarang, deskripsi, harga, foto;
    for (i = 0; i < items.length; i++) {


        var cekstatus = items[i].getAttribute('status');
        var cekkategori = items[i].getAttribute('kategori');

        if (cekstatus === "best-seller") {
            item = items[i];

            namabarang = item.getElementsByTagName("Namabarang")[0].textContent;
            id = item.getElementsByTagName("Idbarang")[0].textContent;
            var urldetail = 'kat=' + cekkategori.replace(' ', '-').toLowerCase() + '&nama=' + namabarang.replace(' ', '-').toLowerCase();
            // deskripsi = item.getElementsByTagName("Deskripsi")[0].textContent;
            harga = item.getElementsByTagName("Harga")[0].textContent;
            foto = item.getElementsByTagName("Foto")[0].textContent;
            $('#barang-baru-sidebar').append(
                '<div class="col-md-12" id="list-barang">' +
                '<div class="col-md-4" id="barang-sidemenu">' +
                '<div class="kotak-barang">' +
                '<a href="barang-detail.html?id=' + id + '&' + urldetail + '">' +
                '<img src="images/barang/' + foto + '" id="gambar-barang">' +
                '</a>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-8">' +
                '<h5>' + namabarang + '</h5>' +
                '<span id="harga-barang-sidebar">' + harga + '</span>' +
                '</div>' +
                '</div>');
        }
    }
}




// 00000000000000000000000000000 GET DATA KATEGORI BARANG 00000000000000000000000000000000000000000000000


function getdatakatagori(xml) {
    var xmlDoc = xml.responseXML;
    var items = xmlDoc.getElementsByTagName('Datakategori');
    var nama;
    for (i = 0; i < items.length; i++) {
        item = items[i];

        nama = item.getElementsByTagName("Nama")[0].textContent;

        var urlkat = 'kat=' + nama.replace(' ', '-').toLowerCase();


        $('#listkategori').append(
            '<li><a href="barang-by-kategori.html?' + urlkat + '"><b>' + nama + '</b></a></li>');

        $('#listkategori1').append(
            '<li><a href="barang-by-kategori.html?' + urlkat + '">' + nama + '</a></li>');

        $('#listkategorihome').append(
            '<li><a href="barang-by-kategori.html?' + urlkat + '"><b>' + nama + '</b></a></li>');

        $('#listkategorihome1').append(
            '<li><a href="barang-by-kategori.html?' + urlkat + '">' + nama + '</a></li>');
    }

}


// XML DOM GET DATA HEADLINE 


function getdataheadline(xml) {
    var xmlDoc = xml.responseXML;
    var items = xmlDoc.getElementsByTagName('Headline');
    var foto, deskripsi;
    for (i = 0; i < items.length; i++) {
        item = items[i];

        deskripsi = item.getElementsByTagName("Deskripsi")[0].textContent;
        foto = item.getElementsByTagName("Foto")[0].textContent;

        var data, dataindikator;
        if (i === 0) {
            data = '<div class="item active">';
            dataindikator = 'class="active"';
        } else {
            data = '<div class="item">';
            dataindikator = '';
        }
        $('#headline').append(
            '' + data + '' +
            '<img src="images/' + foto + '" alt="' + deskripsi + '">' +
            '</div>');
        $('#indikator').append(
            '<li data-target="#myCarousel" data-slide-to="' + i + '" ' + dataindikator + '></li>');
    }
}