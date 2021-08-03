const UNCOMPLETED_LIST_BOOKSHELF_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOKSHELF_ID = "completeBookshelfList";
const BOOKDHELF_ITEMID = "itemId";


function addUnCompleted() {
  const uncompletedBOOKSHELFList = document.getElementById(UNCOMPLETED_LIST_BOOKSHELF_ID );
  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = document.getElementById("inputBookYear").value;
  
  const bookshelf = makeCard(title, author, year, false);
  const bookshelfObject = composeTodoObject(title, author, year, false);
  
  bookshelf[BOOKDHELF_ITEMID] = bookshelfObject.id;
  bookshelfs.push(bookshelfObject);


  uncompletedBOOKSHELFList.append(bookshelf);
  updateDataToStorage();
}

function addCompleted() {
  const completedBOOKSHELFList = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID );
  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = document.getElementById("inputBookYear").value;
  
  const bookshelf = makeCard(title, author, year, true);
  const bookshelfObject = composeTodoObject(title, author, year, true);
  
  bookshelf[BOOKDHELF_ITEMID] = bookshelfObject.id;
  bookshelfs.push(bookshelfObject);


  completedBOOKSHELFList.append(bookshelf);
  updateDataToStorage();
}

function makeCard(title, author, year, isCompleted){
  const textTitle = document.createElement("h3");
  textTitle.innerText = title;

  const textAuthor = document.createElement("p");
  textAuthor.innerText = author;

  const textYear = document.createElement("p");
  textYear.classList.add("book-rlsd");
  textYear.innerText = year;

  const textContainer = document.createElement("div");
  textContainer.classList.add("book_item");
  textContainer.append(textTitle, textAuthor, textYear);

  const container = document.createElement("div");
  container.classList.add("action", "shadowLight", "bd-rad");
  container.append(textContainer);

  if (isCompleted) {
    container.append(createGreenButton(), createDeleteButton());
  } else {
    container.append(createRedButton(), createDeleteButton());
  }
  return container;
}

function createButton(textButton, buttonClass, eventListener){
  const button = document.createElement("button");
  button.innerText = textButton;
  button.classList.add(buttonClass);
  button.addEventListener("click", function(event) {
    eventListener(event);
  });
  return button;
}

function createGreenButton(){
  return createButton("Tandai belum Dibaca", "red", function(event) {
    changeUnCompleted(event.target.parentElement);
  });
}

function createRedButton(){
  return createButton("Tandai selesai Dibaca", "green", function(event) {
    changeCompleted(event.target.parentElement);
  });
}

function createDeleteButton(){
  return createButton("Hapus Buku", "btn-delete", (event) => {
    removeBookList(event.target.parentElement);
  });
}

function changeCompleted(booksElement){
  const bookHasBeenCompleted= document.getElementById([COMPLETED_LIST_BOOKSHELF_ID]);
  const title = booksElement.querySelector(".book_item > h3").innerText;
  const author = booksElement.querySelector(".book_item > p").innerText;
  const year = booksElement.querySelector(".book_item > p").innerText;

  const newBook = makeCard(title, author, year, true);
  const bookshelf = findBook(booksElement[BOOKDHELF_ITEMID]);
 
  bookshelf.isCompleted = true;
  newBook[BOOKDHELF_ITEMID] = bookshelf.id;

  bookHasBeenCompleted.append(newBook);
  booksElement.remove();

  updateDataToStorage();
}

function changeUnCompleted(booksElement){
  const bookUnBeenCompleted = document.getElementById([UNCOMPLETED_LIST_BOOKSHELF_ID]);
  const title = booksElement.querySelector(".book_item > h3").innerText;
  const author = booksElement.querySelector(".book_item > p").innerText;
  const year = booksElement.querySelector(".book_item > p").innerText;

  const newBook = makeCard(title, author, year, false);
  const bookshelf = findBook(booksElement[BOOKDHELF_ITEMID]);
 
  bookshelf.isCompleted = false;
  newBook[BOOKDHELF_ITEMID] = bookshelf.id;

  bookUnBeenCompleted.append(newBook);
  booksElement.remove();

  updateDataToStorage();
}

function removeBookList(booksElement){
  const bookPositon = findBookIndex(booksElement[BOOKDHELF_ITEMID]);
  bookshelfs.splice(bookPositon, 1);

  booksElement.remove();
  updateDataToStorage();
}
