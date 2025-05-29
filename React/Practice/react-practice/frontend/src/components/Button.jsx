export default function Button({className,value,onMouseDown,onMouseUp}) {
    return (
        <button className={className} onMouseDown={onMouseDown} onMouseUp={onMouseUp} >{value}</button>
    );
}