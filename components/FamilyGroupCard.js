// components/FamilyGroupCard.js
import React from 'react';
import Link from 'next/link';

export default function FamilyGroupCard({ groupId, headOfClan, members }) {
 // establish gender for styling
  const headGenderClass = headOfClan
    ? headOfClan.Gender === 1
      ? 'male'
      : 'female'
    : '';


     // make cards if there is a clan, make bullet list for the unrelated characters
  return (
    <div className="card my-4">
      <div className="card-body">
        {headOfClan ? (
          <>
          
            <h5 className="card-subtitle mb-2 text-muted">Head of Clan</h5>
            <ul className="list-group mb-3">
              <li className={`list-group-item ${headGenderClass}`}>
                <Link href={`/main/${headOfClan.id}`} className="underline-link">
                  {headOfClan.Character}
                </Link>
              </li>
            </ul>
            <h6 className="mt-3">Family</h6>
            <ul className="list-group">
              {members.length > 0 && (
                members.map(member => {
                  const genderClass = member.Gender === 1 ? 'male' : 'female';
                  return (
                    <li key={member.id} className={`list-group-item ${genderClass} ` }>
                      <Link href={`/main/${member.id}`} className="text-decoration-none">
                        {member.Character} - {member.Role}
                      </Link>
                    </li>
                  );
                })
              ) }
            </ul>
          </>
        ) : (
          <>
            {/* map the unrelated characters for the bullet list */}
            <h5 className="card-subtitle mb-2 text-muted">Unrelated Characters</h5>
           
            <ul className="list-group p-3">
            {members.length > 0 && (
                    members.map(member => {
                  
                  return (
                    <li key={member.id} className={`list-item `}>
                      <Link href={`/main/${member.id}`} className="underline-link">
                        {member.Character }
                      </Link>
                    </li>
                  );
                })
              ) }
            </ul>
          </>
        )}
      </div>
    </div>
  );
}