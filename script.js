document.addEventListener("DOMContentLoaded", function(){
    const submitForm = document.getElementById("inputBook");
    const cekBox = document.getElementById("BookisCompleted");

    submitForm.addEventListener("submit", function(event){
      event.preventDefault();
        if (cekBox.checked) {
            addCompleted();
          } else {
            addUnCompleted();
          }
    });
          if (isStorageExist()) {
            loadDataFromStorage();
          }
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBookshelf();
 });