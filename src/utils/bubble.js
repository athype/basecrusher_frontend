const wrapper = document.getElementById("bubble-wrapper");
const footer = document.querySelector('#footer');

const checkFooterVisibility = () => {
  const rect = footer.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

const animateBubble = x => {
  const bubble = document.createElement("div");

  bubble.className = "bubble";
  bubble.style.left = `${x}px`;

  if (checkFooterVisibility()) {
    bubble.classList.add('visible');
  }

  wrapper.appendChild(bubble);

  setTimeout(() => wrapper.removeChild(bubble), 2000);
}

window.onmousemove = e => animateBubble(e.clientX);

// const wrapper = document.getElementById("bubble-wrapper");
//
// let index = 0;
//
// /* -- Step 1️⃣: Create an "enum" of colors -- */
//
// const Red = {
//     One: "rgb(225,29,72)",
//     Two: "rgb(203,24,63)",
//     Three: "rgb(155,15,46)",
//     Four: "rgb(143,7,37)",
//     Five: "rgb(112,7,30)"
// }
//
// const Green = {
//     One: "rgb(102, 187, 106)",
//     Two: "rgb(76, 175, 80)",
//     Three: "rgb(67, 160, 71)",
//     Four: "rgb(56, 142, 60)",
//     Five: "rgb(46, 125, 50)"
// }
//
// const Blue = {
//     One: "rgb(66, 165, 245)",
//     Two: "rgb(33, 150, 243)",
//     Three: "rgb(30, 136, 229)",
//     Four: "rgb(25, 118, 210)",
//     Five: "rgb(21, 101, 192)"
// }
//
// const Color = Red;
//
// /* -- Step 2️⃣: Pick the order of colors -- */
//
// const colors = [
//     Color.One,
//     Color.Two,
//     Color.Three,
//     Color.Four,
//     Color.Five,
//     Color.Four,
//     Color.Three,
//     Color.Two
// ];
//
// const animateBubble = x => {
//     const bubble = document.createElement("div");
//
//     bubble.className = "bubble";
//     bubble.style.left = `${x}px`;
//
//     /* -- Step 3️⃣: Cycle through the colors using an index variable and the modulus (%) operator -- */
//
//     bubble.style.backgroundColor = colors[index++ % (colors.length - 1)];
//
//     wrapper.appendChild(bubble);
//
//     setTimeout(() => wrapper.removeChild(bubble), 2000);
// }
//
// window.onmousemove = e => animateBubble(e.clientX);