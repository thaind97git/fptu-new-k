import { Fragment } from "react";

const Button = ({ text, type, onClick, onChange, value, className }) => {
    return (
        <Fragment>
            <button className={type + " " + className} onClick={onClick} onChange={onChange} value={value}>
                {text}
            </button>
            <style jsx>{`
                button {
                    border: none;
                    padding: 5px 10px;
                    outline: none;
                    border-radius: 3px;
                    margin: 3px
                }
                .primary {
                    background-color: rgb(63, 81, 181);
                    color: white;
                }
                .success {
                    background-color: #4caf50;
                    color: white;
                }
                .danger {
                    background-color: #f44336;
                    color: white;
                }
                .default {
                    background-color: white;
                    color: black;
                    border: 1px solid gray
                }
                .success,.primary,.danger,.default:hover {
                    cursor: pointer;
                }
            `}</style>
        </Fragment>
    )
}

export default Button;