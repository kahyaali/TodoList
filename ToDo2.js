
// Degisken Tanımlama Başlangıç

let addButton = document.querySelector('#addBtn');

let inputLi = document.querySelector('#addText');

let myList = document.querySelector('#myList');

let allLiItems = document.querySelectorAll('.list-group-item');

// Değişken Tanımlama Bitiş


// Toast Tanımlama Baslangic
let toastTitles = document.querySelector('#toastTitle');
let toastMessages = document.querySelector('#toastMessage');
let toastBgDom = document.querySelector('#tost-Bg')

const toastLiveExample = document.getElementById('liveToast')

function toastfUNC(toastTitle, toastMessage, toastBg) {

    const toast = new bootstrap.Toast(toastLiveExample)
    toastTitles.innerHTML = toastTitle;
    toastMessages.innerHTML = toastMessage;
    toastBgDom.className = toastBg;
    toast.show()

}
// Toast Tanımlama Bitis

// Localstorage Değişkenini Burada Tanımladık
let taskList = [];

// Yapıldı ve Kaldırma Fonksiyonlari Baslangic
allLiItems.forEach(closeCall);

function closeCall(liItem) {
    let deletdiv = document.createElement('div');
    let deleteBtn = document.createElement('i')
    deletdiv.appendChild(deleteBtn)
    deleteBtn.className = 'fa-solid fa-xmark';
    deleteBtn.addEventListener('click', (index) => { // index parametresini kullanarak silme işleminin localstorage de de uygulanmasını sağlıyoruz
        deletdiv.parentElement.remove();

        let deleteIndex;
        for (let i in taskList) {
            if (taskList[i] == index) {
                deleteIndex = index;
            }
        }
        taskList.splice(deleteIndex, 1);
        // Silme İşlemi Tamamlandıktan Sonra Güncel Veriyi Tekrar Local Storage'a Yolluyoruz.
        localStorage.setItem("taskList", JSON.stringify(taskList));

        toastfUNC("Tebrikler!", "Listeden kaldırıldı!", "bg-primary");
    });
    liItem.appendChild(deletdiv);
    liItem.addEventListener('click', () => {
        liItem.classList.toggle('checked');

    })

};

// Yapıldı ve Kaldırma Fonksiyonlari Bitis   




// Yeni Liste Elemanı EKkleme, Boş Liste Elemanı Ekleyememe Fonksiyonu Baslangic


addButton.addEventListener('click', addItem);

function addItem(event) {
    if (Number(inputLi.value) != '') {
        let listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = inputLi.value;
        myList.appendChild(listItem);

        taskList.push(inputLi.value) //Localsotrage İçin Buradan Aldığımız Bilgiyi TaskList'e Pushluyoruz
        
        closeCall(listItem);
        inputLi.value = '';

        localStorage.setItem("taskList", JSON.stringify(taskList)); // Burada da Set Etme İşlemini Yapıyoruz

        toastfUNC("İşte bu!", "Listeye Eklendi", "bg-success");

    } else {
        inputLi.value = '';
        toastfUNC("Upss", "Bir şeyler yazmalısın!", "bg-danger");
    }
    event.preventDefault(); // Uygulamanın Sayfa Yenilendiğinde Sıfırlamasın Engelledik
}
// Yeni Liste Elemanı Ekleme, Boş Liste Ekleyememe Fonksiyonu Bitis

// LocalStorage Listeye Tanımlama Başlangıç

function displayTask() {
    for (let task of taskList) {
      let listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.textContent = task;
      myList.appendChild(listItem);
      closeCall(listItem);
    }
  }
  // Local Storage'dan Gelen Bilgiyi Burada Değişken Olarak Tanımladım.
  let saved = localStorage.getItem("taskList");
  //Local Storage'da Veri Bulunuyorsa Eğer Bunu Başka Bir Fonksiyona parametre Olarak Gönderip sayfamızda Gösterebiliriz.
  if (saved) {
    taskList = JSON.parse(localStorage.getItem("taskList"));
    displayTask(taskList);
  }
  // LocalStorage Listeye Tanımlama Bitiş
