const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="card">
        <h1>Fetching Book</h1>
        <p>It might take a while</p>
        <div className="loader">
          <div className="spin"></div>
          <div className="bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
