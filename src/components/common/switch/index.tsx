import "./styles.scss";

export const Switch = () => {
  return (
    <div className="switch-container">
      <span>All</span>
      <div className="switch-content">
        <input
          className="checkbox-switch"
          name="onlyCreator"
          type="checkbox"
          id="switch"
        />
        <label htmlFor="switch" className="switch-label" />
      </div>
      <span>My</span>
    </div>
  );
};
