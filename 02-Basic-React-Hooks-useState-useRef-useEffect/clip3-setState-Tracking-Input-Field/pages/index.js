import React, {useState} from "react";

export default function InputElement() {
    const [inputText, setInputText] = useState("");
    const [historyList, setHistoryList] = useState([]);
    return (
        <div><input
            onChange={(e) => {
                setInputText(e.target.value);
                setHistoryList([...historyList, e.target.value]);
            }}
            placeholder="Enter Some Text" /><br />
            {inputText}
            <hr/>
            <br />
            <ul>
                {historyList && historyList.map((record) => {
                    return (
                        <div>{record}</div>
                    )
                })}
            </ul>
        </div>
    );
}