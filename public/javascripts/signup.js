// 아이디 중복확인
document
  .querySelector("button#checkMyId")
  .addEventListener("click", async (e) => {
    const inputId = document.getElementById("inputId").value;
    try {
      const result = await axios.post("/checkId", { inputId });
      const { data } = result;
      const resultTag = document.getElementById("checkresult");
      resultTag.innerHTML = data;
    } catch (error) {
      console.error(error);
    }
  });

document.querySelector("form#signup").addEventListener("submit", (e) => {
  const resultTag = document.getElementById("checkresult");
  if (!resultTag.innerHTML) {
    e.preventDefault();
    alert("아이디 중복을 확인해주세요");
  }
});
