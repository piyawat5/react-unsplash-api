const PhotoComponent = (props) => {
  const {
    alt_description,
    urls: { regular },
  } = props;
  return (
    <div className="single-photo">
      <img src={regular} alt={alt_description} />
    </div>
  );
};
export default PhotoComponent;
