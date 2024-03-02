import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Home.css";

type User = {
  user_id: string;
  total: number;
  User: {
    name: string;
  };
};

function Home(): JSX.Element {
  const [state, setState] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/rates", {});
        const data = await response.json();
        // console.log(data);
        setState(data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>
        Добро пожаловать дорогой любитель{" "}
        <span className="erich">ErichKrause!</span>
      </h1>
      <img
        className="mainImg"
        src="/kuleshov.png"
        alt="Ведущий программы Своя игра"
      />
      <h2>Наши рекордсмены:</h2>
      <div className="records">
        {state.length>0 ? (
          state.slice(0, 3).map((user: User, index) => (
            <div key={uuidv4()} className="record">
              <p className="name">
                Магистр: <span className="gold">{user.User.name} </span>
              </p>
              <img
                className="top-img"
                src={`/user${index + 1}.jpg`}
                alt="Знаток"
              />
              <p className="record-title">
                Абсолютный рекорд: <span className="gold"> {user.total} </span>
              </p>
            </div>
          ))
        ) : (
          <div className="big gold"> Стань первым рекордсменом! </div>
        )}
      </div>
    </>
  );
}

export default Home;
