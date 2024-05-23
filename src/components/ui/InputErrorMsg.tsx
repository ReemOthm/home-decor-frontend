
interface InputErrorMsgProps {
    msg?: string 
}

const InputErrorMsg = ({msg}:InputErrorMsgProps)=>{
    return msg && <p className="error--msg">{msg}</p>
}

export default InputErrorMsg;