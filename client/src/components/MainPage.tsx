// import { useEffect, useState } from "react";

// function MainPage() {
//     const [data, setData] =useState

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/questions");
//         const data = await response.json();
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//     };
//   });
//   return (
//     <div>
//       <h1>Своя игра</h1>
//       <div className="main-page-wrapper">
//         <ul className="main-page-list">
//           <li className="main-page-item">
//             <div className="category-name">Автомобиль</div>
//             <div className="questions-cost">200</div>
//             <div className="questions-cost">400</div>
//             <div className="questions-cost">600</div>
//             <div className="questions-cost">800</div>
//             <div className="questions-cost">1000</div>
//           </li>
//           <li className="main-page-item">
//             <div className="category-name">Дом</div>
//             <div className="questions-cost">200</div>
//             <div className="questions-cost">400</div>
//             <div className="questions-cost">600</div>
//             <div className="questions-cost">800</div>
//             <div className="questions-cost">1000</div>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default MainPage;
