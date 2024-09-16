export default function Accordion({ itemData }) {
    
    const genderClass = itemData.Gender === 1 ? 'male' : 'female';
  
    return (
      <div className="accordion" id="characterInfo">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className={`accordion-button ${genderClass}`} type="button" data-bs-toggle="collapse" data-bs-target="#role" aria-expanded="true" aria-controls="role">
              Role
            </button>
          </h2>
          <div id="role" className="accordion-collapse collapse show" data-bs-parent="#characterInfo">
            <div className="accordion-body">
              <p>{itemData.Role}</p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className={`accordion-button ${genderClass} collapsed`} type="button" data-bs-toggle="collapse" data-bs-target="#personality" aria-expanded="false" aria-controls="personality">
              Personality
            </button>
          </h2>
          <div id="personality" className="accordion-collapse collapse show" data-bs-parent="#characterInfo">
            <div className="accordion-body">
              <p>{itemData.Personality}</p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className={`accordion-button ${genderClass} collapsed`} type="button" data-bs-toggle="collapse" data-bs-target="#description" aria-expanded="false" aria-controls="description">
              Description
            </button>
          </h2>
          <div id="description" className="accordion-collapse collapse show" data-bs-parent="#characterInfo">
            <div className="accordion-body">
              <p>{itemData.Description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  