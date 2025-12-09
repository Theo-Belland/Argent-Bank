import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserName } from "../features/authSlice";
import Account from "../components/account";

export default function Profile(){
    const dispatch = useDispatch();
    const {user} = useSelector((state => state.auth));

    const [isEditing, setIsEditing] = useState(false);
    const [pseudo, setPseudo] = useState(user?.userName || '');

    const displayName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'Tony Stark';

    const onCancel = () => {
        setPseudo(user?.userName || '');
        setIsEditing(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const trimmed = pseudo.trim();
        if (!trimmed || trimmed === user?.userName) return;
        dispatch(updateUserName(trimmed));
        setIsEditing(false);
    };

    return(
          <main className="main bg-dark">
      <header className="header">
        {!isEditing ? (
          <>
            <h1>
              Welcome back
              <br />
              {displayName}!
            </h1>
            <button
              className="edit-button"
              type="button"
              onClick={() => setIsEditing(true)}
            >
              Edit Name
            </button>
          </>
        ) : (
          <section className="sign-in-content" style={{ marginTop: '2rem' }}>
            <form onSubmit={onSubmit}>
              <h2>Edit user info</h2>

              <div className="input-wrapper">
                <label htmlFor="username">User name</label>
                <input
                  id="username"
                  type="text"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  type="text"
                  value={user?.firstName || ''}
                  disabled
                  className="input-disabled"
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  type="text"
                  value={user?.lastName || ''}
                  disabled
                  className="input-disabled"
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button
                  className="edit-button"
                  type="submit"
                  disabled={!pseudo.trim() || pseudo.trim() === (user?.userName || '')}
                >
                  Save
                </button>
                <button
                  className="edit-button"
                  type="button"
                  style={{
                    backgroundColor: '#fff',
                    color: '#00bc77',
                    border: '2px solid #00bc77',
                  }}
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}
      </header>

      <h2 className="sr-only">Accounts</h2>
      <section className="container">
        <Account
          id="8349"
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <Account
          id="6712"
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <Account
          id="8349"
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </section>
    </main>  
    )
}