
const Button = ({color, text, onClick}) => {
  return (
    <button 
        className={"px-[12px] py-[8px] rounded text-xs text-white font-semibold active:scale-95"}
        style={{ backgroundColor: color }}
        onClick={onClick}
    >
        {text}
    </button>
  )
}

export default Button
