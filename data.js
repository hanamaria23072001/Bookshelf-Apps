const STORAGE_KEY = "BOOKSHELF-APPS";
 
let bookshelfs = [];
 
function isStorageExist() {
   if(typeof(Storage) === undefined){
       alert("Browser kamu tidak mendukung local storage");
       return false;
   }
   return true;
};
 
function saveData() {
   const parsed = JSON.stringify(bookshelfs);
   localStorage.setItem(STORAGE_KEY, parsed);
   document.dispatchEvent(new Event("ondatasaved"));
};
 
function loadDataFromStorage() {
   const serializedData = localStorage.getItem(STORAGE_KEY);
   
   let data = JSON.parse(serializedData);
   
   if(data !== null) bookshelfs = data;
 
   document.dispatchEvent(new Event("ondataloaded"));
};
 
function updateDataToStorage() {
   if(isStorageExist()){
       saveData();
   }
};
 
function composeTodoObject(title, author, year, isCompleted) {
   return {
       id: +new Date(),
       title,
       author,
       year,
       isCompleted
   };
};
 
const findBook = (booksId) => {
    for (book of bookshelfs) {
      if (book.id === booksId) return book;
    }
    return null;
};
  
const findBookIndex = (booksId) => {
    let index = 0;
    for (book of bookshelfs) {
      if (book.id === booksId) return index;
      index++;
    }
  
    return -1;
};

function refreshDataFromBookshelf() {
    const Uncompleted = document.getElementById(UNCOMPLETED_LIST_BOOKSHELF_ID);
    const Completed = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID);

    for(book of bookshelfs){
        const newBook = makeCard(book.title, book.author, book.year, book.isCompleted);
        newBook[BOOKDHELF_ITEMID] = book.id;

        if(book.isCompleted){
            Completed.append(newBook);
        } else {
            Uncompleted.append(newBook);
        }
    }
};