const stopBtn = document.querySelectorAll("button.stop");
const restr_names = document.querySelectorAll(".restr_name");
const types = document.querySelectorAll("td.type");
const locates = document.querySelectorAll("td.locate");
const descs = document.querySelectorAll("td.desc");

stopBtn.forEach((btn, index) => {
  btn.addEventListener("click", async (e) => {
    const restr_name = restr_names[index].innerText;
    const type = types[index].innerText;
    const locate = locates[index].innerText;
    const desc = descs[index].innerText;

    try {
      const result = await axios.post("/cxlmarkRestr", {
        restr_name,
        type,
        locate,
        desc,
      });
      if (result.data) {
        alert(result.data);
      }
      location.href = "/";
    } catch (error) {
      console.error(error);
    }
  });
});

const bookmarkBtn = document.querySelectorAll("button.bookmark");
const non_restr_names = document.querySelectorAll("td.non_restr_name");
const non_types = document.querySelectorAll("td.non_type");
const non_locates = document.querySelectorAll("td.non_locate");
const non_descs = document.querySelectorAll("td.non_desc");

bookmarkBtn.forEach((btn, index) => {
  btn.addEventListener("click", async (e) => {
    const non_restr_name = non_restr_names[index].innerText;
    const non_type = non_types[index].innerText;
    const non_locate = non_locates[index].innerText;    
    const non_desc = non_descs[index].innerText;

    try {
      const result = await axios.post("/bookmarkRestr", {
        non_restr_name,
        non_type,
        non_locate,
        non_desc,
      });
      if (result.data) {
        new Error(result.data);
      }
      location.href = "/";
    } catch (error) {
      alert("추가할 수 없습니다.");
    }
  });
});
