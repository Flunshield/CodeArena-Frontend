import React from 'react';

interface FooterProps {
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer style={{padding: '1rem', textAlign: 'center', color: 'white' }}>
      <p>{"Ici c'est le footer"} © {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
