export const Rating = (rate,handleRating) => {
  return (
    <>
      <div key={rate}>
        <input
          type="checkbox"
          value={rate}
          id={rate}
          onChange={(e) => handleRating(e)}
        />
        <label htmlFor={rate}>{rate} star & above</label>
      </div>
    </>
  );
};

