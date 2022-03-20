const drop = document.querySelector(".controls__drop"),
  fileName = document.querySelector(".controls__save-file"),
  btnDownload = document.querySelector(".controls__btn"),
  btnBold = document.querySelector(".bold"),
  btnUnderscore = document.querySelector(".underscore"),
  btnItalic = document.querySelector(".italic"),
  btncolor = document.querySelector(".controls__color"),
  btnUpper = document.querySelector(".upper"),
  btnlower = document.querySelector(".lower"),
  btnOrder = document.querySelector(".order-list"),
  btnUnOrder = document.querySelector(".UnOrder-list"),
  content = document.querySelector(".content");

/* events */
btnBold.addEventListener("click", () => {
  document.execCommand("bold");
});
btnUnderscore.addEventListener("click", () => {
  document.execCommand("underline");
});
btnItalic.addEventListener("click", () => {
  document.execCommand("italic");
});
btncolor.addEventListener("input", () => {
  document.execCommand("forecolor", false, btncolor.value);
});
btnUpper.addEventListener("click", () => {
  putUpperOrLowerText("upper");
});
btnlower.addEventListener("click", () => {
  putUpperOrLowerText("lower");
});
btnOrder.addEventListener("click", () => {
  document.execCommand("insertUnorderedList", false);
});
btnUnOrder.addEventListener("click", () => {
  document.execCommand("insertOrderedList", false);
});

btnDownload.addEventListener("click", () => {
  if (content.textContent === "") content.focus();
  else if (fileName.value === "") fileName.focus();
  else if (drop.value === "0") drop.focus();
  else {
    if (drop.value === "pdf") {
      content.style.boxShadow = "none";
      html2pdf().from(content).save(fileName.value);
      /* put a timer here (almost no time) because the pdf prints with shadow */
      setTimeout(() => {
        content.style.boxShadow = "0 0 5px 0 rgba(0, 0, 0, 0.5)";
      }, 1);
    } else if (drop.value === "txt") {
      createTXTDocument(fileName.value, content.innerText);
    }
  }
});

/* functions */
function createTXTDocument(filename, text) {
  const a = document.createElement("a");
  const blob = new Blob([text]);
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = filename + ".txt";
  a.click();
}
function putUpperOrLowerText(type) {
  var span = document.createElement("span");
  var select = document.getSelection();
  /* get the selected letters, create a clone and put it on span, 
      after it, get the span's text and uppercase it.
      The method "range.surroundContents(span);" doesn't work when the element contain spaces, 
      cause of that we use appendChild and extractContent. */
  if (select.rangeCount) {
    var range = select.getRangeAt(0).cloneRange();
    span.appendChild(range.extractContents());
    range.insertNode(span);

    type === "upper"
      ? (span.textContent = span.textContent.toUpperCase())
      : (span.textContent = span.textContent.toLowerCase());
  }
}
