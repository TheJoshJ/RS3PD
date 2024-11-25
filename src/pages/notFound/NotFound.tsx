const NotFound = () => {
  return (
    <div className="flex flex-col items-center gap-5 h-auto w-screen">
      <img
        src="sad-cowboy.png" // Path to the image in the public folder
        alt="Sad Cowboy"
        className="w-20"
      />
      <p>That page seems long gone, partner.</p>
    </div>
  );
};

export default NotFound;
