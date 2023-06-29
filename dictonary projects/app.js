let input = document.querySelector("#input");
let searchBtn = document.querySelector("#search");
let apikey = "a7a25fcb-e70f-4fd2-a444-efd72a4777e2";
let notfound = document.querySelector(".not_found");
let defbox = document.querySelector(".def");
let audioBox = document.querySelector(".audio");
let loading = document.querySelector(".loading");
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();

  //clear data
  audioBox.innerHTML = "";
  notfound.innerText = "";
  defbox.innerText = "";

  // get input data
  let word = input.value;

  //call Api get data
  if (word == "") {
    alert("word is required");
    return;
  }

  getData(word);
});

async function getData(word) {
  loading.style.display = "block";
  //Ajax call
  const response = await fetch(
    `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apikey}`
  );
  const data = await response.json();
  console.log(data);
  //if empty result
  if (!data.length) {
    loading.style.display = "none";
    notfound.innerText = "no result found";
    return;
  }

  //if result is suggetions
  if (typeof data[0] == "string") {
    loading.style.display = "none";
    let heading = document.createElement("h3");
    heading.innerText = "Did you mean?";
    notfound.appendChild(heading);
    data.forEach((element) => {
      let suggestion = document.createElement("span");
      suggestion.classList.add("suggested");
      suggestion.innerText = element;
      notfound.appendChild(suggestion);
    });
    return;
  }

  // result agr mil gya
  loading.style.display = "none";
  let defination = data[0].shortdef[0];
  defbox.innerText = defination;

  //sound
  const soundName = data[0].hwi.prs[0].sound.audio;
  if (soundName) {
    rendersound(soundName);
  }
  console.log(data);
}

function rendersound(soundName) {
  // http://media.merriam-webster.com/soundc11
  let subfolder = soundName.charAt(0);
  let soundsrc = ` http://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apikey}`;

  let aud = document.createElement("audio");
  aud.src = soundsrc;
  aud.src = soundsrc;
  aud.controls = true;
  audioBox.appendChild(aud);
}
