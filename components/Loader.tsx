interface LoaderProps {
  descriptionText: string;
  titleText: string;
}

const Loader = ({ descriptionText, titleText }: LoaderProps) => {
  return (
    <div className="loader-wrapper">
      <div className="card">
        <h1>{titleText}</h1>
        <p>{descriptionText}</p>
        <div className="loader">
          <div className="spin"></div>
          <div className="bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
