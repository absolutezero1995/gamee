import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Table.css";
import Modal from "../modal/Modal";

type Category = {
    title: string;
    Questions: Question[];
};

type Question = {
    id: number;
    rate: number;
    question: string;
    answer: string;
};

const Table = () => {
    const [state, setState] = useState<Category[]>([]);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [clickedDivs, setClickedDivs] = useState<number[]>([]);
    const [count, setCount] = useState(0);
    const [userTotal, setUserTotal]= useState(0); 
    console.log(userTotal, 'userTotal');
    console.log(count);

    useEffect(() => {
        if(count === 25){
        const fetchData = async () => {
            try {
            const response = await fetch("/api/rates", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ userTotal }),
                credentials: "include",
            });
            if (response.ok) {
                console.log("Вы прошли игру!");
            } else {
                console.log("Вы сломали игру!");
            }
            } catch (error) {
            console.error("Error during login:", error);
            }
        }
        fetchData();
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/questions", {
                    credentials: "include",
                });
                const data = await response.json();
                setState(data);
            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            }
        };
        fetchData();
    }, []);

    const handleDivClick = (question: Question) => {
        if (!clickedDivs.includes(question.id)) {
            setSelectedQuestion(question);
            setClickedDivs([...clickedDivs, question.id]);
        }
    };

    return (
        <>
        <div className="table__container">
            {state.map((category: Category) => (
                <div key={uuidv4()} className="category__container">
                    <div className="category__item">{category.title}</div>
                    {category.Questions.map((question: Question) => (
                        <div
                            onClick={() => handleDivClick(question)}
                            key={uuidv4()}
                            className={`category__item ${clickedDivs.includes(question.id) ? 'disabled' : ''}`}
                        >
                            <span>{question.rate}</span>
                        </div>
                    ))}
                </div>
            ))}
            {selectedQuestion && (
                <Modal
                    isOpen={true}
                    onClose={() => setSelectedQuestion(null)}
                    question={selectedQuestion}
                    setCount={setCount}
                    setUserTotal={setUserTotal}
                />
            )}
        </div>
        <p className="total_score">{userTotal}</p>
        </>
    );
};

export default Table;
