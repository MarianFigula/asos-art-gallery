import "./PaymentDialog.css"

export function PaymentDialog({textHeader, icon, textDescription, buttonText, onClick}){

    return(
        <div className="login-container text-center">
            <h2>{textHeader}</h2>
            <i className={"bi " + icon}></i>
            <p>{textDescription}</p>
            <button onClick={onClick} className="button-dark mb-1">{buttonText}</button>
        </div>
    )
}