
const Button = ({color, text, onClick}) => {
  return (
    <button 
        className={"p-2 rounded text-white font-semibold active:scale-95"}
        style={{ backgroundColor: color }}
        onClick={onClick}
    >
        {text}
    </button>
  )
}

export default Button
