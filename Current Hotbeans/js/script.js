const peoplesDescription = {
  "Rick Sanchez": {
    description: "Rick Sanchez joined Hot Beans Web as a trainee in 2021 with a Higher National Diploma in Computing from Nottingham College and is now studying part time for a degree. Nathan's ability to solve complex problems has quickly made him a valued team member."
  },
  "Steve Billings": {
    description: "Steve joined us in 2019 as a junior web developer having completed an online Diploma of Higher Education in Computing, IT and Design from the Open University. Steve wanted a career change and completed the qualification while working full time. Steve's industry experience has meant that he has a great understanding or our clients' needs. He is now a developer."
  },
  "Jake Smith": {
    description: "Jake joined Hot Beans Web as a trainee in 2018 having graduated with a Computing (Web Development) BSc Honours at the University of Wales. Jake's skills in HTML, CSS, and JavaScript helped him quickly become an important member of the team. Since joining us, Jake has progressed quickly and took on the role of lead developer in 2021."
  },
  "Rosie Young": {
    description: "Rosie Young, joined Hot Beans Web in 2021 as a junior web developer. With a passion for graphic design, Rosie is the go-to person when it comes to creativity. Rosie holds a BSc Honours in Creative Computing from the University of Leicester."
  },
  "Sanji Bealey": {
    description: "Having spent time with us on work experience while studying for his Higher National Diploma in Computing at Nottingham College, Sanji joined the company as a trainee in 2022. Sanji Web is currently undertaking a number of online courses in programming."
  },
  "Rachel Okoku": {
    description: "Rachel joined Hot Beans Web as a trainee in 2020 having achieved a BSc Honours in Creative Computing from the University of Leicester. With an eye for colour and design, Rachel has worked on several big projects including Umbro and 3M. Rachel was promoted to developer in 2021."
  }
};

const allPeoples = document.querySelectorAll(".person");

allPeoples.forEach(person => {
  person.addEventListener("click", () => {
    const name = person.querySelector("h2").innerText;

    allPeoples.forEach(people => {
      people.classList.remove("active");
    })
    person.classList.toggle("active");

    document.querySelector(".description").innerHTML = peoplesDescription[name].description;
  });
})
