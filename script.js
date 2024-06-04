   // Sample JSON data (you would typically fetch this from a server)
   let students;

   function createStudentRow(student) {
       const row = document.createElement('tr');
       //<tr>

       const idCell = document.createElement('td');
       idCell.textContent = student.id;
       row.appendChild(idCell);
       // <tr><td>1</td>

       const nameCell = document.createElement('td');  //<td>
       const img = document.createElement('img');  //<img>
       img.src = student.img_src;   //<img src='link'>
       img.alt = student.first_name + ' ' + student.last_name;  //<img src='link' alt='first_name last_name'>
       nameCell.appendChild(img); //<td> <img src='link' alt='first_name last_name'>
       nameCell.appendChild(document.createTextNode(student.first_name + ' ' + student.last_name)); //<td> <img src='link' alt='first_name last_name'> first_name last_name
       row.appendChild(nameCell);  //  <tr><td>1</td>  <td> <img src='link' alt='first_name last_name'> first_name last_name

       // const emailCell = document.createElement('td');
       // emailCell.textContent = student.email;
       // row.appendChild(emailCell);

       const genderCell = document.createElement('td');
       genderCell.textContent = student.gender;
       row.appendChild(genderCell);

       const classCell = document.createElement('td');
       classCell.textContent = student.class;
       row.appendChild(classCell);

       const marksCell = document.createElement('td');
       marksCell.textContent = student.marks;
       row.appendChild(marksCell);

       const passingCell = document.createElement('td');
       passingCell.textContent = student.passing ? 'Passing' : 'Failed';
       row.appendChild(passingCell);

       // const cityCell = document.createElement('td');
       // cityCell.textContent = student.city;
       // row.appendChild(cityCell);

       const emailCell = document.createElement('td');
       emailCell.textContent = student.email;
       row.appendChild(emailCell);

       return row;
   }

   function populateTable(students, tableId = 'studentTable') {
       const tableBody = document.querySelector(`#${tableId} tbody`);
       tableBody.innerHTML = '';
       students.forEach(student => {
           const row = createStudentRow(student);
           tableBody.appendChild(row);
       });
   }

   function handleSearch() {
       const query = document.getElementById('searchBar').value.toLowerCase();
       const filteredStudents = students.filter(student => {
           return student.first_name.toLowerCase().includes(query) ||
               student.last_name.toLowerCase().includes(query) ||
               student.email.toLowerCase().includes(query);
       });
       populateTable(filteredStudents);
   }


   // sorting

   // function handleSearch() {
   //     const query = document.getElementById('searchBar').value.toLowerCase();
   //     const filteredStudents = students.filter(student => {
   //         return student.first_name.toLowerCase().includes(query) ||
   //             student.last_name.toLowerCase().includes(query) ||
   //             student.email.toLowerCase().includes(query);
   //     });
   //     populateTable(filteredStudents);
   // }

   function sortByName(order) {
       const sortedStudents = [...students].sort((a, b) => {
           const nameA = (a.first_name + ' ' + a.last_name).toLowerCase();
           const nameB = (b.first_name + ' ' + b.last_name).toLowerCase();
           if (order === 'asc') {
               return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
           } else {
               return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
           }
       });
       populateTable(sortedStudents);
   }

   function sortByMarks() {
       const sortedStudents = [...students].sort((a, b) => a.marks - b.marks);
       populateTable(sortedStudents);
   }

   function sortByPassing() {
       const passingStudents = students.filter(student => student.passing);
       populateTable(passingStudents);
   }

   function sortByClass() {
       const sortedStudents = [...students].sort((a, b) => a.class - b.class);
       populateTable(sortedStudents);
   }

//    function sortByGender() {
//        const femaleStudents = students.filter(student => student.gender.toLowerCase() === 'female');
//        const maleStudents = students.filter(student => student.gender.toLowerCase() === 'male');

//        document.getElementById('studentTable').style.display = 'none';
//        document.getElementById('genderTables').style.display = 'block';

//        populateTable(femaleStudents, 'femaleTable');
//        populateTable(maleStudents, 'maleTable');
//    }


   // Load data and populate the table
   document.addEventListener('DOMContentLoaded', () => {
       // Normally, you would fetch the data from a server
       fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
           .then(response => response.json())
           .then(data => {
               students = data;
            populateTable(data)
           })
           .catch(error => console.error('Error fetching data:', error));

       // For this example, we use the hardcoded data
       // populateTable(students);

       document.getElementById('genderTables').style.display = 'none';

   });