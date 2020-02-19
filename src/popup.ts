import { fetchAPIData } from "./featchAPIData";

// popupが開かれたときに、content.jsへメッセージを通知
chrome.tabs.query({ currentWindow: true, active: true }, async () => {
  console.log("API通信を開始します");
  const apiResult = (await fetchAPIData().catch(error => {
    console.error("通信失敗");
    console.error(error);
    return;
  })) as Response; // TODO: 正しいType Guard

  console.log("background.jsへメッセージを送りました");
  chrome.runtime.sendMessage({
    message: "setCookies",
    name: "ics-cookie",
    value: `status is  ${apiResult.status}`
  });

  console.dir(apiResult);

  const icsConsole = document.querySelector("#ics-console");
  if (icsConsole == null) {
    return;
  }

  icsConsole.innerHTML = "通信とCookie設定完了";
});
