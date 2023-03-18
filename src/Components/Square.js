import "../styles.css";

export default function Square(props) {
  return (
    <button style={props.css} className="square" onClick={props.onSquareClick}>
      {props.value}
    </button>
  );
}
