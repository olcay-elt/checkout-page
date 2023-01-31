//* ======================================================================
//*                 Checkout Page Solution
//*  map filter, dest,spread==============================================
//!table da kullanılacak değişkenler
const kargo = 15.0;
const vergi = 0.18;

let sepettekiler = [
    { name: "Vintage Backpack", price: 34.99, adet: 1, img: "./img/photo1.png" },
    { name: "Levi Shoes", price: 40.99, adet: 1, img: "./img/photo2.png" },
    { name: "Antique Clock", price: 69.99, adet: 1, img: "./img/photo3.jpg" },
];
//!EKRANA BASTIRMA

sepettekiler.forEach((ürün) => {
    //!destructuring
    const { name, price, adet, img } = ürün;
    document.querySelector(
        "#urun-rowlari"
    ).innerHTML += `<div class="card mb-3" style="max-width: 540px;">

  <div class="row g-0">

    <div class="col-md-5">
      <img src= ${img}  class="w-100 rounded-start" alt="...">
    </div>

    <div class="col-md-7">

      <div class="card-body">
      
        <h5 class="card-title">${name}</h5>
        
             <div class="ürün-price">
                    <p class="text-warning h2">$
                      <span class="indirim-price">${(price * 0.7).toFixed(
        2
    )}</span>
                      <span class="h5 text-dark text-decoration-line-through">${price} </span>
                    </p>
                  </div>

                  
                  <div
                    class="border border-1 border-dark shadow-lg d-flex justify-content-center p-2"
                  >
                    <div class="adet-controller">
                      <button class="btn btn-secondary btn-sm minus">
                        <i class="fas fa-minus"></i>
                      </button>
                      <p class="d-inline mx-4" id="ürün-adet">${adet}</p>
                      <button class="btn btn-secondary btn-sm plus">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>

                  </div>

                  <div class="ürün-removal mt-4">
                    <button class="btn btn-danger btn-sm w-100 remove-ürün">
                      <i class="fa-solid fa-trash-can me-2"></i>Remove
                    </button>
                  </div>

                  <div class="mt-2">
                    Ürün Toplam: $
                    <span class="ürün-toplam">${(price * 0.7 * adet).toFixed(
        2
    )}</span>
                  </div>
      </div>
    </div>
  </div>
</div>`;
});

//!todo browser da en alttaki total kısmı
document.querySelector("#odeme-table").innerHTML = `<table class="table">
            <tbody>
              <tr class="text-end">
                <th class="text-start">Aratoplam</th>
                <td>$<span class="aratoplam">0.00</span></td>
              </tr>
              <tr class="text-end">
                <th class="text-start">Vergi(18%)</th>
                <td>$<span class="vergi">0.00</span></td>
              </tr>
              <tr class="text-end">
                <th class="text-start">Kargo</th>
                <td>$<span class="kargo">0.00</span></td>
              </tr>
              <tr class="text-end">
                <th class="text-start">Toplam</th>
                <td>$<span class="toplam">0.00</span></td>
              </tr>
            </tbody>
          </table>`;


//!en alttaki table güncellemesi
hesaplaTotal();

//!SİLME

document.querySelectorAll(".remove-ürün").forEach(
    (btn) =>
    (btn.onclick = () => {
        removeSil(btn);
    })
);

function removeSil(x) {
    //!ekrandan sil

    // btn.parentElement.parentElement.parentElement.parentElement.parentElement.remove();

    x.closest(".card").remove();

    //!diziden de sil

    sepettekiler = sepettekiler.filter(
        (ürün) => ürün.name != x.closest(".card").querySelector("h5").textContent
    );
    console.log(sepettekiler);
    // console.log(btn.closest(".card").querySelector("h5").textContent);
    // console.log(
    //   btn.parentElement.previousElementSibling.previousElementSibling
    //     .previousElementSibling.textContent
    // );
    hesaplaTotal();
}

//!ADET DEĞİŞTİRME

//!minus butonuna basınca olacaklar
//!burada (-) butonu  ve adet ve (+) butonu  ile işim olduğu için, mesela - ye basınca adet (kardeşi) değişsin istediğim için, minus a ulaşıp ona tıklanınca closest ile parent ına oradan da kardeşine ulaş eksilt diyebiliriz. ya da gerekli elementlerin parent ına ulaşıp çocuklarına adlar verip, artık o adlarla işlem yapabiliriz

document.querySelectorAll(".minus").forEach((minus) => {
    const adet1 = minus.nextElementSibling;
    minus.onclick = () => {
        //!ekranda adet değişimini göster
        adet1.textContent -= 1;

        //! diziden değişiklik yapmak ve her card da olan ürünToplam ı değiştirmek üzere adetDegisim fonksiyonuna gidiyoruz, buradan bir eleman gönderip onun en üst dedesini sileceğiz, eğer eleman göndermezsek, fonksiyon bu süslüdeki elemanları göremez
        adetDegisim(adet1);

        //!eğer adet 1 iken tekrar minus a basılırsa o ürünü silelim, yani removeSil fonksiyonuna gidelim ve minus un parent ını silelim

        if (adet1.textContent < 1) {
            alert("sileyim mi?");
            // removeSil(adet1)
            removeSil(minus);
        }
    };
});

//!plus butonuna basınca olacaklar
//? 2. yoldan çözdük
document.querySelectorAll(".adet-controller").forEach((kutu) => {
    const plus = kutu.lastElementChild;
    const adet1 = kutu.querySelector("#ürün-adet");

    plus.onclick = () => {
        adet1.textContent = Number(adet1.textContent) + 1;
        //! diziden değişiklik yapmak ve her card da olan ürünToplam ı değiştirmek üzere adetDegisim fonksiyonuna gidiyoruz, buradan bir eleman gönderip onun en üst dedesini sileceğiz, eğer eleman göndermezsek, fonksiyon bu süslüdeki elemanları göremez
        adetDegisim(adet1);
    };
});

function adetDegisim(adet1) {
    //!diziyi yeni adet ile güncelle

    sepettekiler.map((ürün) => {
        if (ürün.name == adet1.closest(".card").querySelector("h5").textContent) {
            ürün.adet = Number(adet1.textContent);
        }
    });

    //!yeni oluşan ürün toplam fiyatını ekranda güncelle. (bunun yerine bu işi, card ları, güncellenen sepettekiler dizisiyle tekrar bastırarak ta yapabiliriz.)
    adet1.closest(".row").querySelector(".ürün-toplam").textContent =
        adet1.closest(".row").querySelector(".indirim-price").textContent *
        adet1.textContent;

    hesaplaTotal();
}


//!TABLE DAKİ ÜRÜN FİYATLARINI GÜNCELLEYEN FONKSİYON
function hesaplaTotal() {
    //! her bir card daki ürün toplam kısımları
    const ürünToplam = document.querySelectorAll(".ürün-toplam");
    //!  Bir NodeListnesne, bir belgeden çıkarılan düğümlerin bir listesidir (querySelectorAll bir NodeList döndürür)

    //? araToplam= en alttaki tüm ürünler için vergi ve kargo hariç sepettekilerin indirimli fiyat toplamı
    //?Reduce tam olarak Array istiyor, nodelist yeterli değil

    //!  NodeList ten Array e çevirme
    // [...ürünToplam]=Array.from(ürünToplam)
    // console.log(Array.from(ürünToplam)[0].textContent);
    const araToplam = Array.from(ürünToplam).reduce(
        (toplam, item) => toplam + Number(item.textContent),
        0
    );

    const kargoUcreti = araToplam > 0 ? kargo : 0;
    document.querySelector(".aratoplam").textContent = araToplam;
    document.querySelector(".vergi").textContent = (araToplam * vergi).toFixed(2);
    document.querySelector(".kargo").textContent = kargoUcreti;

    document.querySelector(".toplam").textContent = (
        araToplam +
        kargoUcreti +
        araToplam * vergi
    ).toFixed(2);
}
