import { useNavigate } from "react-router-dom";
export default function Account({title, amount, description, id}){
    const navigate = useNavigate();

    const handleViewTransactions = () => {
        navigate(`/transaction/${id}`);
    };

    return(
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{title}</h3>
                <p className="account-amount">{amount}</p>
                <p className="account-amount-description">{description}</p>
            </div>
            <div className="">
                <button className="transaction-button" onClick={handleViewTransactions}>
                View Transaction
                </button>
            </div>
        </section>
    )
}