const $ = s => document.querySelector(s);
let source = "text", style = "Реализм", format = "9:16", selectedPhoto = null;

document.querySelectorAll(".source-tab").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".source-tab").forEach(x => {x.classList.remove("active"); x.setAttribute("aria-selected","false")});
  btn.classList.add("active"); btn.setAttribute("aria-selected","true");
  source = btn.dataset.source;
  $("#upload-area").classList.toggle("hidden", source !== "image");
}));
document.querySelectorAll(".style-card").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".style-card").forEach(x => x.classList.remove("selected"));
  btn.classList.add("selected"); style = btn.dataset.style;
}));
document.querySelectorAll(".format").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".format").forEach(x => x.classList.remove("selected"));
  btn.classList.add("selected"); format = btn.dataset.format;
}));
$("#prompt").addEventListener("input", e => $("#char-count").textContent = `${e.target.value.length} / 600`);
$("#prompt").maxLength = 600;

$("#photo-input").addEventListener("change", e => {
  const file = e.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) return;
  selectedPhoto = file;
  const reader = new FileReader();
  reader.onload = () => { $("#photo-preview").src = reader.result; $("#photo-preview").classList.remove("hidden"); $("#remove-photo").classList.remove("hidden"); };
  reader.readAsDataURL(file);
});
$("#remove-photo").addEventListener("click", () => {
  selectedPhoto = null; $("#photo-input").value = ""; $("#photo-preview").src = "";
  $("#photo-preview").classList.add("hidden"); $("#remove-photo").classList.add("hidden");
});
$("#create-button").addEventListener("click", () => {
  const prompt = $("#prompt").value.trim();
  if (!prompt) return showNotice("Сначала напиши, какое видео хочешь получить.");
  if (source === "image" && !selectedPhoto) return showNotice("Добавь фотографию, из которой нужно сделать видео.");
  showNotice("Интерфейс готов! Для настоящей генерации нужно подключить бесплатную открытую модель и сервер/компьютер. Пока приложение не отправляет фото или текст во внешние сервисы.");
});
function showNotice(message) { const n=$("#notice"); n.textContent=message; n.classList.remove("hidden"); n.scrollIntoView({behavior:"smooth",block:"nearest"}); }
if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(()=>{}));
