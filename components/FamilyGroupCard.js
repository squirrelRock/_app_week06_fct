// components/FamilyGroupCard.js
import React from 'react';
import Link from 'next/link';

export default function FamilyGroupCard({ groupId, headOfClan, members }) {
 
  console.log("clan head:", headOfClan);
  console.log("family:", members);
 // establish gender for styling
  const headGenderClass = headOfClan
    ? headOfClan.Gender === 1
      ? 'male'
      : 'female'
    : '';


     // make cards if there is a clan, make separate list for the unrelated characters
  return (
    <div className="card my-4">
      <div className="card-body">
        {headOfClan ? (
          <>          
           <h5 className="card-subtitle mb-2 text-muted">Head of Clan</h5>
            <ul className="list-group mb-3">
              <li className={`list-group-item ${headGenderClass}`}>
                <Link href={`/things-id/${headOfClan.id}`} className="underline-link">
                  {headOfClan.Character}
                </Link>
              </li>
            </ul>
         <h6 className="mt-3 red2 ">Family</h6>
      <ul className="list-group">
        {members.length > 0 && (
          members.map(member => {
            // use pre-made paths from the all-characters list
           const genderClass = member.Gender === 1 ? 'male' : 'female';
         
           const linkHref = `/things-id/${member.id}`;
            

        return (
                <li key={member.id} className={`list-group-item ${genderClass}`}>
                <Link href={linkHref} className="text-decoration-none">
                    {member.Character} - {member.Role}
                </Link>
                </li>
               );
             })
           )}
      </ul>
    </>
        ) 
        : // mapping the unrelated characters for the bullet list
        (
          <>          
            <h5 className="card-subtitle  mb-2 text-muted">Unrelated Characters</h5>
              <ul className="list-group p-3">
                 {members.length > 0 && (members.map(member => {
                          const linkHref2 = `/things-id/${member.id}`;
                  return (
                    <li key={member.id} className={`list-group-item unrelated`}>
                      <Link href={linkHref2} className="underline-link">
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