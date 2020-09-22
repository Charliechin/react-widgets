import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {

    const onBodyClick = (e) => {
      if (ref.current.contains(e.target)) { return; }
      setOpen(false);
    };

    document.body.addEventListener('click', onBodyClick);

    return () => {
      document.body.removeEventListener('click', onBodyClick);
    }
  }, []);

  const renderedOptions = options.map((opt) => {

    if (opt.value === selected.value) {
      return null;
    }

    return (
      <div className="item" onClick={() => onSelectedChange(opt)} key={opt.value}>
        {opt.label}
      </div>
    );
  });

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">Select a color</label>
        <div
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          {/* visible transition */}
          <div className={`menu ${open ? 'visible transition' : ''}`}> {renderedOptions} </div>
        </div>
      </div>
    </div >

  );
}

export default Dropdown;

