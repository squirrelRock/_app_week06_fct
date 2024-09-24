import React from 'react'; 
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import FamilyGroupCard from '../components/FamilyGroupCard';



const mockHeadOfClan = {
  id: 1,
  Character: 'John Blackthorne',
  Gender: 1,
  Role: "English Ship's Pilot",
};

const mockMembers = [
  {
    id: 2,
    Character: 'Kiku',
    Gender: 2,
    Role: 'Courtesan',
  },
];



  it('renders FamilyGroupCard without crashing', () => {
    render(<FamilyGroupCard headOfClan={mockHeadOfClan} members={mockMembers} />);
    expect(FamilyGroupCard).toBeDefined();
  });