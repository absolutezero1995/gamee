import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Scores.css";
type User = {
    user_id: string;
    total: number;
    User: {
      name: string;
    };
  };


const Scores = () => {
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
        <div className="scores">
            <h1>Рейтинг игроков:</h1>
            <div className="scores-list">
        {state.length> 0 ? (
          state.map((user: User, index) => (
            <div key={uuidv4()} className="scores-item">
                <p className="cur-number gold">№{index} </p>
              <p className="name">
                Магистр: <span className="gold">{user.User.name} </span>
              </p>
              <p className="record-title">
                Личный рекорд: <span className="gold"> {user.total} </span>
              </p>
            </div>
          ))
        ) : (
          <div className="big gold"> Участников нет. Стань первым рекордсменом! </div>
        )}
      </div>
        </div>
    );
};
export default Scores;