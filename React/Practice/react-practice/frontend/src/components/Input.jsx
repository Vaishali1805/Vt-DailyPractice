export default function Input({type,id,placeholder,value,name,className}) {
    return (
        <input type={type} name={name} value={value} id={id} placeholder={placeholder} className={className} />
    );
}