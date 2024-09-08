const mainParagraph = "Welcome to Our Company! We are a team of passionate individuals dedicated to providing excellent services/products to our customers. Our mission is to provide the best experience for people travelling to different destinations around the world. \nOur values include integrity, innovation, customer satisfaction, and teamwork. We believe in putting our customers first and working together to achieve our goals.\nFeel free to explore our website to learn more about what we offer!";

var p = document.createElement("p");
p.setAttribute("id", "aboutPara");
p.innerText=mainParagraph;
document.getElementById("aboutus").appendChild(p);

let main = document.getElementById("main");

var teamdiv = document.createElement("div");
teamdiv.setAttribute("id", "teamDiv")
teamdiv.innerHTML+=`<div class="teamMember"><h1>Our Team</h1></div>`;
fetch('team.json')
    .then(response =>response.json())
    .then(data=>{
        let team = data.team;
        team.forEach(member => {
            var div = document.createElement("div");
            div.className = "teamMember";
            div.setAttribute("id", member.id + "_member");
            div.innerHTML+=`<i class="fa fa-user"></i>`;
            div.innerHTML+=`<h2>${member.name}</h2>`;
            div.innerHTML+=`<p>${member.description}</p>`;
            div.innerHTML+=`<div class="role">${member.designation}</div>`;
            teamdiv.appendChild(div);
        });
    }).catch(error => {
        console.log(error);
    })
main.appendChild(teamdiv);
