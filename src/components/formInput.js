export default function FormInput({id, placeholder, type}) {
    return(
        <input
            id={id}
            placeholder={placeholder}
            type={type}
            className="text-m w-5/6 bg-gray-200 border border-gray-500 rounded mb-12 p-2"
        /> 
    );
}