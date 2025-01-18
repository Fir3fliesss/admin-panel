const Welcome = () => {
  var username = window.localStorage.getItem('authName');
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-5xl text-slate-200 text-center">Selamat Datang <span className="font-semibold text-red-400">{username}</span> di Admin Panel</h1>
      </div>
    </>
  );
};

export default Welcome;
