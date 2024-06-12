(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();document.addEventListener("DOMContentLoaded",()=>{c(),b(),C(),l();const t=document.querySelector("form");t&&(t.addEventListener("submit",h),t.querySelectorAll("input[required], select[required], textarea[required]").forEach(r=>{r.addEventListener("input",m)}),m())});const d=document.querySelector("#sprayCansForSale"),s=document.querySelector("#cartSection");function v(t){const e=document.createElement("div");e.className="popup",e.textContent=t,document.body.appendChild(e),setTimeout(()=>{e.remove()},3e3)}function h(t){t.preventDefault(),v("Thanks for you order!!"),y()}function m(){const t=document.querySelector("form"),e=document.querySelector("#sendForm"),r=t.checkValidity();e.disabled=!r}const i=[{id:1,name:"CanCan in Sunset",price:100,image:{src:"./assets/orange.jpg",alt:"Spray Can 1 Image"},amount:0,stars:4,category:"light"},{id:2,name:"Yellow Mr. Sunshine",price:120,image:{src:"yellow.jpg",alt:"Spray Can 2 Image"},amount:0,stars:3.5,category:"light"},{id:3,name:"Red Rush ",price:140,image:{src:"assets/red.jpg",alt:"Spray Can 3 Image"},amount:0,stars:5,category:"light"},{id:4,name:"Pink that Party",price:110,image:{src:"assets/pink.jpg",alt:"Spray Can 4 Image"},amount:0,stars:4.5,category:"pastel"},{id:5,name:"Bloom Fusia, bloom",price:110,image:{src:"assets/fusia.jpg",alt:"Spray Can 5 Image"},amount:0,stars:3,category:"light"},{id:6,name:"Cast a spell",price:100,image:{src:"assets/chrome.jpg",alt:"Spray Can 6 Image"},amount:0,stars:4,category:"light"},{id:7,name:"Blue Lagoon",price:140,image:{src:"assets/blue.jpg",alt:"Spray Can 7 Image"},amount:0,stars:4.5,category:"light"},{id:8,name:"Blue Velvet",price:130,image:{src:"assets/darkblue.jpg",alt:"Spray Can 8 Image"},amount:0,stars:3.5,category:"dark"},{id:9,name:"Greener than grass",price:140,image:{src:"assets/green.jpg",alt:"Spray Can 9 Image"},amount:0,stars:4,category:"dark"}];function S(){const t=localStorage.getItem("cart");return t?JSON.parse(t):[]}function f(t){localStorage.setItem("cart",JSON.stringify(t))}function C(){window.addEventListener("beforeunload",()=>{f(i)})}function b(){const t=S();t.length>0&&i.forEach(e=>{const r=t.find(a=>a.id===e.id);r&&(e.amount=r.amount)})}function L(){i.sort((t,e)=>e.stars-t.stars),c()}function E(t){const e=i.filter(r=>r.category===t);d.innerHTML="",e.forEach(r=>{d.innerHTML+=`
      <article>
        <h1>${r.name}</h1>
        <img src="${r.image.src}" alt="${r.image.alt}">
        <div>Price: <span>${r.discountedPrice.toFixed(2)}</span> kr</div>
        <div>Amount: <span>${r.amount}</span></div>
        <button class="minus" data-id="${r.id}">-</button>
        <button class="plus" data-id="${r.id}">+</button>
      </article>
    `}),addEventListenersToButtons()}function I(){i.sort((t,e)=>t.name.localeCompare(e.name)),c()}function T(){i.sort((t,e)=>t.price-e.price),c()}document.querySelector("#sortByRating").addEventListener("click",L);document.querySelector("#sortByCategory").addEventListener("change",t=>{const e=t.target.value;E(e)});document.querySelector("#sortByName").addEventListener("click",I);document.querySelector("#sortByPrice").addEventListener("click",T);function g(){const t=new Date,e=t.getDay(),r=t.getHours();return e===1&&r<10?{type:"discount",value:.1}:e===5&&r>=15||e===6||e===0||e===1&&r<3?{type:"surcharge",value:.15}:{type:"none",value:0}}function $(){const t=g();i.forEach(e=>{t.type==="surcharge"?e.discountedPrice=e.price*(1+t.value):e.discountedPrice=e.price,e.amount>=10?(e.discountedPrice=e.discountedPrice*.9,e.bulkDiscountApplied=!0):e.bulkDiscountApplied=!1})}function P(){s.innerHTML="<h1>Shoppingcart</h1>";let t=0,e=0;i.forEach(n=>{n.amount>0&&(s.innerHTML+=`
        <article class="cart-item">
          <img src="${n.image.src}" alt="${n.image.alt}" class="cart-item-image">
          <div class="cart-item-details">
            <h1>${n.name}</h1>
            <div>Price per unit: <span>${n.discountedPrice.toFixed(2)}</span> kr</div>
            <div>Amount: <span>${n.amount}</span></div>
            ${n.bulkDiscountApplied?"<div>10% discount!</div>":""}
          </div>
        </article>
      `,t+=n.amount,e+=n.discountedPrice*n.amount)}),document.querySelector(".cart-count").innerText=t,g().type==="discount"&&(s.innerHTML+="<div>Monday discount: 10% on your total!</div>");let a=0;t>15?a=0:a=25+e*.1,s.innerHTML+=`<div>Shipping: ${a.toFixed(2)} kr</div>`,e+=a,s.innerHTML+=`<div>Total: ${e.toFixed(2)} kr</div>`,e>800?s.innerHTML+="<div>Payment method: Invoice not able over 800 kr</div>":s.innerHTML+=`
    <div class="form-group">
    <label for="paymentMethod">Payment:</label>
    <select id="paymentMethod">
      <option value="card">Card</option>
      <option value="invoice">Invoice</option>
    </select>
  </div>
    `}let p;function l(){clearTimeout(p),p=setTimeout(()=>{alert("Sorry, you have been gone for too long!"),i.forEach(t=>t.amount=0),f(i),c()},15*60*1e3)}function q(t){const e=Number(t.currentTarget.dataset.id),r=i.findIndex(a=>a.id===e);i[r].amount>0&&(i[r].amount-=1),c(),l()}function k(t){const e=Number(t.currentTarget.dataset.id),r=i.findIndex(a=>a.id===e);i[r].amount+=1,c(),l()}function c(){d.innerHTML="",$(),i.forEach(r=>{d.innerHTML+=`
      <article>
        <h1>${r.name}</h1>
        <img src="${r.image.src}" alt="${r.image.alt}">
        <div>Price: <span>${r.discountedPrice.toFixed(2)}</span> kr</div>
        <div>Amount: <span>${r.amount}</span></div>
        <div>Rating: ${F(r.stars)}</div>
        <button class="minus" data-id="${r.id}">-</button>
        <button class="plus" data-id="${r.id}">+</button>
      </article>
    `});const t=document.querySelectorAll("button.minus"),e=document.querySelectorAll("button.plus");t.forEach(r=>{r.addEventListener("click",q)}),e.forEach(r=>{r.addEventListener("click",k)}),P()}function F(t){const e="★",r="☆";let n="";for(let o=1;o<=5;o++)o<=t?n+=e:o-t===.5?n+=r:n+="☆";return n}function y(){document.querySelector("form").reset()}document.querySelector("#resetForm").addEventListener("click",y);