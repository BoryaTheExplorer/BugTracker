import "./BugList.css";
import React from 'react';

const BugList = ({bugs, onSelectedBug}) => {
    return (
            <div className="bug-list">
                {bugs.map((bug) => (
                    <div key={bug._id}
                    className={`bug-item`}
                    onClick={() => onSelectedBug(bug)}
                    >
                        {bug.title}
                    </div>
                ))}
            </div>
    );
};
export default BugList;