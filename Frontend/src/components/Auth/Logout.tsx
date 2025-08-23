

interface User {
    id: string;
    username: string;
    password: string;
}

interface LogoutProps {
  user: User | null;
}

function Logout(props: LogoutProps) {
  const { user } = props;


  return (
    <>
      <div className="bg-white-500 m-4 text-center text-black p-4 rounded-lg shadow-xl">
        {!user && <h2>You have been logged out</h2>}
        {user && <h2>Logging Out .... !</h2>}
      </div>
    </>
  );
}

export default Logout;

